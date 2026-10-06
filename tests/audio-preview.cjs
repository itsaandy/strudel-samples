const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('userscripts/strudel-samples.user.js','utf8');
const helpers = source.split('// BEGIN MAP DISCOVERY (standalone helpers tested with Node)')[1].split('// END MAP DISCOVERY')[0];
const audio = source.split('// BEGIN AUDIO PREVIEW')[1].split('// END AUDIO PREVIEW')[0];
const timers = new Map(), sources = [], gains = [], requests = [];
let tick = 0, focused = true, failure = false, delayed;
class AudioContext {
  state = 'suspended'; currentTime = 0; destination = {};
  resume() { this.state = 'running'; return Promise.resolve(); }
  decodeAudioData() { return Promise.resolve({length:48000,numberOfChannels:2,duration:10}); }
  createBufferSource() {
    const s = {connect(){},disconnect(){},start(...args){this.args=args;},stop(){this.stopped=true;this.onended?.();}};
    sources.push(s); return s;
  }
  createGain() {
    const g={values:[],connect(){},disconnect(){}};
    g.gain={setValueAtTime:(...x)=>g.values.push(x),linearRampToValueAtTime:(...x)=>g.values.push(x)};
    gains.push(g);return g;
  }
}
const box = {URL,AbortController,console:{warn(){}},window:{AudioContext},
  setTimeout(fn,ms){const id=++tick;timers.set(id,{fn,ms});return id;},clearTimeout(id){timers.delete(id);},
  fetch:async(url,opts)=>{requests.push({url,signal:opts.signal}); if(delayed) await delayed; return {ok:!failure,status:404,arrayBuffer:async()=>new ArrayBuffer(2)};},
  editor:()=>({hasFocus:focused}),list:{children:[{},{}]},destroyed:false,current:{},items:['kick_a','kick_b'],selected:0,
  soundURLs:new Map([['kick_a','https://test/a.wav'],['kick_b','https://test/b.wav']])};
vm.createContext(box);
vm.runInContext(helpers+audio+';this.api={schedulePreview,stopPreview,previewURL,sampleMaps,status:()=>previewStatus,cache:()=>audioCache.size};',box);
async function flush(){for(let i=0;i<12;i++)await Promise.resolve();}
function fire(){const jobs=[...timers.values()];timers.clear();jobs.forEach(x=>x.fn());}
(async()=>{
 const base='https://example.com/pack/strudel.json';
 assert.equal(box.api.previewURL(['kick.wav','other.wav'],{},base),'https://example.com/pack/kick.wav');
 assert.equal(box.api.previewURL({c3:['a.wav']},{_base:'https://cdn.example.com/sounds/'},base),'https://cdn.example.com/sounds/a.wav');
 assert.equal(box.api.previewURL('a.wav',{_base:'github:itsaandy/strudel-samples/ukg'},base),'https://raw.githubusercontent.com/itsaandy/strudel-samples/ukg/a.wav');
 assert.equal(box.api.previewURL('https://cdn.example.com/a.wav',{},base),'https://cdn.example.com/a.wav');
 assert.equal(box.api.previewURL([],{},base),null);
 assert.equal(box.api.previewURL('javascript:alert(1)',{},base),null);
 assert.deepEqual(Array.from(box.api.sampleMaps("samples('github:a/z');samples('github:a/b')")),['https://raw.githubusercontent.com/a/z/main/strudel.json','https://raw.githubusercontent.com/a/b/main/strudel.json']);
 box.api.schedulePreview();assert.equal(sources.length,0);assert.equal([...timers.values()][0].ms,150);
 box.selected=1;box.api.schedulePreview();assert.equal(timers.size,1);fire();await flush();
 assert.equal(requests.length,1);assert.equal(requests[0].url,'https://test/b.wav');
 assert.equal(sources.length,1);assert.equal(sources[0].args[2],3);assert(gains[0].values.some(v=>v[0]===0.25));
 box.api.stopPreview();assert(sources[0].stopped);assert.equal(box.api.status(),'idle');
 box.api.schedulePreview();fire();await flush();assert.equal(requests.length,1,'decoded buffer reused');
 assert.equal(sources.length,2);box.api.stopPreview();
 // A previous fetch may complete despite abort; it must not play after selection changes.
 let resolve;delayed=new Promise(r=>resolve=r);box.selected=0;box.api.schedulePreview();fire();await flush();
 assert.equal(requests.length,2);box.api.stopPreview();assert(requests[1].signal.aborted);
 resolve();await flush();assert.equal(sources.length,2,'stale network result never plays');delayed=null;
 box.api.schedulePreview();box.api.stopPreview();fire();await flush();assert.equal(requests.length,2,'dismiss cancels debounce');
 failure=true;box.api.schedulePreview();fire();await flush();assert.equal(box.api.status(),'unavailable: kick_a');assert.equal(sources.length,2);
 failure=false;focused=false;box.api.schedulePreview();fire();await flush();assert.equal(sources.length,2,'unfocused editor never plays');
 console.log('Preview checks passed: URL resolution, map order, debounce, gain/length, stop, cache, stale response, errors, focus');
})().catch(error=>{console.error(error);process.exitCode=1;});
