(() => {
  const $ = id => document.getElementById(id);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function setup({kind, initial, render, count, logId, resultId}) {
    let data = [...initial], logs = [], sequence = 0, highlighted = null;
    const draw = () => { render(data, highlighted); count.textContent = `${data.length} ${kind === 'array' ? 'elemen' : kind === 'list' ? 'node' : 'item'}`; };
    const result = (message, ok=true) => { $(resultId).innerHTML = `<span class="result-icon">${ok ? '↳' : '!'}</span><span>${escapeHtml(message)}</span>`; };
    const log = (title, detail) => {
      logs.unshift({title,detail}); sequence++;
      $(logId).innerHTML = logs.length ? logs.map((x,i)=>`<div class="log-entry"><span class="log-number">${String(logs.length-i).padStart(2,'0')}</span><span><b>${escapeHtml(x.title)}</b><br>${escapeHtml(x.detail)}</span></div>`).join('') : '<div class="empty-log">Belum ada operasi.</div>';
    };
    const reset = () => { data=[...initial]; highlighted=null; logs=[]; sequence=0; draw(); $(logId).innerHTML='<div class="empty-log">Data dikembalikan ke kondisi awal.</div>'; result('Struktur data berhasil di-reset.'); };
    draw();
    return {get data(){return data},set data(v){data=v;draw()},draw,log,result,reset,set highlighted(v){highlighted=v;draw()}};
  }

  if ($('arrayView')) {
    const app=setup({kind:'array',initial:['Apel','Jeruk','Mangga','Anggur','Pisang'],count:$('arrayCount'),logId:'arrayLog',resultId:'arrayResult',
      render:(data,selected)=>{$('arrayIndexes').innerHTML=data.map((_,i)=>`<div class="index-cell">index ${i}</div>`).join('');$('arrayView').innerHTML=data.map((v,i)=>`<div class="array-cell ${selected===i?'selected':''}">${escapeHtml(v)}</div>`).join('') || '<div class="empty-log">Array kosong — tambahkan elemen.</div>';}});
    const value=()=> $('arrayValue').value.trim();
    const add=()=>{const v=value();if(!v)return app.result('Masukkan nilai terlebih dahulu.',false);if(app.data.length>=12)return app.result('Demo dibatasi hingga 12 elemen.',false);app.data=[...app.data,v];$('arrayValue').value='';app.log('Push / tambah elemen',`Nilai "${v}" ditambahkan pada indeks ${app.data.length-1}.`);app.result(`"${v}" ditambahkan pada indeks ${app.data.length-1}.`);};
    $('arrayAdd').onclick=add;$('arrayValue').addEventListener('keydown',e=>{if(e.key==='Enter')add();});
    $('arrayGet').onclick=()=>{const raw=$('arrayIndex').value;if(raw==='')return app.result('Masukkan indeks yang ingin diakses.',false);const i=Number(raw);if(!Number.isInteger(i)||i<0||i>=app.data.length){app.highlighted=null;app.draw();app.result(`Indeks ${raw} di luar rentang array.`,false);return;}app.highlighted=i;app.log('Akses indeks',`array[${i}] menghasilkan "${app.data[i]}".`);app.result(`array[${i}] = "${app.data[i]}". Akses indeks array dilakukan langsung.`);};
    $('arrayRemove').onclick=()=>{if(!app.data.length)return app.result('Array sudah kosong.',false);const i=app.data.length-1,v=app.data[i];app.data=app.data.slice(0,-1);app.highlighted=null;app.log('Hapus elemen terakhir',`"${v}" dihapus dari indeks ${i}.`);app.result(`"${v}" dihapus dari indeks ${i}.`);};
    $('arrayReset').onclick=()=>app.reset();$('arrayClearLog').onclick=()=>{$('arrayLog').innerHTML='<div class="empty-log">Log dibersihkan.</div>';};
  }

  if ($('listView')) {
    const app=setup({kind:'list',initial:['Node A','Node B','Node C','Node D'],count:$('listCount'),logId:'listLog',resultId:'listResult',
      render:(data,selected)=>{$('listView').innerHTML=data.map((v,i)=>`<div class="node-wrap"><div class="node ${selected===i?'new':''}"><div class="node-head">NODE ${i}</div><div class="node-data">${escapeHtml(v)}</div></div><span class="arrow">→</span></div>`).join('')+'<div class="null-node">NULL</div>';if(!data.length)$('listView').innerHTML='<div class="empty-log">Head → NULL (list kosong)</div>'; }});
    const value=()=> $('listValue').value.trim();
    const insert=(front)=>{const v=value();if(!v)return app.result('Masukkan nilai node terlebih dahulu.',false);if(app.data.length>=10)return app.result('Demo dibatasi hingga 10 node.',false);app.data=front?[v,...app.data]:[...app.data,v];$('listValue').value='';app.highlighted=front?0:app.data.length-1;app.log(front?'Insert di head':'Insert di tail',`Node "${v}" disambungkan ${front?'sebelum head lama':'setelah node terakhir'}; link diperbarui.`);app.result(`Node "${v}" ditambahkan ${front?'di awal':'di akhir'} linked list.`);};
    $('listAppend').onclick=()=>insert(false);$('listPrepend').onclick=()=>insert(true);$('listValue').addEventListener('keydown',e=>{if(e.key==='Enter')insert(false);});
    $('listDelete').onclick=()=>{const raw=$('listIndex').value;if(raw==='')return app.result('Masukkan indeks node yang akan dihapus.',false);const i=Number(raw);if(!Number.isInteger(i)||i<0||i>=app.data.length)return app.result(`Indeks ${raw} tidak ditemukan.`,false);const [v]=app.data.splice(i,1);app.data=[...app.data];app.highlighted=null;app.log('Hapus node',`Node "${v}" pada posisi ${i} dilepas; koneksi tetangga disambungkan kembali.`);app.result(`Node "${v}" dihapus dari posisi ${i}.`);};
    $('listReset').onclick=()=>app.reset();$('listClearLog').onclick=()=>{$('listLog').innerHTML='<div class="empty-log">Log dibersihkan.</div>';};
  }

  if ($('stackView')) {
    const app=setup({kind:'stack',initial:['Piring 1','Piring 2','Piring 3'],count:$('stackCount'),logId:'stackLog',resultId:'stackResult',
      render:(data)=>{$('stackView').innerHTML=data.map((v,i)=>`<div class="stack-item ${i===data.length-1?'top':''}">${escapeHtml(v)}${i===data.length-1?'　← TOP':''}</div>`).join('')||'<div class="empty-log" style="text-align:center;padding:24px">Stack kosong</div>'; }});
    const value=()=> $('stackValue').value.trim();
    $('stackPush').onclick=()=>{const v=value();if(!v)return app.result('Masukkan nilai yang akan di-push.',false);if(app.data.length>=10)return app.result('Demo dibatasi hingga 10 item.',false);app.data=[...app.data,v];$('stackValue').value='';app.log('Push',`"${v}" ditambahkan ke puncak stack (TOP).`);app.result(`"${v}" masuk ke TOP. Elemen ini akan menjadi yang pertama keluar.`);};
    $('stackValue').addEventListener('keydown',e=>{if(e.key==='Enter')$('stackPush').click();});
    $('stackPop').onclick=()=>{if(!app.data.length)return app.result('Stack kosong — tidak ada item untuk di-pop.',false);const v=app.data[app.data.length-1];app.data=app.data.slice(0,-1);app.log('Pop',`"${v}" dikeluarkan dari TOP stack.`);app.result(`"${v}" dikeluarkan. Prinsip LIFO: item terakhir masuk, pertama keluar.`);};
    $('stackPeek').onclick=()=>{if(!app.data.length)return app.result('Stack kosong — tidak ada TOP.',false);const v=app.data[app.data.length-1];app.log('Peek',`TOP saat ini adalah "${v}". Tidak ada item yang dihapus.`);app.result(`TOP = "${v}". Peek hanya melihat item teratas, tidak menghapusnya.`);};
    $('stackReset').onclick=()=>app.reset();$('stackClearLog').onclick=()=>{$('stackLog').innerHTML='<div class="empty-log">Log dibersihkan.</div>';};
  }
})();