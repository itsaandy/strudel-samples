# hyperpop — published Strudel pack

```js
samples('github:itsaandy/strudel-samples/hyperpop')
```

Generated from `hyperpop/` on `main`. Edit the source folder, then run `python3 scripts/publish-pack.py hyperpop --push` from main. Do not edit this generated branch directly.

---

# Hyperpop

223 original WAV files. All sound names are lowercase.

Vocal names have no prefix: `hey`, `hah`, `who`, `hiccup`.
Other named sounds use a short category: `kick_cute`, `snare_smack`, `synth_bubble`.
Dry variants use the base group; wet variants use `_wet`.
Pitch and BPM are recorded in filenames; sample maps do not assume an octave or retune the audio.


Named loops include their source tempo, e.g. `drums_clicks_170bpm`.
Original short names remain compatibility aliases; group indices and audio are unchanged.
The CSV `sound` column lists the recommended name and `legacy_sound` records its older alias.
BPM labels come from source metadata, not audio estimation; fills without source BPM remain untagged.

## Browse by group

| Group | Samples | Example |
| --- | ---: | --- |
| `down` | 10 | `s("down:0 down:1")` |
| `drums` | 32 | `s("drums:0 drums:1")` |
| `extra` | 15 | `s("extra:0 extra:1")` |
| `hh` | 9 | `s("hh:0 hh:1")` |
| `hh_wet` | 9 | `s("hh_wet:0 hh_wet:1")` |
| `kick` | 12 | `s("kick:0 kick:1")` |
| `melody` | 11 | `s("melody:0 melody:1")` |
| `perc` | 30 | `s("perc:0 perc:1")` |
| `snare` | 10 | `s("snare:0 snare:1")` |
| `snare_wet` | 10 | `s("snare_wet:0 snare_wet:1")` |
| `synth` | 10 | `s("synth:0 synth:1")` |
| `synth_wet` | 10 | `s("synth_wet:0 synth_wet:1")` |
| `texture` | 15 | `s("texture:0 texture:1")` |
| `up` | 10 | `s("up:0 up:1")` |
| `vox` | 30 | `s("vox:0 vox:1")` |

Group indices start at 0 and follow the tables below.
Loading the map registers these names globally in Strudel, replacing any existing samples with the same names.

## Loops

Loop filenames retain their source BPM. Use `fit()` to stretch a loop over its pattern cycle:

```js
s("drums_hop_100bpm").fit()
```

## Sample catalog

The [CSV catalog](catalog.csv) also records each original filename.

### down

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `down_airship` | [airship.wav](down/airship.wav) |
| 1 | `down_flutter` | [flutter.wav](down/flutter.wav) |
| 2 | `down_frantic` | [frantic.wav](down/frantic.wav) |
| 3 | `down_insects` | [insects.wav](down/insects.wav) |
| 4 | `down_razor` | [razor.wav](down/razor.wav) |
| 5 | `down_scrape` | [scrape.wav](down/scrape.wav) |
| 6 | `down_shepard` | [shepard.wav](down/shepard.wav) |
| 7 | `down_snarl` | [snarl.wav](down/snarl.wav) |
| 8 | `down_square` | [square.wav](down/square.wav) |
| 9 | `down_static` | [static.wav](down/static.wav) |

