const LIMIT = 20;
const FAV_KEY = 'catalog:favorites';
const listURL = (skip, limit) => `https://cataas.com/api/cats?skip=${skip}&limit=${limit}`;
const imgURL = (id) => `https://cataas.com/cat/${id}`;

