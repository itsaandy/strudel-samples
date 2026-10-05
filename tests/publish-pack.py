"""Integration checks using only temporary local repositories; no GitHub writes."""
from pathlib import Path
import json
import shutil
import subprocess
import tempfile

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/publish-pack.py'

def run(cwd, *args, check=True):
    return subprocess.run(args, cwd=cwd, check=check, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

with tempfile.TemporaryDirectory(prefix='strudel-publisher-test-') as tmp:
    base = Path(tmp)
    remote = base / 'remote.git'
    source = base / 'source'
    source.mkdir()
    run(base, 'git', 'init', '--bare', str(remote))
    run(source, 'git', 'init', '-b', 'main')
    run(source, 'git', 'config', 'user.name', 'Publisher Test')
    run(source, 'git', 'config', 'user.email', 'test@example.invalid')
    run(source, 'git', 'remote', 'add', 'origin', str(remote))
    (source/'scripts').mkdir()
    shutil.copy2(SCRIPT, source/'scripts/publish-pack.py')
    (source/'hyperpop/vox').mkdir(parents=True)
    (source/'hyperpop/vox/hey.wav').write_bytes(b'fixture-audio')
    (source/'other').mkdir()
    (source/'other/excluded.wav').write_bytes(b'other-pack')
    manifest = {'_base':'unused', 'hey':['vox/hey.wav']}
    (source/'hyperpop/strudel.json').write_text(json.dumps(manifest))
    run(source,'git','add','.')
    run(source,'git','commit','-m','fixture')
    run(source,'python3','scripts/publish-pack.py','hyperpop')
    assert not run(base,'git','--git-dir',str(remote),'show-ref',check=False).stdout
    run(source,'python3','scripts/publish-pack.py','hyperpop','--push')
    names=run(base,'git','--git-dir',str(remote),'ls-tree','-r','--name-only','hyperpop').stdout.splitlines()
    assert names == ['.pack-source.json','README.md','strudel.json','vox/hey.wav'], names
    first=run(base,'git','--git-dir',str(remote),'rev-parse','hyperpop').stdout
    run(source,'python3','scripts/publish-pack.py','hyperpop','--push')
    assert first==run(base,'git','--git-dir',str(remote),'rev-parse','hyperpop').stdout
    (source/'hyperpop/vox/hey.wav').rename(source/'hyperpop/vox/hah.wav')
    (source/'hyperpop/strudel.json').write_text(json.dumps({'hah':['vox/hah.wav']}))
    run(source,'git','add','.')
    run(source,'git','commit','-m','update')
    run(source,'python3','scripts/publish-pack.py','hyperpop','--push')
    names=run(base,'git','--git-dir',str(remote),'ls-tree','-r','--name-only','hyperpop').stdout.splitlines()
    assert 'vox/hah.wav' in names and 'vox/hey.wav' not in names
    assert run(base,'git','--git-dir',str(remote),'rev-parse','hyperpop^').stdout==first
    (source/'hyperpop/strudel.json').write_text(json.dumps({'escape':['../other/excluded.wav']}))
    run(source,'git','add','.')
    run(source,'git','commit','-m','invalid')
    assert run(source,'python3','scripts/publish-pack.py','hyperpop','--push',check=False).returncode != 0
print('Publisher checks passed: preview, isolated branch, idempotency, updates, path containment')
