const LIMIT = 20;
const FAV_KEY = 'catalog:favorites';
const listURL = (skip, limit) => `https://cataas.com/api/cats?skip=${skip}&limit=${limit}`;
const imgURL = (id) => `https://cataas.com/cat/${id}`;

let page = 1;

const view = document.getElementById('view');
const controls = document.getElementById('controls');
const pageNo = document.getElementById('pageNo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const navHome = document.getElementById('nav-home');
const navFav = document.getElementById('nav-fav');


const getFavs = () => JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
const setFavs = (ids) => localStorage.setItem(FAV_KEY, JSON.stringify(ids));
const isFav = (id) => getFavs().includes(id);
const toggleFav = (id) => {
    const s = new Set(getFavs());
    s.has(id) ? s.delete(id) : s.add(id);
    setFavs([...s]);
};


const show = (html) => (view.innerHTML = html);
const loading = (txt = 'Loading...') => show(`
 <div class="panel"><div class="spinner"></div><div>${txt}</div></div>
`);
const errorBox = (msg, retry) => {
    show(`<div class="panel"><div style="color:#ea4335;font-weight:700">Error</div><div>${msg}</div><button class="btn" id="retry">Retry</button></div>`);
    document.getElementById('retry').onclick = retry;
};
const empty = (msg) => show(`<div class="panel">${msg}</div>`);


const card = (id) => `
 <article class="card" data-id="${id}">
   <img class="thumb" src="${imgURL(id)}" alt="Cat"
        loading="lazy"
<div class="bar">
<button class="icon-btn fav ${isFav(id) ? 'active' : ''}" title="Favorite">❤</button>
</div>
</article>
`;


const bindHearts = () => {
    view.querySelectorAll('.card .fav').forEach(btn => {
        btn.onclick = () => {
            const id = btn.closest('.card').dataset.id;
            toggleFav(id);
            btn.classList.toggle('active');
            if (location.hash.startsWith('#/favorites') && !isFav(id)) {
                btn.closest('.card').remove();
                if (!view.querySelector('.card')) empty('No favorites yet. Go add some on Browse!');
            }
        };
    });
};


async function renderBrowse() {
    controls.hidden = false;
    pageNo.textContent = String(page);
    loading('Fetching cats...');


    const skip = (page - 1) * LIMIT;
    try {
        const res = await fetch(listURL(skip, LIMIT));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const cats = await res.json();
        if (!Array.isArray(cats) || cats.length === 0) {
            empty('No cats found. Try a different page.');
            prevBtn.disabled = page <= 1;
            nextBtn.disabled = true;
            return;
        }
        show(`<section class="grid">${cats.map(c => card(c.id)).join('')}</section>`);
        bindHearts();
        prevBtn.disabled = page <= 1;
        nextBtn.disabled = cats.length < LIMIT;
    } catch (e) {
        errorBox(e.message, renderBrowse);
        prevBtn.disabled = nextBtn.disabled = true;
    }
}
