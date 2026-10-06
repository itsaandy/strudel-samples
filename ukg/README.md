# UKG

154 unchanged WAV samples from 17 locally available UK garage and speed garage packs (212.9 MB).

```js
samples('github:itsaandy/strudel-samples/ukg')

setcpm(135/4)
stack(
  s("kick_butter*4"),
  s("~ clap_garage ~ clap_garage"),
  s("hh_subtle*8").gain(0.4)
)
```


Named loops include their source tempo, e.g. `bass_loop_classic_reese_135bpm`.
Old tempo-less loop aliases have been removed. Use the BPM-suffixed names; group indices and audio are unchanged.
The CSV `sound` column lists the playable name. Reload Strudel to clear previously registered old names.
BPM labels come from source metadata, not audio estimation; fills without source BPM remain untagged.

## Organization

Individual hits use `kick`, `snare`, `clap`, `hh` (closed hats), `oh` (open hats),
`perc`, `bass`, `vox`, and `fx`. Crashes live under `perc` with `crash` in their names.
`drums` holds drum loops, `tops` holds top/hat loops, and `fills` holds fills.
Bass, keys, vocal, percussion, and FX loops live in their category’s `loops/` subfolder
and use separate groups (`bass_loop`, `keys_loop`, `vox_loop`, `perc_loop`, `fx_loop`).
All selected keys material is loop-based; the songstarter is labeled explicitly.

Filenames preserve source BPM/key labels; `fs`/`ds` mean F-sharp/D-sharp.
Playable loop names end in `_<tempo>bpm`; one-shot names omit BPM/key labels (tempo-tagged fills also have BPM names). No octave is inferred and audio is not retuned.
Dry/wet versions and distinct variations are retained. No byte-identical duplicates were found.
Source folders determine loop versus one-shot classification; fills are always separate.
The catalog retains the original filename/path, source pack, duration, and SHA-256 hash.

```js
s("kick:0 ~ snare:1 ~") // indices are listed below
s("drums_vibez_135bpm").fit() // fit the complete loop into one pattern cycle
```

`fit()` stretches to the pattern length; choose the number of cycles for the musical phrase you want.

## Loading alongside other packs

The `ukg` branch and `main/ukg/strudel.json` expose these short names.
The combined map on `main` prefixes every UKG name/group with `ukg_`
(e.g. `ukg_kick_butter`, `ukg_vox_loop`) to preserve existing Hyperpop names.
When loading individual pack maps together, shared short group names are global
and later loads can replace earlier ones. Use the combined map for collision-free UKG aliases.

## Groups

| Group | Count |
| --- | ---: |
| `bass` | 2 |
| `bass_loop` | 12 |
| `clap` | 11 |
| `drums` | 8 |
| `fills` | 4 |
| `fx` | 12 |
| `fx_loop` | 2 |
| `hh` | 8 |
| `keys_loop` | 13 |
| `kick` | 10 |
| `oh` | 4 |
| `perc` | 13 |
| `perc_loop` | 3 |
| `snare` | 8 |
| `tops` | 15 |
| `vox` | 5 |
| `vox_loop` | 24 |

## Source packs

| Pack | Sounds |
| --- | ---: |
| Darby UK Garage | 2 |
| Garage & Drill Vocals | 11 |
| Garage, M8 | 5 |
| Grind - Speed Garage | 28 |
| No Sleep - UK Garage | 8 |
| Nu Skool Garage & House | 14 |
| Old Skool Garage | 3 |
| Phase Plant Nu Skool Garage | 7 |
| Phase Plant Speed Garage | 11 |
| Serum 2 Garage Essentials | 9 |
| Serum Dark Garage | 4 |
| Speed Garage | 10 |
| Speed Garage Ultra Pack | 13 |
| UK Bass Ultra Pack | 8 |
| UK Garage | 10 |
| UK Garage Samples | 8 |
| UK Garage Vocals | 3 |

## Catalog

[Download the complete provenance catalog](catalog.csv). Group indices start at zero.
Keep existing indices stable when extending this pack: append new samples to each group.

### bass

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `bass_fm_womp` |  | Dmin | [fm_womp_dmin.wav](bass/fm_womp_dmin.wav) |
| 1 | `bass_wata` |  | D | [wata_d.wav](bass/wata_d.wav) |

