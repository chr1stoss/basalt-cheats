document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#productGrid');
  const template = document.querySelector('#productCardTemplate');
  const modal = document.querySelector('#quickView');
  const toastEl = document.querySelector('#cartToast');
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
  const count = document.querySelector('[data-cart-count]');
  const selectedCategories = () => [...document.querySelectorAll('.category-filter:checked')].map(x => x.value);
  let cartCount = 0;
  const rubles = n => `${new Intl.NumberFormat('ru-RU').format(n)} ₽`;

  function render() {
    const query = document.querySelector('#searchInput').value.trim().toLocaleLowerCase('ru');
    const categories = selectedCategories();
    const ceiling = Number(document.querySelector('#priceRange').value);
    const sort = document.querySelector('#sortSelect').value;
    let list = PRODUCTS.filter(p => p.name.toLocaleLowerCase('ru').includes(query) && (!categories.length || categories.includes(p.category)) && p.price <= ceiling);
    if (sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    if (sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    if (sort === 'name') list.sort((a,b)=>a.name.localeCompare(b.name,'ru'));
    grid.replaceChildren();
    for (const p of list) {
      const fragment = template.content.cloneNode(true);
      const card = fragment.querySelector('article');
      const image = fragment.querySelector('img');
      image.src = p.image; image.alt = p.name;
      fragment.querySelector('.product-category').textContent = p.category;
      fragment.querySelector('.product-title').textContent = p.name;
      fragment.querySelector('.product-price').innerHTML = p.oldPrice ? `${rubles(p.price)} <del>${rubles(p.oldPrice)}</del>` : rubles(p.price);
      const badge = fragment.querySelector('.discount-badge');
      if (p.oldPrice) { badge.textContent = `−${Math.round((1-p.price/p.oldPrice)*100)}%`; badge.classList.remove('d-none'); }
      const quick = fragment.querySelector('.quick-view');
      quick.dataset.title = p.name; quick.dataset.price = rubles(p.price); quick.dataset.img = p.image;
      quick.dataset.productId = p.id;
      const titleLink = fragment.querySelector('.product-title');
      titleLink.dataset.title = p.name; titleLink.dataset.price = rubles(p.price); titleLink.dataset.img = p.image; titleLink.dataset.productId = p.id;
      fragment.querySelector('[data-add-to-cart]').dataset.productId = p.id;
      card.dataset.productId = p.id;
      grid.append(fragment);
    }
    document.querySelector('#resultsCount').textContent = `${list.length} ${list.length === 1 ? 'товар' : 'товаров'}`;
    document.querySelector('#emptyState').classList.toggle('d-none', list.length !== 0);
    grid.classList.toggle('d-none', list.length === 0);
  }

  function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === Number(id));
    if (!product) return;
    cartCount += 1;
    count.textContent = cartCount;
    document.querySelector('.btn-cart').setAttribute('aria-label', `Корзина, товаров: ${cartCount}`);
    toastEl.querySelector('.toast-body').textContent = `${product.name} — добавлено в корзину.`;
    toast.show();
  }

  modal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const { title, price, img } = button.dataset;
    const product = PRODUCTS.find(p => p.id === Number(button?.dataset.productId));
    if (!product) return;
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('[data-modal-name]').textContent = title;
    modal.querySelector('[data-modal-category]').textContent = product.category;
    modal.querySelector('[data-modal-description]').textContent = product.description;
    modal.querySelector('[data-price]').textContent = price;
    const photo = modal.querySelector('[data-modal-img]'); photo.src = img; photo.alt = title;
    modal.querySelector('[data-add-to-cart]').dataset.productId = product.id;
  });

  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add-to-cart]');
    if (!add) return;
    addToCart(add.dataset.productId);
  });
  document.querySelector('#searchForm').addEventListener('submit', event => { event.preventDefault(); render(); });
  document.querySelector('#searchInput').addEventListener('input', render);
  document.querySelectorAll('.category-filter').forEach(x => x.addEventListener('change', render));
  document.querySelector('#priceRange').addEventListener('input', event => { document.querySelector('#priceValue').textContent = rubles(Number(event.target.value)); render(); });
  document.querySelector('#sortSelect').addEventListener('change', render);
  function reset() {
    document.querySelectorAll('.category-filter').forEach(x => x.checked = false);
    document.querySelector('#priceRange').value = 15000;
    document.querySelector('#priceValue').textContent = rubles(15000);
    document.querySelector('#searchInput').value = '';
    render();
  }
  document.querySelector('#resetFilters').addEventListener('click', reset);
  document.querySelector('#emptyReset').addEventListener('click', reset);
  render();
});
