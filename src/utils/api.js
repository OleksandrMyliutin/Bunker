import axios from 'axios';

axios.defaults.baseURL = '';

export const fetchAllProducts = async (query = {}) => {
    if (typeof query === 'string') {
        const url = `/campers${query.startsWith('?') ? query : `?${query}`}`;
        const { data } = await axios.get(url);
        return data;
    }
    const { data } = await axios.get('/campers', { params: query });
    return data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`/campers/${id}`);
    return response.data;
};