### bass_loop

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `bass_loop_classic_reese_135bpm` | 135 | Fmin | [classic_reese_135_fmin.wav](bass/loops/classic_reese_135_fmin.wav) |
| 1 | `bass_loop_deep_organ_135bpm` | 135 | Dmin | [deep_organ_135_dmin.wav](bass/loops/deep_organ_135_dmin.wav) |
| 2 | `bass_loop_freak_fm_135bpm` | 135 | Dmin | [freak_fm_135_dmin.wav](bass/loops/freak_fm_135_dmin.wav) |
| 3 | `bass_loop_gravity_reese_main_134bpm` | 134 | Amin | [gravity_reese_main_134_amin.wav](bass/loops/gravity_reese_main_134_amin.wav) |
| 4 | `bass_loop_no_fund_wob_132bpm` | 132 | Gmin | [no_fund_wob_132_gmin.wav](bass/loops/no_fund_wob_132_gmin.wav) |
| 5 | `bass_loop_organ_reese_132bpm` | 132 | Gmin | [organ_reese_132_gmin.wav](bass/loops/organ_reese_132_gmin.wav) |
| 6 | `bass_loop_over_135bpm` | 135 | E | [over_135_e.wav](bass/loops/over_135_e.wav) |
| 7 | `bass_loop_pop_organ_132bpm` | 132 | Gmin | [pop_organ_132_gmin.wav](bass/loops/pop_organ_132_gmin.wav) |
| 8 | `bass_loop_shake_groove_132bpm` | 132 | Cm | [shake_groove_132_cm.wav](bass/loops/shake_groove_132_cm.wav) |
| 9 | `bass_loop_solar_131bpm` | 131 | Amin | [solar_131_amin.wav](bass/loops/solar_131_amin.wav) |
| 10 | `bass_loop_trappy_subsonic_132bpm` | 132 | Cm | [trappy_subsonic_132_cm.wav](bass/loops/trappy_subsonic_132_cm.wav) |
| 11 | `bass_loop_turnt_128bpm` | 128 | D#m | [turnt_128_dsm.wav](bass/loops/turnt_128_dsm.wav) |

### clap

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `clap_boosted` |  |  | [boosted.wav](clap/boosted.wav) |
| 1 | `clap_crunch` |  |  | [crunch.wav](clap/crunch.wav) |
| 2 | `clap_crunchy_follow` |  |  | [crunchy_follow.wav](clap/crunchy_follow.wav) |
| 3 | `clap_energic` |  |  | [energic.wav](clap/energic.wav) |
| 4 | `clap_fast` |  |  | [fast.wav](clap/fast.wav) |
| 5 | `clap_garage` |  |  | [garage.wav](clap/garage.wav) |
| 6 | `clap_hard_feel` |  |  | [hard_feel.wav](clap/hard_feel.wav) |
| 7 | `clap_layer` |  |  | [layer.wav](clap/layer.wav) |
| 8 | `clap_punchy_flex` |  |  | [punchy_flex.wav](clap/punchy_flex.wav) |
| 9 | `clap_simply` |  |  | [simply.wav](clap/simply.wav) |
| 10 | `clap_wheel_up` |  |  | [wheel_up.wav](clap/wheel_up.wav) |

### drums

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `drums_bullett_140bpm` | 140 |  | [bullett_140.wav](drums/bullett_140.wav) |
| 1 | `drums_kick_snare_silky_130bpm` | 130 |  | [kick_snare_silky_130.wav](drums/kick_snare_silky_130.wav) |
| 2 | `drums_london_dance_132bpm` | 132 |  | [london_dance_132.wav](drums/london_dance_132.wav) |
| 3 | `drums_modern_132bpm` | 132 |  | [modern_132.wav](drums/modern_132.wav) |
| 4 | `drums_tidy_step_132bpm` | 132 |  | [tidy_step_132.wav](drums/tidy_step_132.wav) |
| 5 | `drums_vibez_135bpm` | 135 |  | [vibez_135.wav](drums/vibez_135.wav) |
| 6 | `drums_vinyl_pitched_snare_135bpm` | 135 |  | [vinyl_pitched_snare_135.wav](drums/vinyl_pitched_snare_135.wav) |
| 7 | `drums_wave_140bpm` | 140 |  | [wave_140.wav](drums/wave_140.wav) |

