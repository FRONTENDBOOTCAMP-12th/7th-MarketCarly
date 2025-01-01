import Pocketbase from 'pocketbase';

const pb = new Pocketbase(import.meta.env.VITE_PB_URL2);

export default pb;