### drums

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `drums_clicks_170bpm` | [clicks_170.wav](drums/clicks_170.wav) |
| 1 | `drums_clicks_tops_170bpm` | [clicks_170_tops.wav](drums/clicks_170_tops.wav) |
| 2 | `drums_creaky_170bpm` | [creaky_170.wav](drums/creaky_170.wav) |
| 3 | `drums_creaky_tops_170bpm` | [creaky_170_tops.wav](drums/creaky_170_tops.wav) |
| 4 | `drums_grind_140bpm` | [grind_140.wav](drums/grind_140.wav) |
| 5 | `drums_grind_tops_140bpm` | [grind_140_tops.wav](drums/grind_140_tops.wav) |
| 6 | `drums_heavy_120bpm` | [heavy_120.wav](drums/heavy_120.wav) |
| 7 | `drums_heavy_tops_120bpm` | [heavy_120_tops.wav](drums/heavy_120_tops.wav) |
| 8 | `drums_hop_100bpm` | [hop_100.wav](drums/hop_100.wav) |
| 9 | `drums_hop_tops_100bpm` | [hop_100_tops.wav](drums/hop_100_tops.wav) |
| 10 | `drums_house_120bpm` | [house_120.wav](drums/house_120.wav) |
| 11 | `drums_house_tops_120bpm` | [house_120_tops.wav](drums/house_120_tops.wav) |
| 12 | `drums_jump_140bpm` | [jump_140.wav](drums/jump_140.wav) |
| 13 | `drums_jump_tops_140bpm` | [jump_140_tops.wav](drums/jump_140_tops.wav) |
| 14 | `drums_loud_140bpm` | [loud_140.wav](drums/loud_140.wav) |
| 15 | `drums_loud_tops_140bpm` | [loud_140_tops.wav](drums/loud_140_tops.wav) |
| 16 | `drums_nod_170bpm` | [nod_170.wav](drums/nod_170.wav) |
| 17 | `drums_nod_tops_170bpm` | [nod_170_tops.wav](drums/nod_170_tops.wav) |
| 18 | `drums_scraps_100bpm` | [scraps_100.wav](drums/scraps_100.wav) |
| 19 | `drums_scraps_tops_100bpm` | [scraps_100_tops.wav](drums/scraps_100_tops.wav) |
| 20 | `drums_scream_140bpm` | [scream_140.wav](drums/scream_140.wav) |
| 21 | `drums_scream_tops_140bpm` | [scream_140_tops.wav](drums/scream_140_tops.wav) |
| 22 | `drums_snarl_120bpm` | [snarl_120.wav](drums/snarl_120.wav) |
| 23 | `drums_snarl_tops_120bpm` | [snarl_120_tops.wav](drums/snarl_120_tops.wav) |
| 24 | `drums_spacey_100bpm` | [spacey_100.wav](drums/spacey_100.wav) |
| 25 | `drums_spacey_tops_100bpm` | [spacey_100_tops.wav](drums/spacey_100_tops.wav) |
| 26 | `drums_squeaky_120bpm` | [squeaky_120.wav](drums/squeaky_120.wav) |
| 27 | `drums_squeaky_tops_120bpm` | [squeaky_120_tops.wav](drums/squeaky_120_tops.wav) |
| 28 | `drums_stomp_100bpm` | [stomp_100.wav](drums/stomp_100.wav) |
| 29 | `drums_stomp_tops_100bpm` | [stomp_100_tops.wav](drums/stomp_100_tops.wav) |
| 30 | `drums_wet_170bpm` | [wet_170.wav](drums/wet_170.wav) |
| 31 | `drums_wet_tops_170bpm` | [wet_170_tops.wav](drums/wet_170_tops.wav) |

### extra

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `extra_arpeggio_down` | [arpeggio_down.wav](extra/arpeggio_down.wav) |
| 1 | `extra_arpeggio_up` | [arpeggio_up.wav](extra/arpeggio_up.wav) |
| 2 | `extra_bells_high` | [bells_high.wav](extra/bells_high.wav) |
| 3 | `extra_bells_low` | [bells_low.wav](extra/bells_low.wav) |
| 4 | `extra_crush` | [crush.wav](extra/crush.wav) |
| 5 | `extra_double_metal` | [double_metal.wav](extra/double_metal.wav) |
| 6 | `extra_glass` | [glass_g.wav](extra/glass_g.wav) |
| 7 | `extra_harp` | [harp_bb.wav](extra/harp_bb.wav) |
| 8 | `extra_metal` | [metal.wav](extra/metal.wav) |
| 9 | `extra_oboe` | [oboe_a.wav](extra/oboe_a.wav) |
| 10 | `extra_piano_01` | [piano_01_cs.wav](extra/piano_01_cs.wav) |
| 11 | `extra_piano_02` | [piano_02_fs.wav](extra/piano_02_fs.wav) |
| 12 | `extra_pluck` | [pluck_d.wav](extra/pluck_d.wav) |
| 13 | `extra_pong` | [pong_cs.wav](extra/pong_cs.wav) |
| 14 | `extra_trumpet` | [trumpet_g.wav](extra/trumpet_g.wav) |