### fills

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `fills_down_137bpm` | 137 |  | [down_137.wav](fills/down_137.wav) |
| 1 | `fills_jet_fuel_kick_scratch_135bpm` | 135 |  | [jet_fuel_kick_scratch_135.wav](fills/jet_fuel_kick_scratch_135.wav) |
| 2 | `fills_mini_135bpm` | 135 |  | [mini_135.wav](fills/mini_135.wav) |
| 3 | `fills_stay_spinback_135bpm` | 135 |  | [stay_spinback_135.wav](fills/stay_spinback_135.wav) |

### fx

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `fx_clash_lazer` | 132 | Gmin | [clash_lazer_132_gmin.wav](fx/clash_lazer_132_gmin.wav) |
| 1 | `fx_kick_blast` | 135 |  | [kick_blast_135.wav](fx/kick_blast_135.wav) |
| 2 | `fx_operator_phone_lick_shot` |  | Am | [operator_phone_lick_shot_am.wav](fx/operator_phone_lick_shot_am.wav) |
| 3 | `fx_rewind` | 135 |  | [rewind_135.wav](fx/rewind_135.wav) |
| 4 | `fx_riser_everything_chop` |  |  | [riser_everything_chop.wav](fx/riser_everything_chop.wav) |
| 5 | `fx_scratch` | 132 | Gmin | [scratch_132_gmin.wav](fx/scratch_132_gmin.wav) |
| 6 | `fx_siren_liver` |  |  | [siren_liver.wav](fx/siren_liver.wav) |
| 7 | `fx_soundclash_sirenshot` | 135 |  | [soundclash_sirenshot_135.wav](fx/soundclash_sirenshot_135.wav) |
| 8 | `fx_sweep_up_reversed` |  |  | [sweep_up_reversed.wav](fx/sweep_up_reversed.wav) |
| 9 | `fx_tape_spinback` |  |  | [tape_spinback.wav](fx/tape_spinback.wav) |
| 10 | `fx_upsweep_slow` |  |  | [upsweep_slow.wav](fx/upsweep_slow.wav) |
| 11 | `fx_white_crash` | 132 | Gmin | [white_crash_132_gmin.wav](fx/white_crash_132_gmin.wav) |

### fx_loop

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `fx_loop_vinyl_kicker_130bpm` | 130 |  | [vinyl_kicker_130.wav](fx/loops/vinyl_kicker_130.wav) |
| 1 | `fx_loop_vinyl_scratch_train_cuts_130bpm` | 130 |  | [vinyl_scratch_train_cuts_130.wav](fx/loops/vinyl_scratch_train_cuts_130.wav) |

### hh

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `hh_chocolate` |  |  | [chocolate.wav](hh/chocolate.wav) |
| 1 | `hh_low_ghost` |  |  | [low_ghost.wav](hh/low_ghost.wav) |
| 2 | `hh_mid_vanilla` |  |  | [mid_vanilla.wav](hh/mid_vanilla.wav) |
| 3 | `hh_noise_feel` |  |  | [noise_feel.wav](hh/noise_feel.wav) |
| 4 | `hh_subtle` |  |  | [subtle.wav](hh/subtle.wav) |
| 5 | `hh_tech` |  |  | [tech.wav](hh/tech.wav) |
| 6 | `hh_ukg` |  |  | [ukg.wav](hh/ukg.wav) |
| 7 | `hh_white` |  |  | [white.wav](hh/white.wav) |

