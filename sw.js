const C='bc-v3',A=['./','./index.html','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
 const fresh=r.mode==='navigate'||u.pathname.endsWith('/config.json')||u.pathname.endsWith('/index.html');
 if(fresh){e.respondWith(fetch(u.href,{cache:'no-cache'}).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(r,k))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html')||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(r,k))}return x}).catch(()=>m);return m||n}))});
