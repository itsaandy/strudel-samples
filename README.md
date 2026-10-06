# Strudel samples

## Hyperpop

223 WAV samples from the Ninajirachi Sample Pack, organized under [`hyperpop/`](hyperpop/).
Audio is unchanged. Filenames are lowercase, with repeated artist/category/one-shot
prefixes removed. Keys and BPM are retained in filenames (`fs` means F sharp).

```js
samples('github:itsaandy/strudel-samples/hyperpop')

stack(
  s("kick_cute*4"),
  s("~ snare_smack ~ snare_smack"),
  s("hh_tight*8").gain(0.4),
  s("hey ~ hah ~")
)
```

Load only this pack with:

```js
samples('https://raw.githubusercontent.com/itsaandy/strudel-samples/main/hyperpop/strudel.json')
```

See the [Hyperpop catalog](hyperpop/README.md) for groups and every playable name.
The maps use the [Strudel custom sample format](https://strudel.cc/learn/samples/).

## UKG

154 WAV samples combined from 17 UK garage and speed garage packs, organized under
[`ukg/`](ukg/). Includes individual drums, basses, vocal hits/hooks, keys, grooves,
tops, fills, and FX. [See the catalog and source-pack list](ukg/README.md).

```js
samples('github:itsaandy/strudel-samples/ukg')
s("kick_butter ~ clap_garage ~, hh_subtle*8")
```

The pack branch uses short names. In the combined root map, all UKG groups and
named sounds have a `ukg_` prefix (`ukg_kick`, `ukg_kick_butter`, etc.), preserving
existing Hyperpop aliases. Future packs should likewise use their pack prefix in
the combined map; never silently replace previously published names or reorder indices.

## Repository format and pack branches (for maintainers and agents)

`main` is the source of truth. Keep each pack in a lowercase folder named after
its published branch, e.g. `hyperpop/`. Never use pack branches as the editing
source and never merge generated pack branches into `main`.

| Location | Purpose |
| --- | --- |
| `main:<pack>/` | Editable pack audio, README, catalog, and pack-specific `strudel.json` |
| `main:strudel.json` | Combined map, with paths prefixed by their pack folders |
| `<pack>:strudel.json` | Published pack map at the branch root, referencing only that pack |
| `<pack>:.pack-source.json` | Source commit and folder provenance |
| `scripts/publish-pack.py` | Validates and publishes one pack branch |
| `userscripts/strudel-samples.user.js` | Sample-name autocomplete for Strudel |

Use the branch shortcut to load only Hyperpop:

```js
samples('github:itsaandy/strudel-samples/hyperpop')
s('hey kick_cute snare_smack')
```

Strudel interprets `github:owner/repo/branch` as a branch, not a folder.
The published branch has `kick/`, `vox/`, etc. at its root; its manifest's
`_base` points to `https://raw.githubusercontent.com/itsaandy/strudel-samples/hyperpop/`.
It contains no adjacent packs. The new pack branch starts with independent history;
subsequent publications append commits without force-pushing.

The main-branch shortcut `samples('github:itsaandy/strudel-samples')` loads the
combined map. The explicit `main/hyperpop/strudel.json` URL remains supported.
Loading a pack does not clear previously registered sounds. Names are global in
Strudel; when multiple packs define the same name, load order matters.

### Loop tempo names

Named loops carry a `_<tempo>bpm` suffix, e.g. `drums_hop_100bpm` (Hyperpop)
and `drums_vibez_135bpm` (UKG). Tempo-tagged UKG fills follow the same convention.
The combined map uses `ukg_drums_vibez_135bpm`. Old tempo-less loop aliases have
been removed at the user's request. Use BPM-suffixed names in saved patterns.
Group indices are unchanged. Reload Strudel to clear old runtime registrations,
then run the sample-loading calls again; autocomplete will show only current names.

For future agents: retain source BPM in playable loop names as well as filenames.
Use catalog/source metadata; do not guess missing tempos. Keep `sound` as the
playable name and `bpm` as source tempo. Do not reintroduce the removed tempo-less
loop aliases. Keep group arrays in their existing order.

### Add or update a pack

1. Work in a temporary checkout under `/tmp`. Copy original audio there before
   changing names; never rename, move, or modify the original Splice pack.
2. Edit `<pack>/` on `main`. Keep filenames lowercase and concise, retain useful
   BPM/key metadata, and preserve audio bytes. Exclude `.DS_Store` and `.asd` files.
3. Maintain `<pack>/strudel.json`: sample paths are relative to that folder and
   `_base` points to its folder on `main`. Keep catalog indices stable for existing
   samples (append new variations), and update the pack README/catalog.
4. Maintain the combined root `strudel.json` explicitly. Prefix paths with
   `<pack>/`, and resolve name collisions deliberately; do not silently overwrite
   unrelated packs. Keep existing aliases compatible where possible.
5. Commit and push the clean `main` source, then publish:

   ```sh
   python3 scripts/publish-pack.py hyperpop          # validate and preview
   python3 scripts/publish-pack.py hyperpop --push   # publish to origin/hyperpop
   ```

   Requires Python 3.9+ and authenticated Git push access. No extra Python packages.
   Run on `main` with a clean working tree. For other packs, substitute their slug.
   Publication is explicit: pushing `main` alone does not update pack branches.
6. Check the remote manifest and audio URLs before removing the temporary checkout.

The publisher copies only the chosen pack's files, rewrites `_base`, validates
that all sample paths resolve inside that pack, and generates publication metadata.
It creates a temporary checkout and removes it afterward. If a concurrent publisher
updates the same remote branch, a non-fast-forward push fails safely; rerun from
current source instead of force-pushing. Treat pack branches as generated output.
Do not attach a blanket open-source license to third-party sample audio.

## Autocomplete userscript

Install [`userscripts/strudel-samples.user.js`](userscripts/strudel-samples.user.js)
in Tampermonkey, replacing the entire older script rather than enabling duplicates.
Version 0.3.1 retains the native-style completion menu and discovers literal calls:

```js
samples('github:itsaandy/strudel-samples/hyperpop')
// Also supported: github:owner/repo (defaults to main), or an HTTPS .json URL.
```

Suggestions combine the keys of the referenced maps, excluding metadata keys.
Removing a reference removes its suggestions; the script no longer always reads
the combined root map. It reads the editor text without evaluating it, debounces
map changes, ignores stale responses, and caches successful maps for one minute.
Reload the page to refetch, or call `window.strudelSampleAutocomplete.refresh()`
in the browser console. Failures are logged rather than falling back to all packs.

This follows literal references in your code, not Strudel's runtime sound registry:
conditional calls are included, even before evaluation, and sounds from previously
executed code may remain playable after their reference is removed. Variables,
computed URLs, interpolated templates, inline sample objects, and branch names
containing `/` are not supported. Use a direct HTTPS JSON URL for such branch paths.
Regular-expression literals are outside this lightweight parser's supported syntax.
Defaults and synthesized sounds are not included unless a referenced map lists them.

Type inside `s("...")` or `sound("...")`; use arrows and Tab/Enter to insert, Esc to
close. The script uses the live editor's theme classes and preserves surrounding
mini-notation. Keep the script source on `main`; do not copy it into pack branches.

### Audition samples in autocomplete (v0.3.0)

- Type a sound prefix inside `s("...")` or `sound("...")`, then use **↑/↓** to
  select and preview a sound. Opening a menu by typing alone stays silent.
- The selected row has a blue highlight, a pale left edge, and a **▶** marker,
  including when Strudel’s native autocomplete is disabled. The marker identifies
  the selected preview target; it remains after playback finishes.
- Click the **♪ / ▶** icon to preview/replay a row without inserting it. Click its
  name or press **Tab/Enter** to insert. **Ctrl+Space** previews the first match.
- **Esc**, insertion, changing the query/maps, clicking outside the menu, or
  leaving the editor/tab stops the preview. Selecting another sound stops the old one.
- Previews wait 150 ms after navigation, use 25% linear gain, and play at most
  three seconds at original speed/pitch, with a short fade. They use their own
  AudioContext and the browser's default audio output; Strudel playback/effects
  and its selected audio output are independent.
- Group arrays preview their first variation; pitch maps preview their first
  entry without retuning. Full HTTPS paths, relative paths, and `_base` are resolved
  from the fetched manifest. Failed downloads/decodes leave autocomplete working;
  hover the row for the error or check the console.
- Audio is fetched on demand and decoded buffers are cached in memory (up to 24
  buffers / 32 MiB). Stale requests are cancelled/ignored. A browser may require
  another arrow key or icon click to unlock audio; no Strudel evaluation is needed.

When multiple referenced maps share a name, the last distinct reference in source
order supplies its preview. This is source-based discovery, not a reflection of
conditional execution or the runtime registry. Use distinct names for predictable results.
To inspect the running version/status, use `window.strudelSampleAutocomplete.version`
and `.previewStatus` in the browser console.

### Maintenance checks

```sh
node --check userscripts/strudel-samples.user.js
node tests/sample-maps.cjs
node tests/audio-preview.cjs
python3 tests/publish-pack.py
```

These checks use fixtures and temporary local Git repositories; they do not publish to GitHub.
