# Strudel samples

## Hyperpop

223 WAV samples from the Ninajirachi Sample Pack, organized under [`hyperpop/`](hyperpop/).
Audio is unchanged. Filenames are lowercase, with repeated artist/category/one-shot
prefixes removed. Keys and BPM are retained in filenames (`fs` means F sharp).

```js
samples('github:itsaandy/strudel-samples')

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
