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
            <td>${{ formatPrice(crypto.price) }}</td>
            <td>
              <span :class="getChangeClass(crypto.change)">
                {{ formatChangeWithSign(crypto.change) }}%
              </span>
            </td>
            <td>${{ formatMarketCap(crypto.marketCap) }}</td>
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
  data() {
    return {
      cryptos: [],
      isLoading: false
    };
  },
  methods: {
    async getTopCoins() {
      this.isLoading = true;
      
      const response = await axios.get(`${config.api.baseUrl}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'price_change_percentage_24h_desc',
          per_page: 20,
          page: 1,
          sparkline: false
        }
      });

      const sortedCryptos = response.data.sort((a, b) => 
        Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h)
      ).slice(0, 10);

      this.cryptos = sortedCryptos.map(crypto => ({
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
          name: crypto.name,
          price: crypto.price,
          priceChange: crypto.change,
          marketCap: crypto.marketCap
        }
      });
    },
    formatPrice(price) {
      if (price) {
        return price.toLocaleString('ru-RU', { minimumFractionDigits: 2 });
      } else {
        return '0';
      }
    },
    formatChangeWithSign(change) {
      if (change) {
        if (change >= 0) {
          return '+' + change.toFixed(2);
        } else {
          return change.toFixed(2);
        }
      } else {
        return '0';
      }
    },
    getChangeClass(change) {
      if (change >= 0) {
        return 'positive';
      } else {
        return 'negative';
      }
    },
    formatMarketCap(cap) {
      if (!cap) {
        return '0';
      }
      
      if (cap >= 1e12) {
        return (cap / 1e12).toFixed(2) + 'T';
      } else if (cap >= 1e9) {
        return (cap / 1e9).toFixed(2) + 'B';
      } else if (cap >= 1e6) {
        return (cap / 1e6).toFixed(2) + 'M';
      } else {
        return cap.toLocaleString('ru-RU');
      }
    }
  },
  mounted() {
    this.getTopCoins();
  }
};
</script>

<style scoped>
.crypto-table {
  width: 100%;
  margin-top: 20px;
}

.crypto-table th,
.crypto-table td {
  padding: 12px;
  text-align: left;
}

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}

.crypto-table tbody tr {
  cursor: pointer;
}

.crypto-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

