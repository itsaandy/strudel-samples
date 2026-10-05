#!/usr/bin/env python3
"""Publish one committed pack folder as a standalone branch; never force-push."""
import argparse
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path


def git(cwd, *args, check=True):
    return subprocess.run(['git', '-C', str(cwd), *args], check=check,
                          text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def publish():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack', help='Lowercase folder/branch name, e.g. hyperpop')
    parser.add_argument('--push', action='store_true', help='Push the result (otherwise validate/preview only)')
    parser.add_argument('--remote', default='origin')
    args = parser.parse_args()
    if not re.fullmatch(r'[a-z][a-z0-9-]*', args.pack) or args.pack == 'main':
        parser.error('Use a lowercase pack slug other than main')
    root = Path(git(Path(__file__).resolve().parent, 'rev-parse', '--show-toplevel').stdout.strip())
    if git(root, 'branch', '--show-current').stdout.strip() != 'main':
        parser.error('Publish from main')
    if git(root, 'status', '--porcelain').stdout.strip():
        parser.error('Commit all source changes before publishing')
    pack = root / args.pack
    manifest = json.loads((pack / 'strudel.json').read_text())
    if not isinstance(manifest, dict):
        parser.error('Pack manifest must be a JSON object')
    files = [p for p in pack.rglob('*') if p.is_file()]
    if any(p.is_symlink() for p in pack.rglob('*')):
        parser.error('Pack must not contain symlinks')
    def paths(value):
        if isinstance(value, str):
            yield value
        elif isinstance(value, list):
            for v in value: yield from paths(v)
        elif isinstance(value, dict):
            for v in value.values(): yield from paths(v)
        else:
            raise ValueError('Sample values must be paths, lists, or pitch maps')
    audio = set()
    for name, value in manifest.items():
        if name.startswith('_'): continue
        for item in paths(value):
            target = (pack / item).resolve()
            if not target.is_relative_to(pack.resolve()) or not target.is_file():
                raise ValueError(f'Missing or external sample path: {item}')
            audio.add(item)
    if not audio:
        parser.error('Pack contains no sample paths')
    remote = git(root, 'remote', 'get-url', args.remote).stdout.strip()
    # The configured repository owns the public raw URLs. Local remotes are useful in tests.
    match = re.search(r'github\.com[:/]([^/]+/[^/]+?)(?:\.git)?$', remote)
    repo_id = match.group(1) if match else 'itsaandy/strudel-samples'
    manifest['_base'] = f'https://raw.githubusercontent.com/{repo_id}/{args.pack}/'
    source_commit = git(root, 'rev-parse', 'HEAD').stdout.strip()
    with tempfile.TemporaryDirectory(prefix='strudel-pack-') as tmp:
        checkout = Path(tmp)
        git(checkout, 'init', '-q')
        git(checkout, 'remote', 'add', 'origin', remote)
        # Carry source checkout identity, including any repository-local identity.
        for key in ('user.name', 'user.email'):
            value = git(root, 'config', '--get', key, check=False).stdout.strip()
            if value: git(checkout, 'config', key, value)
        existing = git(checkout, 'ls-remote', '--exit-code', '--heads', 'origin', args.pack, check=False)
        if existing.returncode == 0:
            git(checkout, 'fetch', '--depth=1', 'origin', args.pack)
            git(checkout, 'checkout', '-b', args.pack, 'FETCH_HEAD')
            git(checkout, 'rm', '-r', '--ignore-unmatch', '.')
        elif existing.returncode == 2:
            git(checkout, 'checkout', '--orphan', args.pack)
        else:
            raise RuntimeError(existing.stderr)
        for src in files:
            dest = checkout / src.relative_to(pack)
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
        (checkout / 'strudel.json').write_text(json.dumps(manifest, indent=2) + '\n')
        readme = checkout / 'README.md'
        original = readme.read_text() if readme.exists() else ''
        banner = (f'# {args.pack} — published Strudel pack\n\n'
                  f"```js\nsamples('github:{repo_id}/{args.pack}')\n```\n\n"
                  f'Generated from `{args.pack}/` on `main`. Edit the source folder, then run '
                  f'`python3 scripts/publish-pack.py {args.pack} --push` from main. '
                  'Do not edit this generated branch directly.\n\n---\n\n')
        readme.write_text(banner + original)
        # Keep source provenance out of the manifest Strudel consumes.
        (checkout / '.pack-source.json').write_text(json.dumps({
            'pack': args.pack, 'sourceBranch': 'main', 'sourceCommit': source_commit
        }, indent=2) + '\n')
        git(checkout, 'add', '.')
        changed = git(checkout, 'diff', '--cached', '--quiet', check=False).returncode
        if changed:
            git(checkout, 'commit', '-m', f'Publish {args.pack} from main {source_commit[:12]}')
        print(f'{args.pack}: {len(audio)} distinct sample paths; base {manifest["_base"]}')
        if args.push:
            git(checkout, 'push', 'origin', f'HEAD:refs/heads/{args.pack}')
            print(f'Published {args.pack} (no force push)')
        else:
            print('Preview complete; use --push to publish. Temporary checkout removed.')


if __name__ == '__main__':
    publish()