### keys_loop

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `keys_loop_chord_holloway_rd_135bpm` | 135 | Ebmaj | [chord_holloway_rd_135_ebmaj.wav](keys/loops/chord_holloway_rd_135_ebmaj.wav) |
| 1 | `keys_loop_chord_knowledge_131bpm` | 131 | Gmin | [chord_knowledge_131_gmin.wav](keys/loops/chord_knowledge_131_gmin.wav) |
| 2 | `keys_loop_chord_orwell_131bpm` | 131 | Amin | [chord_orwell_131_amin.wav](keys/loops/chord_orwell_131_amin.wav) |
| 3 | `keys_loop_chords_bp_135bpm` | 135 | Gmin | [chords_bp_135_gmin.wav](keys/loops/chords_bp_135_gmin.wav) |
| 4 | `keys_loop_chords_fluff_132bpm` | 132 | Gmin | [chords_fluff_132_gmin.wav](keys/loops/chords_fluff_132_gmin.wav) |
| 5 | `keys_loop_chords_organism_135bpm` | 135 | Dmin | [chords_organism_135_dmin.wav](keys/loops/chords_organism_135_dmin.wav) |
| 6 | `keys_loop_chords_pantastic_135bpm` | 135 | Dmin | [chords_pantastic_135_dmin.wav](keys/loops/chords_pantastic_135_dmin.wav) |
| 7 | `keys_loop_electric_piano_melody_silky_130bpm` | 130 | D#m | [electric_piano_melody_silky_130_dsm.wav](keys/loops/electric_piano_melody_silky_130_dsm.wav) |
| 8 | `keys_loop_lead_mini_org_135bpm` | 135 | Dmin | [lead_mini_org_135_dmin.wav](keys/loops/lead_mini_org_135_dmin.wav) |
| 9 | `keys_loop_melody_strings_132bpm` | 132 | Cm | [melody_strings_132_cm.wav](keys/loops/melody_strings_132_cm.wav) |
| 10 | `keys_loop_organ_bounce_master_130bpm` | 130 | D#m | [organ_bounce_master_130_dsm.wav](keys/loops/organ_bounce_master_130_dsm.wav) |
| 11 | `keys_loop_piano_chords_master_130bpm` | 130 | D#m | [piano_chords_master_130_dsm.wav](keys/loops/piano_chords_master_130_dsm.wav) |
| 12 | `keys_loop_songstarter_silky_130bpm` | 130 | D#m | [songstarter_silky_130_dsm.wav](keys/loops/songstarter_silky_130_dsm.wav) |

### kick

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `kick_best_hard` |  |  | [best_hard.wav](kick/best_hard.wav) |
| 1 | `kick_bright_flex` |  |  | [bright_flex.wav](kick/bright_flex.wav) |
| 2 | `kick_butter` |  |  | [butter.wav](kick/butter.wav) |
| 3 | `kick_deep_follow` |  |  | [deep_follow.wav](kick/deep_follow.wav) |
| 4 | `kick_drier` |  |  | [drier.wav](kick/drier.wav) |
| 5 | `kick_hittin` |  |  | [hittin.wav](kick/hittin.wav) |
| 6 | `kick_p` |  |  | [p.wav](kick/p.wav) |
| 7 | `kick_punchy` |  |  | [punchy.wav](kick/punchy.wav) |
| 8 | `kick_ringing_gravity` |  |  | [ringing_gravity.wav](kick/ringing_gravity.wav) |
| 9 | `kick_wine` |  |  | [wine.wav](kick/wine.wav) |

### oh

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `oh_long_broken` |  |  | [long_broken.wav](oh/long_broken.wav) |
| 1 | `oh_short` |  |  | [short.wav](oh/short.wav) |
| 2 | `oh_tsunami_tamb` |  |  | [tsunami_tamb.wav](oh/tsunami_tamb.wav) |
| 3 | `oh_white` |  |  | [white.wav](oh/white.wav) |

### perc

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `perc_clicky_follow` |  |  | [clicky_follow.wav](perc/clicky_follow.wav) |
| 1 | `perc_crash_909` |  |  | [crash_909.wav](perc/crash_909.wav) |
| 2 | `perc_crash_best_short` |  |  | [crash_best_short.wav](perc/crash_best_short.wav) |
| 3 | `perc_crash_fast` |  |  | [crash_fast.wav](perc/crash_fast.wav) |
| 4 | `perc_crash_finisher` |  |  | [crash_finisher.wav](perc/crash_finisher.wav) |
| 5 | `perc_crash_instinct` |  |  | [crash_instinct.wav](perc/crash_instinct.wav) |
| 6 | `perc_crash_jet_fuel` |  |  | [crash_jet_fuel.wav](perc/crash_jet_fuel.wav) |
| 7 | `perc_crash_standard` |  |  | [crash_standard.wav](perc/crash_standard.wav) |
| 8 | `perc_djembe_low` |  |  | [djembe_low.wav](perc/djembe_low.wav) |
| 9 | `perc_knock_flex` |  |  | [knock_flex.wav](perc/knock_flex.wav) |
| 10 | `perc_low_thock` |  |  | [low_thock.wav](perc/low_thock.wav) |
| 11 | `perc_shaker_classic` |  |  | [shaker_classic.wav](perc/shaker_classic.wav) |
| 12 | `perc_shaker_fast_roll_flex` |  |  | [shaker_fast_roll_flex.wav](perc/shaker_fast_roll_flex.wav) |

