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


