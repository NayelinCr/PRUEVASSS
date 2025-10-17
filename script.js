<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Actividad · Portafolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    :root{
      --bg:#fbf8ff;
      --primary:#7c6cc7;
      --muted:#655b72;
      --card:#fff;
    }
    *{box-sizing:border-box}
    body{font-family:'Poppins',sans-serif;margin:0;background:var(--bg);color:#2b2030;padding:1rem}
    header{background:linear-gradient(180deg,var(--primary),#b39df8);color:white;padding:1rem;border-radius:10px}
    header h1{margin:0;font-family:'Playfair Display',serif}
    .container{max-width:980px;margin:1.2rem auto;padding:0 1rem}
    .panel{background:var(--card);padding:1rem;border-radius:12px;box-shadow:0 10px 30px rgba(28,18,44,0.06)}
    label{display:block;margin-top:.6rem;font-weight:600;color:var(--muted)}
    input[type="text"], input[type="url"], textarea{width:100%;padding:.6rem;border-radius:8px;border:1px solid #eee;margin-top:.4rem;font-size:.95rem}
    .row{display:flex;gap:.6rem;margin-top:.6rem;flex-wrap:wrap}
    .btn{background:linear-gradient(180deg,var(--primary),#b39df8);color:white;padding:.55rem .9rem;border-radius:10px;text-decoration:none;border:none;cursor:pointer}
    .btn.ghost{background:transparent;border:1px solid rgba(124,108,199,0.12);color:var(--primary)}
    .preview{margin-top:.9rem;border-radius:10px;padding:.6rem;border:1px dashed #efe6ff;background:#fbf9ff}
    .meta{color:var(--muted);font-size:.92rem}
    .link-list{margin-top:.6rem;display:flex;gap:.4rem;flex-wrap:wrap}
    .chip{background:#f1ecff;padding:.33rem .6rem;border-radius:8px;font-size:.88rem;color:var(--muted)}
    .back{display:inline-block;margin-top:1rem;color:var(--primary);text-decoration:none}
    .small{font-size:.9rem;color:var(--muted);margin-top:.5rem}
  </style>
</head>
<body>
  <header>
    <h1 id="titulo">Actividad</h1>
  </header>

  <main class="container">
    <div class="panel">
      <div class="meta" id="meta">Cargando...</div>

      <label for="title">Título (puedes editar)</label>
      <input id="title" placeholder="Título de la actividad">

      <label for="desc">Descripción breve</label>
      <textarea id="desc" rows="3" placeholder="Ingresa la descripción de la actividad"></textarea>

      <label for="file">Subir archivo (imagen / pdf / txt) — se guarda en el navegador</label>
      <input id="file" type="file" accept="image/*,.pdf,text/*">

      <div class="row">
        <button class="btn" id="saveFileBtn">Guardar archivo</button>
        <button class="btn ghost" id="removeFileBtn">Eliminar evidencia</button>
        <button class="btn ghost" id="saveMetaBtn">Guardar título y descripción</button>
      </div>

      <div id="previewContainer" class="preview" style="display:none">
        <strong>Previsualización:</strong>
        <div id="previewArea" style="margin-top:.6rem"></div>
      </div>

      <hr style="margin:1rem 0">

      <label for="linkInput">Agregar enlace (ej. Drive, GitHub)</label>
      <input id="linkInput" placeholder="https://drive.google.com/...">
      <div class="row" style="margin-top:.5rem">
        <button class="btn" id="addLinkBtn">Agregar enlace</button>
      </div>

      <div class="small">Enlaces guardados:</div>
      <div id="links" class="link-list" aria-live="polite"></div>

      <a id="back" class="back" href="unidad1.html">← Volver a la unidad</a>
    </div>
  </main>

  <script>
    // --- utilidad: leer query param "id" ---
    function qs(name){ const url = new URL(location.href); return url.searchParams.get(name); }
    const id = qs('id') || '00';

    // Elementos
    const tituloEl = document.getElementById('titulo');
    const metaEl = document.getElementById('meta');
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('desc');
    const fileInput = document.getElementById('file');
    const saveFileBtn = document.getElementById('saveFileBtn');
    const previewContainer = document.getElementById('previewContainer');
    const previewArea = document.getElementById('previewArea');
    const linksEl = document.getElementById('links');
    const linkInput = document.getElementById('linkInput');
    const addLinkBtn = document.getElementById('addLinkBtn');
    const saveMetaBtn = document.getElementById('saveMetaBtn');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const backLink = document.getElementById('back');

    // Key names in localStorage
    const keyMeta = `actividad:${id}:meta`;     // stores JSON {title,desc,date}
    const keyFile = `actividad:${id}:file`;     // stores {name,type,dataURL}
    const keyLinks = `actividad:${id}:links`;   // stores array of link strings

    // Initialize
    function formatTitle(idVal){
      if(idVal==='new') return 'Actividad nueva';
      return `Actividad ${idVal}`;
    }
    tituloEl.textContent = formatTitle(id);
    metaEl.textContent = `ID = ${id} · Guardado local`;

    // Load meta if exists
    function loadMeta(){
      const raw = localStorage.getItem(keyMeta);
      if(raw){
        try{
          const m = JSON.parse(raw);
          titleInput.value = m.title || '';
          descInput.value = m.desc || '';
        }catch(e){ /* ignore */ }
      } else {
        // defaults
        titleInput.value = formatTitle(id);
        descInput.value = '';
      }
    }

    // Load file preview
    function loadFilePreview(){
      const raw = localStorage.getItem(keyFile);
      if(!raw){ previewContainer.style.display='none'; previewArea.innerHTML=''; return; }
      try{
        const f = JSON.parse(raw); // {name,type,data}
        previewContainer.style.display='block';
        previewArea.innerHTML = `<div style="font-size:.95rem;color:#554b61;margin-bottom:.35rem"><strong>${escapeHtml(f.name)}</strong> · ${escapeHtml(f.type)}</div>`;
        if(f.type.startsWith('image/')){
          const img = document.createElement('img');
          img.src = f.data;
          img.style.maxWidth='100%';
          img.style.borderRadius='8px';
          previewArea.appendChild(img);
        } else if(f.type === 'application/pdf'){
          // embed pdf
          const iframe = document.createElement('iframe');
          iframe.src = f.data;
          iframe.style.width='100%';
          iframe.style.height='520px';
          iframe.style.border='none';
          previewArea.appendChild(iframe);
        } else {
          // show text if small
          if(f.type.startsWith('text/')){
            const pre = document.createElement('pre');
            pre.style.whiteSpace='pre-wrap';
            pre.style.maxHeight='360px';
            pre.style.overflow='auto';
            pre.style.background='#fff';
            pre.style.padding='.6rem';
            pre.style.borderRadius='8px';
            pre.textContent = f.dataText || '(no preview)';
            previewArea.appendChild(pre);
          } else {
            const link = document.createElement('a');
            link.href = f.data;
            link.target = '_blank';
            link.textContent = 'Abrir archivo';
            previewArea.appendChild(link);
          }
        }
      }catch(e){ previewContainer.style.display='none'; previewArea.innerHTML=''; }
    }

    // Load links
    function renderLinks(){
      linksEl.innerHTML = '';
      const raw = localStorage.getItem(keyLinks);
      if(!raw) return;
      try{
        const arr = JSON.parse(raw);
        arr.forEach((u,idx)=>{
          const a = document.createElement('a');
          a.href = u;
          a.target = '_blank';
          a.className = 'chip';
          a.textContent = `Enlace ${idx+1}`;
          const btnRem = document.createElement('button');
          btnRem.textContent = 'x';
          btnRem.style.marginLeft='6px';
          btnRem.onclick = (ev=>{
            ev.preventDefault();
            arr.splice(idx,1);
            localStorage.setItem(keyLinks, JSON.stringify(arr));
            renderLinks();
          });
          const wrapper = document.createElement('span');
          wrapper.style.display='inline-flex';
          wrapper.style.alignItems='center';
          wrapper.style.gap='.4rem';
          wrapper.appendChild(a);
          wrapper.appendChild(btnRem);
          linksEl.appendChild(wrapper);
        });
      }catch(e){}
    }

    // Helpers
    function escapeHtml(s){ return String(s).replaceAll('<','&lt;').replaceAll('>','&gt;'); }

    // Save meta
    saveMetaBtn.addEventListener('click', ()=>{
      const meta = { title: titleInput.value.trim(), desc: descInput.value.trim(), savedAt: (new Date()).toISOString() };
      localStorage.setItem(keyMeta, JSON.stringify(meta));
      alert('Título y descripción guardados localmente.');
    });

    // Add link
    addLinkBtn.addEventListener('click', ()=>{
      const url = linkInput.value.trim();
      if(!url){ alert('Ingresa un enlace válido.'); return; }
      let arr = [];
      try{ arr = JSON.parse(localStorage.getItem(keyLinks) || '[]'); }catch(e){}
      arr.push(url);
      localStorage.setItem(keyLinks, JSON.stringify(arr));
      linkInput.value = '';
      renderLinks();
    });

    // Save file: read as DataURL (images, pdf) or text
    saveFileBtn.addEventListener('click', ()=>{
      const f = fileInput.files && fileInput.files[0];
      if(!f){ alert('Selecciona un archivo primero.'); return; }
      const reader = new FileReader();
      reader.onload = function(e){
        const result = e.target.result;
        const payload = { name: f.name, type: f.type, data: result };
        // if text, also store dataText
        if(f.type.startsWith('text/')){
          payload.dataText = result;
        }
        localStorage.setItem(keyFile, JSON.stringify(payload));
        loadFilePreview();
        alert('Archivo guardado en tu navegador (local).');
      };
      // prefer text for text, else dataURL
      if(f.type.startsWith('text/')){
        reader.readAsText(f);
      } else {
        reader.readAsDataURL(f);
      }
    });

    removeFileBtn.addEventListener('click', ()=>{
      if(confirm('Eliminar evidencia guardada para esta actividad?')) {
        localStorage.removeItem(keyFile);
        loadFilePreview();
      }
    });

    // init load
    loadMeta();
    loadFilePreview();
    renderLinks();

    // If id is 'new' generate a random id and redirect
    if(id === 'new'){
      const newId = String(Math.floor(Math.random()*900+100)); // 100..999
      // save current default meta
      localStorage.setItem(`actividad:${newId}:meta`, JSON.stringify({ title: `Actividad ${newId}`, desc: '' }));
      // redirect to new id
      location.replace(`actividad.html?id=${newId}`);
    }

    // Small: set back link to unidad1 or unidad2 depending where it came from
    (function setBack(){
      const ref = document.referrer;
      if(ref && ref.includes('unidad2.html')) backLink.href = 'unidad2.html';
      else backLink.href = 'unidad1.html';
    })();
  </script>
</body>
</html>