### perc_loop

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `perc_loop_record_player_135bpm` | 135 |  | [record_player_135.wav](perc/loops/record_player_135.wav) |
| 1 | `perc_loop_shaker_swing_135bpm` | 135 |  | [shaker_swing_135.wav](perc/loops/shaker_swing_135.wav) |
| 2 | `perc_loop_shuffler_132bpm` | 132 |  | [shuffler_132.wav](perc/loops/shuffler_132.wav) |

### snare

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `snare_909` |  |  | [909.wav](snare/909.wav) |
| 1 | `snare_breaker` |  |  | [breaker.wav](snare/breaker.wav) |
| 2 | `snare_high_blade` |  |  | [high_blade.wav](snare/high_blade.wav) |
| 3 | `snare_high_tikk` |  |  | [high_tikk.wav](snare/high_tikk.wav) |
| 4 | `snare_jungle` |  |  | [jungle.wav](snare/jungle.wav) |
| 5 | `snare_linn` |  |  | [linn.wav](snare/linn.wav) |
| 6 | `snare_rim_garage` |  |  | [rim_garage.wav](snare/rim_garage.wav) |
| 7 | `snare_rimsnare` |  |  | [rimsnare.wav](snare/rimsnare.wav) |

### tops

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `tops_again_138bpm` | 138 |  | [again_138.wav](tops/again_138.wav) |
| 1 | `tops_alarmed_140bpm` | 140 |  | [alarmed_140.wav](tops/alarmed_140.wav) |
| 2 | `tops_analog_foley_hat_131bpm` | 131 |  | [analog_foley_hat_131.wav](tops/analog_foley_hat_131.wav) |
| 3 | `tops_best_136bpm` | 136 |  | [best_136.wav](tops/best_136.wav) |
| 4 | `tops_broken_intro_134bpm` | 134 |  | [broken_intro_134.wav](tops/broken_intro_134.wav) |
| 5 | `tops_bullett_140bpm` | 140 |  | [bullett_140.wav](tops/bullett_140.wav) |
| 6 | `tops_cambridge_perc_snare_132bpm` | 132 |  | [cambridge_perc_snare_132.wav](tops/cambridge_perc_snare_132.wav) |
| 7 | `tops_dubwise_135bpm` | 135 |  | [dubwise_135.wav](tops/dubwise_135.wav) |
| 8 | `tops_gurleys_radio_130bpm` | 130 |  | [gurleys_radio_130.wav](tops/gurleys_radio_130.wav) |
| 9 | `tops_hats_follow_134bpm` | 134 |  | [hats_follow_134.wav](tops/hats_follow_134.wav) |
| 10 | `tops_right_136bpm` | 136 |  | [right_136.wav](tops/right_136.wav) |
| 11 | `tops_summer_135bpm` | 135 |  | [summer_135.wav](tops/summer_135.wav) |
| 12 | `tops_sunderland_perc_snare_132bpm` | 132 |  | [sunderland_perc_snare_132.wav](tops/sunderland_perc_snare_132.wav) |
| 13 | `tops_survivor_135bpm` | 135 |  | [survivor_135.wav](tops/survivor_135.wav) |
| 14 | `tops_vibez_135bpm` | 135 |  | [vibez_135.wav](tops/vibez_135.wav) |

### vox

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `vox_ah` |  |  | [ah.wav](vox/ah.wav) |
| 1 | `vox_baker_haha_dry` |  |  | [baker_haha_dry.wav](vox/baker_haha_dry.wav) |
| 2 | `vox_gamble_vandel_dry` | 136 |  | [gamble_vandel_dry_136.wav](vox/gamble_vandel_dry_136.wav) |
| 3 | `vox_gamble_what_dry` |  |  | [gamble_what_dry.wav](vox/gamble_what_dry.wav) |
| 4 | `vox_talk_to_me` |  | D#m | [talk_to_me_dsm.wav](vox/talk_to_me_dsm.wav) |

### vox_loop

