import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
    getItems() {
        return axios.get(`${API_URL}/items`);
    },
    addItem(item) {
        return axios.post(`${API_URL}/items`, item);
    }
};