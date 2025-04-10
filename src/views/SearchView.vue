<template>
  <div class="container mt-4">
    <h1>Результаты поиска</h1>
    <div v-if="searchResults.length > 0">
      <table class="crypto-table table table-dark">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена (USD)</th>
            <th>Изменение (%)</th>
            <th>Капитализация</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in searchResults" :key="crypto.id" @click="openPersonalPage(crypto)">
            <td>{{ crypto.name }} ({{ crypto.symbol }})</td>
            <td>\${{ crypto.price }}</td>
            <td>
              <span :class="crypto.priceChange >= 0 ? 'positive' : 'negative'">
                {{ crypto.priceChange }}%
              </span>
            </td>
            <td>\${{ crypto.marketCap }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <p>Ничего не найдено</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data() {
    return {
      searchResults: [],
      allCryptos: [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 45000, priceChange: 2.5, marketCap: '875B' },
        { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3200, priceChange: -1.2, marketCap: '385B' },
        { id: 3, name: 'Binance Coin', symbol: 'BNB', price: 400, priceChange: 4.1, marketCap: '65B' },
        { id: 4, name: 'Solana', symbol: 'SOL', price: 120, priceChange: -0.8, marketCap: '45B' },
        { id: 5, name: 'Cardano', symbol: 'ADA', price: 1.25, priceChange: 3.2, marketCap: '42B' },
        { id: 6, name: 'XRP', symbol: 'XRP', price: 0.75, priceChange: 1.5, marketCap: '35B' },
        { id: 7, name: 'Polkadot', symbol: 'DOT', price: 25, priceChange: -2.1, marketCap: '28B' },
        { id: 8, name: 'Dogecoin', symbol: 'DOGE', price: 0.15, priceChange: 5.3, marketCap: '20B' },
        { id: 9, name: 'Avalanche', symbol: 'AVAX', price: 85, priceChange: 2.8, marketCap: '18B' },
        { id: 10, name: 'Polygon', symbol: 'MATIC', price: 1.80, priceChange: -1.5, marketCap: '15B' },
        { id: 11, name: 'Chainlink', symbol: 'LINK', price: 15, priceChange: 3.7, marketCap: '8.5B' },
        { id: 12, name: 'Litecoin', symbol: 'LTC', price: 75, priceChange: 1.2, marketCap: '5.3B' },
        { id: 13, name: 'Uniswap', symbol: 'UNI', price: 6.5, priceChange: -0.5, marketCap: '4.8B' },
        { id: 14, name: 'Monero', symbol: 'XMR', price: 180, priceChange: 2.1, marketCap: '3.2B' },
        { id: 15, name: 'Aave', symbol: 'AAVE', price: 90, priceChange: 4.3, marketCap: '1.2B' },
        { id: 16, name: 'Cosmos', symbol: 'ATOM', price: 8.5, priceChange: -1.8, marketCap: '2.5B' },
        { id: 17, name: 'Tezos', symbol: 'XTZ', price: 1.2, priceChange: 0.8, marketCap: '1.1B' },
        { id: 18, name: 'Algorand', symbol: 'ALGO', price: 0.25, priceChange: -2.3, marketCap: '1.8B' },
        { id: 19, name: 'Filecoin', symbol: 'FIL', price: 5.8, priceChange: 1.5, marketCap: '2.1B' },
        { id: 20, name: 'EOS', symbol: 'EOS', price: 0.7, priceChange: -0.9, marketCap: '0.8B' }
      ]
    };
  },
  created() {
    this.performSearch();
  },
  watch: {
    '$route.query.q': {
      handler: 'performSearch',
      immediate: true
    }
  },
  methods: {
    performSearch() {
      const query = this.$route.query.q?.toLowerCase() || '';
      if (query) {
        this.searchResults = this.allCryptos.filter(crypto => 
          crypto.name.toLowerCase().includes(query) || 
          crypto.symbol.toLowerCase().includes(query)
        );
      } else {
        this.searchResults = [];
      }
    },
    openPersonalPage(crypto) {
      this.$router.push({
        path: '/personal',
        query: {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.price,
          priceChange: crypto.priceChange,
          marketCap: crypto.marketCap
        }
      });
    }
  }
};
</script>

<style>
.crypto-table th,
.crypto-table td {
  text-align: center;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.crypto-table tbody tr {
  cursor: pointer;
}

.crypto-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 