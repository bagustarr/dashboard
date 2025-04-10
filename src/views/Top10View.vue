<template>
  <div class="top10">
    <div class="container mt-4">
      <h1>Топ 10 криптовалют по изменению цены за 24 часа</h1>
      
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
          <tr v-for="(crypto, index) in cryptos" :key="crypto.id" @click="openPersonalPage(crypto)">
            <td>{{ index + 1 }}</td>
            <td>
              <div class="d-flex align-items-center">
                <img v-if="crypto.image" :src="crypto.image" alt="logo" height="24" class="me-2">
                {{ crypto.name }}
              </div>
            </td>
            <td>${{ formatNum(crypto.price) }}</td>
            <td>
              <span :class="crypto.change >= 0 ? 'positive' : 'negative'">
                {{ crypto.change >= 0 ? '+' : '' }}{{ formatNum(crypto.change, 2) }}%
              </span>
            </td>
            <td>${{ formatCapitalization(crypto.marketCap) }}</td>
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
  name: 'Top10View',
  data: function() {
    return {
      cryptos: [],
      isLoading: false,
      errorMsg: null, 
    }
  },
  methods: {
    getTopCoins: async function() {
      this.isLoading = true;
      this.errorMsg = null;

      try {
        const result = await axios.get(`${config.api.baseUrl}/coins/markets`, {
          params: {
            vs_currency: config.api.defaultCurrency,
            order: 'price_change_percentage_24h_desc',
            per_page: 20,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
            x_cg_demo_api_key: config.apiKeys.coingecko
          },
          headers: {
            'x-cg-demo-api-key': config.apiKeys.coingecko
          }
        });

        // Сортируем монеты по абсолютному значению изменения цены
        const sortedCryptos = result.data.sort((a, b) => 
          Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h)
        ).slice(0, 10); // Берем топ-10 монет с наибольшим изменением

        this.cryptos = sortedCryptos.map(crypto => ({
          id: crypto.id,
          name: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
          price: crypto.current_price,
          change: crypto.price_change_percentage_24h,
          marketCap: crypto.market_cap,
          image: crypto.image
        }));

        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.errorMsg = 'Ошибка при загрузке данных. Пожалуйста, попробуйте позже.';
        this.isLoading = false;
      }
    },

    formatNum: function(num, digits = 2) {
      if (num == null) return 'N/A';
      return Number(num).toLocaleString(undefined, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      });
    },

    formatCapitalization: function(value) {
      if (!value) return 'N/A';

      if (value >= 1e12) {
        return (value / 1e12).toFixed(2) + 'T';
      } else if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
      } else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
      }

      return value.toLocaleString();
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
    }
  },
  mounted: function() {
    this.getTopCoins();
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

.crypto-table tbody tr {
  cursor: pointer;
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