### hh

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `hh_clicks` | [clicks.wav](hh/clicks.wav) |
| 1 | `hh_knife` | [knife.wav](hh/knife.wav) |
| 2 | `hh_lazer` | [lazer.wav](hh/lazer.wav) |
| 3 | `hh_metallic` | [metallic.wav](hh/metallic.wav) |
| 4 | `hh_noisy` | [noisy.wav](hh/noisy.wav) |
| 5 | `hh_ring` | [ring.wav](hh/ring.wav) |
| 6 | `hh_sharp` | [sharp.wav](hh/sharp.wav) |
| 7 | `hh_squeak` | [squeak.wav](hh/squeak.wav) |
| 8 | `hh_tight` | [tight.wav](hh/tight.wav) |

### hh_wet

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `hh_wet_clicks` | [clicks.wav](hh_wet/clicks.wav) |
| 1 | `hh_wet_knife` | [knife.wav](hh_wet/knife.wav) |
| 2 | `hh_wet_lazer` | [lazer.wav](hh_wet/lazer.wav) |
| 3 | `hh_wet_metallic` | [metallic.wav](hh_wet/metallic.wav) |
| 4 | `hh_wet_noisy` | [noisy.wav](hh_wet/noisy.wav) |
| 5 | `hh_wet_ring` | [ring.wav](hh_wet/ring.wav) |
| 6 | `hh_wet_sharp` | [sharp.wav](hh_wet/sharp.wav) |
| 7 | `hh_wet_squeak` | [squeak.wav](hh_wet/squeak.wav) |
| 8 | `hh_wet_tight` | [tight.wav](hh_wet/tight.wav) |

### kick

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `kick_clappy` | [clappy_g.wav](kick/clappy_g.wav) |
| 1 | `kick_clicky` | [clicky_c.wav](kick/clicky_c.wav) |
| 2 | `kick_cute` | [cute_c.wav](kick/cute_c.wav) |
| 3 | `kick_long` | [long_c.wav](kick/long_c.wav) |
| 4 | `kick_metallic` | [metallic_c.wav](kick/metallic_c.wav) |
| 5 | `kick_metallic_drive` | [metallic_drive_c.wav](kick/metallic_drive_c.wav) |
| 6 | `kick_plucky` | [plucky_c.wav](kick/plucky_c.wav) |
| 7 | `kick_plucky_drive` | [plucky_drive_c.wav](kick/plucky_drive_c.wav) |
| 8 | `kick_squelch` | [squelch_c.wav](kick/squelch_c.wav) |
| 9 | `kick_stomp` | [stomp_c.wav](kick/stomp_c.wav) |
| 10 | `kick_wet` | [wet_c.wav](kick/wet_c.wav) |
| 11 | `kick_wooden` | [wooden_c.wav](kick/wooden_c.wav) |

