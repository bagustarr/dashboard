<template>
  <div class="home">
    <div class="container mt-4">
      <h1>Популярные криптовалюты</h1>
      
      <div v-if="isLoading" class="text-center my-5">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
        <p class="mt-2">Загрузка данных...</p>
      </div>
      
      
      <table v-else class="crypto-table table table-dark table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Цена (USD)</th>
            <th>Изменение (24ч)</th>
            <th>Капитализация</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(crypto, index) in coins" :key="crypto.id" @click="openPersonalPage(crypto)">
            <td>{{ index + 1 }}</td>
            <td>
              <div class="d-flex align-items-center">
                <img v-if="crypto.image" :src="crypto.image" alt="logo" height="24" class="me-2">
                {{ crypto.name }}
              </div>
            </td>
            <td>${{ numberFormat(crypto.price) }}</td>
            <td>
              <span :class="crypto.change >= 0 ? 'positive' : 'negative'">
                {{ crypto.change >= 0 ? '+' : '' }}{{ changeFormat(crypto.change) }}%
              </span>
            </td>
            <td>${{ marketCapFormat(crypto.marketCap) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  name: 'HomeView',
  data: function() {
    return {
      coins: [],
      isLoading: false,
     
    };
  },
  methods: {
    loadCryptoData: async function() {
      this.isLoading = true;
      

      const API_KEY = config.apiKeys.coingecko;
      const result = await axios.get(`${config.api.baseUrl}/coins/markets`, {
        params: {
          vs_currency: config.api.defaultCurrency,
          order: 'market_cap_desc',
          per_page: config.api.requestLimit,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h',
          x_cg_demo_api_key: API_KEY
        },
        headers: {
          'x-cg-demo-api-key': API_KEY
        }
      });

      this.coins = result.data.map(crypto => ({
        id: crypto.id,
        name: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
        price: crypto.current_price,
        change: crypto.price_change_percentage_24h,
        marketCap: crypto.market_cap,
        image: crypto.image
      }));

      this.isLoading = false;
    },
    openPersonalPage(crypto) {
      this.$router.push({
        path: '/personal',
        query: {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.price,
          priceChange: crypto.change,
          marketCap: crypto.marketCap
        }
      });
    },
    numberFormat(price) {
      return price ? price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) : 'N/A';
    },

    changeFormat(change) {
      return change ? change.toFixed(2) : 'N/A';
    },

    marketCapFormat(cap) {
      if (!cap) return 'N/A';

      if (cap >= 1e12) return (cap / 1e12).toFixed(2) + 'T';
      if (cap >= 1e9) return (cap / 1e9).toFixed(2) + 'B';
      if (cap >= 1e6) return (cap / 1e6).toFixed(2) + 'M';

      return cap.toLocaleString();
    }
  },
  mounted: function() {
    this.loadCryptoData();
  }
}
</script>

<style scoped>
.crypto-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.crypto-table th,
.crypto-table td {
  padding: 12px;
  text-align: left;
}

.crypto-table thead th {
  background-color: #1f1f1f;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.crypto-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.positive {
  color: #00ff88;
  background-color: rgba(0, 255, 136, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.negative {
  color: #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}
</style>