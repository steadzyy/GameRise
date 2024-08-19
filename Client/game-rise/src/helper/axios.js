import axios from 'axios';

const gameRise = axios.create({
    baseURL : 'https://gamerise.steadzy.online'
});

export default gameRise;