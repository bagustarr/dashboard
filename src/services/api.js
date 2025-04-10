import axios from 'axios';
import config from '@/config';

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  
  async getTopCryptos() {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: config.api.defaultCurrency,
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h',
        x_cg_demo_api_key: config.apiKeys.coingecko,
      },
    });
    return response.data;
  },
  
  
  async getCryptoDetails(id) {
    const response = await api.get(`/coins/${id}`);
    return response.data;
  },

 
  async getNews() {
    const response = await api.get('/news'); 
    return response.data;
  }
};