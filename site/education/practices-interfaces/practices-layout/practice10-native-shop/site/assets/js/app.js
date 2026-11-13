
fetch('assets/data/products.json').then(r=>r.json()).then(start).catch(()=>{
  const s=document.querySelector('#status');if(s){s.textContent='Запустите проект через локальный сервер.';s.classList.add('is-visible');}
});
function start(products){
  const $=s=>document.querySelector(s), all=s=>[...document.querySelectorAll(s)];
  const key='cart-v1', money=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽', find=id=>products.find(p=>p.id===Number(id));
  let cart;try{cart=new Map(JSON.parse(localStorage.getItem(key)||'[]'));}catch{cart=new Map();}
  function say(t){const s=$('#status');if(s){s.textContent=t;s.classList.add('is-visible');setTimeout(()=>s.classList.remove('is-visible'),3000);}}
  function card(p,mode='catalog',qty=1){
    const el=$('#cardTemplate').content.firstElementChild.cloneNode(true), article=el.firstElementChild;
    el.className='slot'+(mode==='mini'?' slot--compact':'');
    const img=el.querySelector('img'),link=el.querySelector('a');img.src=p.image;img.alt=p.name;link.href='product.html?id='+p.id;link.textContent=p.name;
    el.querySelector('.card__price').textContent=money(p.price);
    const buy=el.querySelector('[data-add]'), preview=el.querySelector('[data-quick]');buy.dataset.add=p.id;preview.dataset.quick=p.id;
    if(mode==='detail'){article.classList.add('card--detail');preview.remove();}
    if(mode==='cart'||mode==='mini'){
      buy.remove();preview.remove();const box=document.createElement('div');box.className='quantity';
      box.innerHTML=mode==='cart'?`<button data-qty="-1" data-id="${p.id}" aria-label="Уменьшить">−</button><output>${qty}</output><button data-qty="1" data-id="${p.id}" aria-label="Увеличить">+</button><button class="remove-item" data-remove="${p.id}">Удалить</button>`:`${qty} × ${money(p.price)}`;
      article.append(box);
    }
    return el;
  }
  function renderCart(){
    const rows=[...cart].map(([id,qty])=>({p:find(id),qty})).filter(x=>x.p), sum=rows.reduce((n,x)=>n+x.p.price*x.qty,0), box=$('[data-cart-items]');
    if(box){box.replaceChildren(...rows.map(x=>card(x.p,'cart',x.qty)));$('[data-empty-cart]').hidden=!!rows.length;$('[data-cart-subtotal]').textContent=money(sum);$('[data-cart-total]').textContent=money(sum);}
    const mini=$('[data-mini-items]');if(mini)mini.replaceChildren(...rows.map(x=>card(x.p,'mini',x.qty)));
    if($('[data-mini-total]'))$('[data-mini-total]').textContent=money(sum);
  }
  function sync(){all('[data-cart-count]').forEach(n=>n.textContent=[...cart.values()].reduce((a,b)=>a+b,0));try{localStorage.setItem(key,JSON.stringify([...cart]));}catch{say('Не удалось сохранить корзину.');}renderCart();}
  function add(id){if(!find(id))return;id=String(id);cart.set(id,(cart.get(id)||0)+1);sync();say('Товар добавлен в корзину');}
  function quick(id){
    const p=find(id),d=$('#quickView');if(!p||!d)return;
    d.querySelector('[data-dialog-image]').src=p.image;d.querySelector('[data-dialog-image]').alt=p.name;d.querySelector('[data-dialog-category]').textContent=p.category;
    d.querySelector('[data-dialog-title]').textContent=p.name;d.querySelector('[data-dialog-description]').textContent=p.description;d.querySelector('[data-dialog-price]').textContent=money(p.price);
    d.querySelector('[data-add]').dataset.add=p.id;d.showModal();
  }
  function catalog(){
    const grid=$('#productGrid');if(!grid)return;
    const q=$('#search').value.toLocaleLowerCase('ru'),cats=all('.category-filter:checked').map(n=>n.value),max=Number($('#priceRange').value),sort=$('#sortSelect').value;
    let list=products.filter(p=>p.name.toLocaleLowerCase('ru').includes(q)&&(!cats.length||cats.includes(p.category))&&p.price<=max);
    if(sort==='price-asc')list.sort((a,b)=>a.price-b.price);if(sort==='price-desc')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'ru'));
    grid.replaceChildren(...list.map(p=>card(p)));all('#resultsCount,#resultsCountMobile').forEach(n=>n.textContent=list.length+' товаров');$('#emptyState').hidden=!!list.length;
  }
  if($('body').dataset.page==='catalog'){
    catalog();$('#searchForm').addEventListener('submit',e=>{e.preventDefault();catalog();});$('#search').addEventListener('input',catalog);
    all('.category-filter').forEach(n=>n.addEventListener('change',catalog));$('#sortSelect').addEventListener('change',catalog);
    $('#priceRange').addEventListener('input',e=>{$('#priceValue').textContent=money(+e.target.value);catalog();});
    const reset=()=>{all('.category-filter').forEach(n=>n.checked=false);$('#priceRange').value=15000;$('#priceValue').textContent=money(15000);$('#search').value='';catalog();};
    $('#resetFilters').addEventListener('click',reset);$('#emptyReset').addEventListener('click',reset);
  }
  if($('body').dataset.page==='product'){$('#productDetail').append(card(find(new URLSearchParams(location.search).get('id')||1),'detail'));}
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-add]');if(a){add(a.dataset.add);return;}
    const v=e.target.closest('[data-quick]');if(v){quick(v.dataset.quick);return;}
    const q=e.target.closest('[data-qty]');if(q){const id=String(q.dataset.id),n=Math.max(0,(cart.get(id)||0)+ +q.dataset.qty);if(n)cart.set(id,n);else cart.delete(id);sync();return;}
    const r=e.target.closest('[data-remove]');if(r){cart.delete(String(r.dataset.remove));sync();}
  });
  $('#quickView')?.addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
  $('#checkout')?.addEventListener('click',()=>say(cart.size?'Заказ подготовлен. Оплата отключена.':'Добавьте товары перед оформлением.'));
  sync();
}