| Index | Name | BPM | Key | File |
| ---: | --- | ---: | --- | --- |
| 0 | `vox_loop_attack_dry_135bpm` | 135 |  | [attack_dry_135.wav](vox/loops/attack_dry_135.wav) |
| 1 | `vox_loop_attack_more_dry_135bpm` | 135 |  | [attack_more_dry_135.wav](vox/loops/attack_more_dry_135.wav) |
| 2 | `vox_loop_baker_vangogh_dry_136bpm` | 136 |  | [baker_vangogh_dry_136.wav](vox/loops/baker_vangogh_dry_136.wav) |
| 3 | `vox_loop_baker_vangogh_wet_136bpm` | 136 |  | [baker_vangogh_wet_136.wav](vox/loops/baker_vangogh_wet_136.wav) |
| 4 | `vox_loop_beat_hold_back_dry_134bpm` | 134 |  | [beat_hold_back_dry_134.wav](vox/loops/beat_hold_back_dry_134.wav) |
| 5 | `vox_loop_bullet_140bpm` | 140 | E | [bullet_140_e.wav](vox/loops/bullet_140_e.wav) |
| 6 | `vox_loop_chop_everybody_134bpm` | 134 |  | [chop_everybody_134.wav](vox/loops/chop_everybody_134.wav) |
| 7 | `vox_loop_chop_harrow_wet_135bpm` | 135 | D#m | [chop_harrow_wet_135_dsm.wav](vox/loops/chop_harrow_wet_135_dsm.wav) |
| 8 | `vox_loop_chop_killa_illa_140bpm` | 140 |  | [chop_killa_illa_140.wav](vox/loops/chop_killa_illa_140.wav) |
| 9 | `vox_loop_chop_killer_cardio_140bpm` | 140 |  | [chop_killer_cardio_140.wav](vox/loops/chop_killer_cardio_140.wav) |
| 10 | `vox_loop_chop_the_top_one_140bpm` | 140 |  | [chop_the_top_one_140.wav](vox/loops/chop_the_top_one_140.wav) |
| 11 | `vox_loop_criminal_ambience_132bpm` | 132 | Gm | [criminal_ambience_132_gm.wav](vox/loops/criminal_ambience_132_gm.wav) |
| 12 | `vox_loop_criminal_physical_dry_138bpm` | 138 |  | [criminal_physical_dry_138.wav](vox/loops/criminal_physical_dry_138.wav) |
| 13 | `vox_loop_droptop_wet_138bpm` | 138 |  | [droptop_wet_138.wav](vox/loops/droptop_wet_138.wav) |
| 14 | `vox_loop_feel_bridge_stack_dry_142bpm` | 142 | Emin | [feel_bridge_stack_dry_142_emin.wav](vox/loops/feel_bridge_stack_dry_142_emin.wav) |
| 15 | `vox_loop_fx_so_134bpm` | 134 |  | [fx_so_134.wav](vox/loops/fx_so_134.wav) |
| 16 | `vox_loop_gamble_dry_136bpm` | 136 |  | [gamble_dry_136.wav](vox/loops/gamble_dry_136.wav) |
| 17 | `vox_loop_harmony_feel_chorus_double_wet_142bpm` | 142 | Emin | [harmony_feel_chorus_double_wet_142_emin.wav](vox/loops/harmony_feel_chorus_double_wet_142_emin.wav) |
| 18 | `vox_loop_microphone_killa_wet_140bpm` | 140 |  | [microphone_killa_wet_140.wav](vox/loops/microphone_killa_wet_140.wav) |
| 19 | `vox_loop_over_135bpm` | 135 | E | [over_135_e.wav](vox/loops/over_135_e.wav) |
| 20 | `vox_loop_short_i_remember_wet_120bpm` | 120 | D#m | [short_i_remember_wet_120_dsm.wav](vox/loops/short_i_remember_wet_120_dsm.wav) |
| 21 | `vox_loop_take_your_body_higher_alt_wet_135bpm` | 135 | D#m | [take_your_body_higher_alt_wet_135_dsm.wav](vox/loops/take_your_body_higher_alt_wet_135_dsm.wav) |
| 22 | `vox_loop_take_your_body_higher_wet_135bpm` | 135 | D#m | [take_your_body_higher_wet_135_dsm.wav](vox/loops/take_your_body_higher_wet_135_dsm.wav) |
| 23 | `vox_loop_that_look_pitched_wet_130bpm` | 130 |  | [that_look_pitched_wet_130.wav](vox/loops/that_look_pitched_wet_130.wav) |
