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
