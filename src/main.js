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
