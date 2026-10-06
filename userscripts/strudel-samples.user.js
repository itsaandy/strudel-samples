// ==UserScript==
// @name         Strudel Sample Autocomplete
// @namespace    itsaandy/strudel-samples
// @version      0.3.1
// @description  Complete your GitHub sample names inside s() and sound() strings.
// @match        https://strudel.cc/*
// @run-at       document-idle
// @grant        none
// @sandbox      raw
// ==/UserScript==

(() => {
  'use strict';
  window.strudelSampleAutocomplete?.destroy();
  // Map discovery uses source text only; it never evaluates the user's code.
  const mapCache = new Map();
  let mapSignature = '', sourceText = null, refreshTimer, generation = 0;
  let activeMaps = [];

  // BEGIN MAP DISCOVERY (standalone helpers tested with Node)
  function mapURL(reference) {
    if (reference.startsWith('github:')) {
      const parts = reference.slice(7).split('/');
      if (parts.length < 2 || parts.length > 3 || parts.some(p => !p || !/^[\w.-]+$/.test(p))) return null;
      const [owner, repo, branch = 'main'] = parts;
      return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/strudel.json`;
    }
    try {
      const url = new URL(reference);
      return url.protocol === 'https:' && url.pathname.endsWith('.json') ? url.href : null;
    } catch { return null; }
  }

  function sampleMaps(code) {
    const tokens = [];
    for (let i = 0; i < code.length;) {
      if (/\s/.test(code[i])) { i++; continue; }
      if (code.startsWith('//', i)) { const end = code.indexOf('\n', i); i = end < 0 ? code.length : end; continue; }
      if (code.startsWith('/*', i)) { const end = code.indexOf('*/', i + 2); i = end < 0 ? code.length : end + 2; continue; }
      const quote = code[i];
      if (quote === '"' || quote === "'" || quote === '`') {
        let text = '', complete = false, dynamic = false;
        i++;
        while (i < code.length) {
          if (code[i] === quote) { i++; complete = true; break; }
          if (code[i] === '\\') { dynamic = true; i += 2; continue; }
          if (quote === '`' && code.startsWith('${', i)) dynamic = true;
          text += code[i++];
        }
        tokens.push({ kind: complete && !dynamic ? 'string' : 'other', text });
        continue;
      }
      const word = code.slice(i).match(/^[A-Za-z_$][\w$]*/);
      if (word) { tokens.push({ kind: 'word', text: word[0] }); i += word[0].length; }
      else tokens.push({ kind: 'punct', text: code[i++] });
    }
    const urls = new Set();
    for (let i = 0; i < tokens.length - 3; i++) {
      if (tokens[i].kind !== 'word' || tokens[i].text !== 'samples' || tokens[i-1]?.text === '.') continue;
      if (tokens[i+1].text !== '(' || tokens[i+2].kind !== 'string' || ![')', ','].includes(tokens[i+3].text)) continue;
      const url = mapURL(tokens[i+2].text);
      if (url) urls.add(url);
    }
    return [...urls];
  }
  function previewURL(value, map, manifestURL) {
    // Preview the first variation, or first pitch-zone sample, at original pitch.
    while (value && typeof value === 'object') value = Object.values(value)[0];
    if (typeof value !== 'string') return null;
    let base = map._base || new URL('.', manifestURL).href;
    if (typeof base !== 'string') return null;
    if (base.startsWith('github:')) base = mapURL(base)?.replace(/strudel\.json$/, '');
    if (!base) return null;
    try {
      base = new URL(base, manifestURL).href;
      const url = new URL(value, base.endsWith('/') ? base : base + '/');
      return url.protocol === 'https:' ? url.href : null;
    } catch { return null; }
  }
  // END MAP DISCOVERY

  function discoverMaps() {
    const text = editor()?.state.doc.toString();
    if (text === undefined || text === sourceText) return;
    sourceText = text;
    const urls = sampleMaps(text), signature = JSON.stringify(urls);
    if (signature === mapSignature) return;
    mapSignature = signature;
    activeMaps = urls;
    generation++; // Ignore any responses belonging to the previous source set.
    names = []; soundURLs = new Map(); last = ''; hide();
    clearTimeout(refreshTimer);
    status = urls.length ? 'Loading referenced sample maps…' : 'No literal samples() map references';
    refreshTimer = setTimeout(() => refresh(), 400);
  }

  let names = [], items = [], selected = 0, current = null, last = '', dismissed = '';
  let destroyed = false, status = 'Loading sample names…';
  const controller = new AbortController();
  let soundURLs = new Map();
  const popup = document.createElement('div');
  popup.id = 'strudel-sample-autocomplete';
  popup.className = 'cm-tooltip cm-tooltip-autocomplete cm-tooltip-below';
  popup.style.cssText = 'position:fixed;z-index:2147483647;display:none;';
  const list = document.createElement('ul');
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Sample suggestions');
  popup.append(list);
  // Low-specificity fallbacks also work when native autocomplete is disabled.
  // CodeMirror's theme selectors override these whenever available.
  const style = document.createElement('style');
  style.textContent = `
    :where(#strudel-sample-autocomplete) {
      background: #333338; color: inherit; border: 0; border-radius: 0;
      box-shadow: none; padding: 0; font: inherit;
    }
    :where(#strudel-sample-autocomplete > ul) {
      font-family: inherit; white-space: nowrap; overflow: hidden auto;
      max-height: 10em; min-width: 250px; max-width: min(700px, 95vw);
      list-style: none; margin: 0; padding: 0;
    }
    :where(#strudel-sample-autocomplete > ul > li) {
      padding: 1px 3px; line-height: 1.2; cursor: pointer;
    }
    /* Selection must win over theme rules even when native completion is disabled. */
    #strudel-sample-autocomplete > ul > li[aria-selected="true"] {
      background: #347; color: white;
      box-shadow: inset 2px 0 0 #adc6ff;
    }
    #strudel-sample-autocomplete > ul > li[aria-selected="true"] .cm-completionIcon {
      opacity: 1;
    }
    :where(#strudel-sample-autocomplete .cm-completionMatchedText) {
      text-decoration: underline;
    }
    :where(#strudel-sample-autocomplete .cm-completionIcon) {
      font-size: 90%; width: .8em; display: inline-block;
      text-align: center; padding-right: .6em; opacity: .6;
      box-sizing: content-box;
    }
  `;
  document.head.append(style);

  // BEGIN AUDIO PREVIEW
  const PREVIEW_DELAY_MS = 150, PREVIEW_SECONDS = 3, PREVIEW_GAIN = 0.25;
  const BUFFER_LIMIT = 32 * 1024 * 1024;
  const audioCache = new Map();
  let audioBytes = 0, audioContext, previewTimer, previewRequest, previewSource;
  let previewGeneration = 0, previewStatus = 'idle';

  function stopPreview() {
    previewGeneration++;
    clearTimeout(previewTimer);
    previewRequest?.abort(); previewRequest = null;
    if (previewSource) {
      const source = previewSource; previewSource = null;
      try { source.stop(); } catch { /* already ended */ }
      source.disconnect();
    }
    previewStatus = 'idle';
  }

  function schedulePreview() {
    stopPreview();
    const name = items[selected], url = soundURLs.get(name);
    if (!current || !url || destroyed) return;
    const request = previewGeneration;
    // Called directly from a trusted key/click so autoplay can be unlocked.
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const ready = audioContext.resume();
      ready.catch(() => {}); // handled below after the debounce
      previewStatus = 'pending: ' + name;
      previewTimer = setTimeout(async () => {
        const valid = () => request === previewGeneration && !destroyed &&
          current && items[selected] === name && editor()?.hasFocus;
        try {
          await ready;
          if (!valid()) return;
          if (audioContext.state !== 'running') throw new Error('Audio is suspended; press an arrow key again');
          previewStatus = 'loading: ' + name;
          let buffer = audioCache.get(url);
          if (buffer) { audioCache.delete(url); audioCache.set(url, buffer); }
          else {
            const abort = new AbortController(); previewRequest = abort;
            const response = await fetch(url, { signal: abort.signal });
            if (!response.ok) throw new Error('Audio HTTP ' + response.status);
            const data = await response.arrayBuffer();
            if (!valid()) return;
            buffer = await audioContext.decodeAudioData(data);
            if (!valid()) return;
            const bytes = buffer.length * buffer.numberOfChannels * 4;
            while (audioCache.size && (audioBytes + bytes > BUFFER_LIMIT || audioCache.size >= 24)) {
              const oldest = audioCache.keys().next().value, old = audioCache.get(oldest);
              audioBytes -= old.length * old.numberOfChannels * 4; audioCache.delete(oldest);
            }
            if (bytes <= BUFFER_LIMIT) { audioCache.set(url, buffer); audioBytes += bytes; }
          }
          if (!valid()) return;
          previewRequest = null;
          const source = audioContext.createBufferSource(), gain = audioContext.createGain();
          const now = audioContext.currentTime, duration = Math.min(buffer.duration, PREVIEW_SECONDS);
          const fade = Math.min(0.015, duration / 4);
          source.buffer = buffer;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(PREVIEW_GAIN, now + Math.min(0.002, fade));
          gain.gain.setValueAtTime(PREVIEW_GAIN, now + duration - fade);
          gain.gain.linearRampToValueAtTime(0, now + duration);
          source.connect(gain); gain.connect(audioContext.destination);
          previewSource = source;
          source.onended = () => {
            source.disconnect(); gain.disconnect();
            if (previewSource === source) { previewSource = null; previewStatus = 'idle'; }
          };
          source.start(now, 0, duration);
          previewStatus = 'playing: ' + name;
        } catch (error) {
          if (!valid() || error.name === 'AbortError') return;
          previewStatus = 'unavailable: ' + name;
          const row = list.children[selected];
          if (row) row.title = 'Preview unavailable: ' + error.message;
          console.warn('[Sample autocomplete preview]', name, error);
        }
      }, PREVIEW_DELAY_MS);
    } catch (error) {
      previewStatus = 'unavailable: ' + name;
      console.warn('[Sample autocomplete preview]', error);
    }
  }
  // END AUDIO PREVIEW

  function editor() {
    const view = window.strudelMirror?.editor;
    if (view?.state && view?.dispatch && view?.coordsAtPos) return view;
    return document.querySelector('.cm-content')?.cmView?.view;
  }

  // Scan comments and strings so ordinary text, note(), and URLs do not trigger.
  // Template interpolation and escaped strings are deliberately not completed.
  function context(view) {
    const selection = view.state.selection;
    if (selection.ranges.length !== 1 || !selection.main.empty) return null;
    const pos = selection.main.head, text = view.state.doc.toString();
    let mode = 'code', quote = '', start = -1;
    for (let i = 0; i < pos; i++) {
      const c = text[i], next = text[i + 1];
      if (mode === 'line') { if (c === '\n') mode = 'code'; continue; }
      if (mode === 'block') { if (c === '*' && next === '/') { mode = 'code'; i++; } continue; }
      if (mode === 'string') {
        if (c === '\\') { i++; continue; }
        if (c === quote) mode = 'code';
        continue;
      }
      if (c === '/' && next === '/') { mode = 'line'; i++; continue; }
      if (c === '/' && next === '*') { mode = 'block'; i++; continue; }
      if (c === '"' || c === "'" || c === '`') { mode = 'string'; quote = c; start = i; }
    }
    if (mode !== 'string') return null;
    if (!/(?:^|[^\w$])(?:s|sound)\s*\(\s*$/.test(text.slice(0, start))) return null;
    const inside = text.slice(start + 1, pos);
    if (inside.includes('\\') || inside.includes('${')) return null;
    const token = inside.match(/(?:^|[\s[\]<>|,{}])([a-zA-Z_][\w-]*|)$/);
    if (!token) return null;
    const prefix = token[1];
    const suffix = text.slice(pos).match(/^[\w-]*/)[0];
    return { view, from: pos - prefix.length, to: pos + suffix.length, pos, prefix,
      stamp: text + '\u0000' + pos };
  }

  function hide() { stopPreview(); popup.style.display = 'none'; current = null; items = []; }
  function paint() {
    list.replaceChildren();
    items.forEach((name, i) => {
      const row = document.createElement('li');
      row.id = 'strudel-sample-option-' + i;
      row.setAttribute('role', 'option');
      // Native themes may match attribute presence, so omit it on other rows.
      if (i === selected) row.setAttribute('aria-selected', 'true');
      const icon = document.createElement('div');
      icon.className = 'cm-completionIcon cm-completionIcon-sound';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = i === selected ? '▶' : '♪';
      icon.title = 'Preview first sample';
      icon.style.cursor = 'pointer';
      icon.addEventListener('mousedown', e => {
        e.preventDefault(); e.stopPropagation(); selected = i; paint(); schedulePreview();
      });
      row.title = '↑/↓ to preview · click ♪ to replay · Tab/Enter to insert';
      const label = document.createElement('span');
      label.className = 'cm-completionLabel';
      const fragment = current?.prefix || '';
      const match = name.toLowerCase().indexOf(fragment.toLowerCase());
      if (fragment && match !== -1) {
        const highlight = document.createElement('span');
        highlight.className = 'cm-completionMatchedText';
        highlight.textContent = name.slice(match, match + fragment.length);
        label.append(name.slice(0, match), highlight, name.slice(match + fragment.length));
      } else label.textContent = name;
      row.append(icon, label);
      row.addEventListener('mousedown', e => { e.preventDefault(); accept(i); });
      list.append(row);
    });
    list.children[selected]?.scrollIntoView({ block: 'nearest' });
  }

  function show(explicit = false) {
    const view = editor();
    if (!view?.hasFocus) return hide();
    const ctx = context(view);
    if (!ctx || (!explicit && (!ctx.prefix || ctx.stamp === dismissed))) return hide();
    if (!explicit && ctx.stamp === last) return;
    last = ctx.stamp;
    const fragment = ctx.prefix.toLowerCase();
    items = names.filter(n => n.toLowerCase().includes(fragment))
      .sort((a,b) => Number(!a.toLowerCase().startsWith(fragment)) -
        Number(!b.toLowerCase().startsWith(fragment)) || a.localeCompare(b)).slice(0, 40);
    if (!items.length) return hide();
    stopPreview();
    current = ctx;
    selected = 0;
    const coords = view.coordsAtPos(ctx.pos);
    if (!coords) return hide();
    // Mount inside the editor to inherit its font and scoped theme rules.
    if (popup.parentElement !== view.dom) view.dom.append(popup);
    popup.style.display = 'block';
    paint();
    const box = popup.getBoundingClientRect();
    popup.style.left = Math.max(4, Math.min(coords.left, innerWidth - box.width - 4)) + 'px';
    const below = coords.bottom;
    popup.style.top = Math.max(4, below + box.height <= innerHeight
      ? below : coords.top - box.height) + 'px';
  }

  function accept(index) {
    const fresh = current && context(current.view);
    if (!fresh || fresh.stamp !== current.stamp) return hide();
    const name = items[index];
    if (!name) return;
    const view = current.view;
    view.dispatch({ changes: { from: fresh.from, to: fresh.to, insert: name },
      selection: { anchor: fresh.from + name.length }, userEvent: 'input.complete' });
    dismissed = context(view)?.stamp || '';
    last = '';
    hide();
    view.focus();
  }

  function onKey(event) {
    const view = editor();
    if (!view?.hasFocus || event.isComposing) return;
    if (event.ctrlKey && event.code === 'Space') {
      event.preventDefault(); event.stopImmediatePropagation(); last = ''; dismissed = ''; show(true); schedulePreview(); return;
    }
    if (!current || event.metaKey || event.ctrlKey || event.altKey) return;
    if (!['ArrowDown', 'ArrowUp', 'Tab', 'Enter', 'Escape'].includes(event.key)) return;
    // Shift+Enter belongs to Strudel playback.
    if (event.shiftKey) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (event.key === 'Escape') { dismissed = current.stamp; hide(); }
    else if (event.key === 'Tab' || event.key === 'Enter') accept(selected);
    else { selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; paint(); schedulePreview(); }
  }
  window.addEventListener('keydown', onKey, true);
  function onPointer(event) {
    if (!popup.contains(event.target)) { dismissed = current?.stamp || ''; hide(); last = ''; }
  }
  window.addEventListener('mousedown', onPointer, true);
  function onBlur() { last = ''; hide(); }
  function onVisibility() { if (document.hidden) onBlur(); }
  window.addEventListener('blur', onBlur);
  document.addEventListener('visibilitychange', onVisibility);
  const timer = setInterval(() => {
    try { discoverMaps(); if (!editor()?.hasFocus) { last = ''; hide(); } else show(); }
    catch (error) { hide(); console.warn('[Sample autocomplete]', error); }
  }, 120);

  async function refresh(force = false) {
    const request = ++generation;
    const urls = [...activeMaps];
    const results = await Promise.allSettled(urls.map(async url => {
      const cached = mapCache.get(url);
      if (!force && cached && Date.now() - cached.time < 60000) return cached.entries;
      const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error(url + ': HTTP ' + response.status);
      const map = await response.json();
      if (!map || Array.isArray(map) || typeof map !== 'object') throw new Error('Invalid sample map: ' + url);
      const entries = Object.keys(map).filter(key => !key.startsWith('_')).map(name => [name, previewURL(map[name], map, url)]);
      mapCache.set(url, { time: Date.now(), entries });
      return entries;
    }));
    if (destroyed || request !== generation) return;
    stopPreview();
    soundURLs = new Map(results.filter(r => r.status === 'fulfilled').flatMap(r => r.value));
    names = [...soundURLs.keys()].sort();
    const errors = results.filter(r => r.status === 'rejected');
    status = names.length + ' names from ' + urls.length + ' referenced map(s)' +
      (errors.length ? '; ' + errors.length + ' map(s) failed' : '');
    for (const error of errors) console.warn('[Sample autocomplete]', error.reason);
    console.info('[Sample autocomplete]', status);
    last = '';
  }
  window.strudelSampleAutocomplete = {
    version: '0.3.1', get previewStatus() { return previewStatus; },
    refresh: () => refresh(true), get status() { return status; },
    destroy() { destroyed = true; stopPreview();
      audioCache.clear(); audioBytes = 0;
      if (audioContext) audioContext.close().catch(() => {});
      controller.abort(); clearInterval(timer); clearTimeout(refreshTimer);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('mousedown', onPointer, true); popup.remove(); style.remove(); }
  };
  discoverMaps();
})();