### melody

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `melody_airy_organ_130bpm` | [airy_organ_130_amin.wav](melody/airy_organ_130_amin.wav) |
| 1 | `melody_cheesy_115bpm` | [cheesy_115_c.wav](melody/cheesy_115_c.wav) |
| 2 | `melody_cutesy_105bpm` | [cutesy_105_amin.wav](melody/cutesy_105_amin.wav) |
| 3 | `melody_gallop_120bpm` | [gallop_120_bmin.wav](melody/gallop_120_bmin.wav) |
| 4 | `melody_grainy_135bpm` | [grainy_135_emin.wav](melody/grainy_135_emin.wav) |
| 5 | `melody_indifferent_120bpm` | [indifferent_120_amin.wav](melody/indifferent_120_amin.wav) |
| 6 | `melody_intense_arpeggio_150bpm` | [intense_arpeggio_150_emin.wav](melody/intense_arpeggio_150_emin.wav) |
| 7 | `melody_low_125bpm` | [low_125_f.wav](melody/low_125_f.wav) |
| 8 | `melody_plucks_140bpm` | [plucks_140_a.wav](melody/plucks_140_a.wav) |
| 9 | `melody_strum_90bpm` | [strum_90_e.wav](melody/strum_90_e.wav) |
| 10 | `melody_vocal_120bpm` | [vocal_120_c.wav](melody/vocal_120_c.wav) |

### perc

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `perc_bounce` | [bounce.wav](perc/bounce.wav) |
| 1 | `perc_bowl` | [bowl.wav](perc/bowl.wav) |
| 2 | `perc_buzzy` | [buzzy.wav](perc/buzzy.wav) |
| 3 | `perc_clap` | [clap.wav](perc/clap.wav) |
| 4 | `perc_coo` | [coo.wav](perc/coo.wav) |
| 5 | `perc_double` | [double.wav](perc/double.wav) |
| 6 | `perc_echo` | [echo.wav](perc/echo.wav) |
| 7 | `perc_hollow` | [hollow.wav](perc/hollow.wav) |
| 8 | `perc_jitter` | [jitter.wav](perc/jitter.wav) |
| 9 | `perc_lazers` | [lazers.wav](perc/lazers.wav) |
| 10 | `perc_open` | [open.wav](perc/open.wav) |
| 11 | `perc_pin` | [pin.wav](perc/pin.wav) |
| 12 | `perc_pluck` | [pluck.wav](perc/pluck.wav) |
| 13 | `perc_rev` | [rev.wav](perc/rev.wav) |
| 14 | `perc_ring` | [ring.wav](perc/ring.wav) |
| 15 | `perc_riser` | [riser.wav](perc/riser.wav) |
| 16 | `perc_scrape` | [scrape.wav](perc/scrape.wav) |
| 17 | `perc_shaker` | [shaker.wav](perc/shaker.wav) |
| 18 | `perc_smack` | [smack.wav](perc/smack.wav) |
| 19 | `perc_squeal` | [squeal.wav](perc/squeal.wav) |
| 20 | `perc_static` | [static.wav](perc/static.wav) |
| 21 | `perc_step` | [step.wav](perc/step.wav) |
| 22 | `perc_stomp` | [stomp.wav](perc/stomp.wav) |
| 23 | `perc_strum` | [strum.wav](perc/strum.wav) |
| 24 | `perc_sweep` | [sweep.wav](perc/sweep.wav) |
| 25 | `perc_toaster` | [toaster.wav](perc/toaster.wav) |
| 26 | `perc_verb` | [verb.wav](perc/verb.wav) |
| 27 | `perc_wiggle` | [wiggle.wav](perc/wiggle.wav) |
| 28 | `perc_woo` | [woo.wav](perc/woo.wav) |
| 29 | `perc_wood` | [wood.wav](perc/wood.wav) |

### snare

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `snare_clap` | [clap.wav](snare/clap.wav) |
| 1 | `snare_double` | [double.wav](snare/double.wav) |
| 2 | `snare_hollow` | [hollow.wav](snare/hollow.wav) |
| 3 | `snare_lazer` | [lazer.wav](snare/lazer.wav) |
| 4 | `snare_pluck` | [pluck.wav](snare/pluck.wav) |
| 5 | `snare_smack` | [smack.wav](snare/smack.wav) |
| 6 | `snare_snap` | [snap.wav](snare/snap.wav) |
| 7 | `snare_spring` | [spring.wav](snare/spring.wav) |
| 8 | `snare_sustained` | [sustained.wav](snare/sustained.wav) |
| 9 | `snare_vocal` | [vocal.wav](snare/vocal.wav) |

