import { defineStore } from 'pinia';
import apiService from '@/services/api';

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    topCryptos: [],
    loading: false,
    error: null,
    selectedCrypto: null,
    news: [],
  }),

  actions: {
    async fetchTopCryptos() {
      this.loading = true;
      this.error = null;

     
      const data = await apiService.getTopCryptos();
      this.topCryptos = data.map(crypto => ({
        id: crypto.id,
        name: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
        price: crypto.current_price,
        change: crypto.price_change_percentage_24h,
        marketCap: crypto.market_cap,
        image: crypto.image,
      }));

      this.loading = false;
    },

    async fetchCryptoDetails(id) {
      this.loading = true;
      this.error = null;

      
      const data = await apiService.getCryptoDetails(id);
      this.selectedCrypto = {
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        description: data.description.ru || data.description.en,
        image: data.image.large,
        currentPrice: data.market_data.current_price.usd,
        marketCap: data.market_data.market_cap.usd,
        totalVolume: data.market_data.total_volume.usd,
        high24h: data.market_data.high_24h.usd,
        low24h: data.market_data.low_24h.usd,
        priceChange24h: data.market_data.price_change_percentage_24h,
        website: data.links.homepage[0],
        reddit: data.links.subreddit_url,
        twitter: data.links.twitter_screen_name,
      };

      this.loading = false;
    }}
});