### snare_wet

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `snare_wet_clap` | [clap.wav](snare_wet/clap.wav) |
| 1 | `snare_wet_double` | [double.wav](snare_wet/double.wav) |
| 2 | `snare_wet_hollow` | [hollow.wav](snare_wet/hollow.wav) |
| 3 | `snare_wet_lazer` | [lazer.wav](snare_wet/lazer.wav) |
| 4 | `snare_wet_pluck` | [pluck.wav](snare_wet/pluck.wav) |
| 5 | `snare_wet_smack` | [smack.wav](snare_wet/smack.wav) |
| 6 | `snare_wet_snap` | [snap.wav](snare_wet/snap.wav) |
| 7 | `snare_wet_spring` | [spring.wav](snare_wet/spring.wav) |
| 8 | `snare_wet_sustained` | [sustained.wav](snare_wet/sustained.wav) |
| 9 | `snare_wet_vocal` | [vocal.wav](snare_wet/vocal.wav) |

### synth

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `synth_bubble` | [bubble_c.wav](synth/bubble_c.wav) |
| 1 | `synth_coin` | [coin_c.wav](synth/coin_c.wav) |
| 2 | `synth_dramatic` | [dramatic_c.wav](synth/dramatic_c.wav) |
| 3 | `synth_noisy` | [noisy_c.wav](synth/noisy_c.wav) |
| 4 | `synth_pluck_bass` | [pluck_bass_fs.wav](synth/pluck_bass_fs.wav) |
| 5 | `synth_ringing` | [ringing_c.wav](synth/ringing_c.wav) |
| 6 | `synth_riser` | [riser_c.wav](synth/riser_c.wav) |
| 7 | `synth_string` | [string_c.wav](synth/string_c.wav) |
| 8 | `synth_sweep` | [sweep_c.wav](synth/sweep_c.wav) |
| 9 | `synth_wobble` | [wobble_c.wav](synth/wobble_c.wav) |

### synth_wet

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `synth_wet_bubble` | [bubble_c.wav](synth_wet/bubble_c.wav) |
| 1 | `synth_wet_coin` | [coin_c.wav](synth_wet/coin_c.wav) |
| 2 | `synth_wet_dramatic` | [dramatic_c.wav](synth_wet/dramatic_c.wav) |
| 3 | `synth_wet_noisy` | [noisy_c.wav](synth_wet/noisy_c.wav) |
| 4 | `synth_wet_pluck_bass` | [pluck_bass_fs.wav](synth_wet/pluck_bass_fs.wav) |
| 5 | `synth_wet_ringing` | [ringing_c.wav](synth_wet/ringing_c.wav) |
| 6 | `synth_wet_riser` | [riser_c.wav](synth_wet/riser_c.wav) |
| 7 | `synth_wet_string` | [string_c.wav](synth_wet/string_c.wav) |
| 8 | `synth_wet_sweep` | [sweep_c.wav](synth_wet/sweep_c.wav) |
| 9 | `synth_wet_wobble` | [wobble_c.wav](synth_wet/wobble_c.wav) |

### texture

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `texture_boar` | [boar.wav](texture/boar.wav) |
| 1 | `texture_crackle` | [crackle.wav](texture/crackle.wav) |
| 2 | `texture_creaky` | [creaky.wav](texture/creaky.wav) |
| 3 | `texture_crying` | [crying.wav](texture/crying.wav) |
| 4 | `texture_echo` | [echo.wav](texture/echo.wav) |
| 5 | `texture_glass` | [glass.wav](texture/glass.wav) |
| 6 | `texture_paper` | [paper.wav](texture/paper.wav) |
| 7 | `texture_propeller` | [propeller.wav](texture/propeller.wav) |
| 8 | `texture_scattered` | [scattered.wav](texture/scattered.wav) |
| 9 | `texture_scrape` | [scrape.wav](texture/scrape.wav) |
| 10 | `texture_snarling` | [snarling.wav](texture/snarling.wav) |
| 11 | `texture_tin` | [tin.wav](texture/tin.wav) |
| 12 | `texture_underwater` | [underwater.wav](texture/underwater.wav) |
| 13 | `texture_warehouse` | [warehouse.wav](texture/warehouse.wav) |
| 14 | `texture_washy` | [washy.wav](texture/washy.wav) |

### up

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `up_creatures` | [creatures.wav](up/creatures.wav) |
| 1 | `up_fade` | [fade.wav](up/fade.wav) |
| 2 | `up_gasping` | [gasping.wav](up/gasping.wav) |
| 3 | `up_hover` | [hover.wav](up/hover.wav) |
| 4 | `up_itchy` | [itchy.wav](up/itchy.wav) |
| 5 | `up_meow` | [meow.wav](up/meow.wav) |
| 6 | `up_motor` | [motor.wav](up/motor.wav) |
| 7 | `up_propeller` | [propeller.wav](up/propeller.wav) |
| 8 | `up_quick` | [quick.wav](up/quick.wav) |
| 9 | `up_spiky` | [spiky.wav](up/spiky.wav) |

### vox

| Index | Sound name | File |
| ---: | --- | --- |
| 0 | `airy` | [airy_a.wav](vox/airy_a.wav) |
| 1 | `bwoh` | [bwoh_g.wav](vox/bwoh_g.wav) |
| 2 | `cough` | [cough_eb.wav](vox/cough_eb.wav) |
| 3 | `distorted` | [distorted.wav](vox/distorted.wav) |
| 4 | `eugh` | [eugh_a.wav](vox/eugh_a.wav) |
| 5 | `full` | [full_a.wav](vox/full_a.wav) |
| 6 | `gou` | [gou_g.wav](vox/gou_g.wav) |
| 7 | `hah` | [hah.wav](vox/hah.wav) |
| 8 | `heh` | [heh.wav](vox/heh.wav) |
| 9 | `hehe` | [hehe_fs.wav](vox/hehe_fs.wav) |
| 10 | `hey` | [hey.wav](vox/hey.wav) |
| 11 | `hiccup` | [hiccup.wav](vox/hiccup.wav) |
| 12 | `high` | [high_a.wav](vox/high_a.wav) |
| 13 | `hih` | [hih.wav](vox/hih.wav) |
| 14 | `hmph` | [hmph.wav](vox/hmph.wav) |
| 15 | `hoh` | [hoh_b.wav](vox/hoh_b.wav) |
| 16 | `hooh` | [hooh.wav](vox/hooh.wav) |
| 17 | `huh` | [huh.wav](vox/huh.wav) |
| 18 | `kwoh` | [kwoh_g.wav](vox/kwoh_g.wav) |
| 19 | `owah` | [owah_eb.wav](vox/owah_eb.wav) |
| 20 | `pluck` | [pluck_g.wav](vox/pluck_g.wav) |
| 21 | `reverb` | [reverb_f.wav](vox/reverb_f.wav) |
| 22 | `short` | [short_ab.wav](vox/short_ab.wav) |
| 23 | `soft` | [soft_f.wav](vox/soft_f.wav) |
| 24 | `stutter` | [stutter_eb_f.wav](vox/stutter_eb_f.wav) |
| 25 | `throat` | [throat.wav](vox/throat.wav) |
| 26 | `whine` | [whine_cs.wav](vox/whine_cs.wav) |
| 27 | `whistle` | [whistle.wav](vox/whistle.wav) |
| 28 | `who` | [who_fs.wav](vox/who_fs.wav) |
| 29 | `yah` | [yah.wav](vox/yah.wav) |
