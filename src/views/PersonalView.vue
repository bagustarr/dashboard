<template>
  <div class="container">
    <h1 class="text-center">{{ cryptoName }}</h1>

    <div class="crypto-info">
      <h2>Цена: ${{ cryptoPrice }}</h2>
      <p>Изменение за 24ч: 
        <span :class="cryptoPriceChange >= 0 ? 'text-success' : 'text-danger'">
          {{ cryptoPriceChange > 0 ? '+' : '' }}{{ cryptoPriceChange }}%
        </span>
      </p>
      <p>Рыночная капитализация: ${{ cryptoMarketCap }}</p>
    </div>

    <div class="chart-container">
      <canvas ref="priceChart"></canvas>
      <div class="data-source">
        <small>Данные графика сгенерированы для демонстрации. Не являются реальными данными о ценах.</small>
      </div>
    </div>

    <h3 class="mt-4">О {{ cryptoName }}</h3>
    <p>{{ cryptoDescription }}</p>
    
    <button @click="goBack" class="btn btn-primary mt-3">Назад</button>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { nextTick } from 'vue';

Chart.register(...registerables);

export default {
  name: 'PersonalView',
  data() {
    return {
      cryptoName: '',
      cryptoPrice: 0,
      cryptoPriceChange: 0,
      cryptoMarketCap: '',
      cryptoDescription: '',
      chart: null,
      priceHistory: []
    };
  },
  async created() {
    try {
      await this.initializeData();
    } catch (error) {
      console.error('Ошибка инициализации:', error);
    }
  },
  methods: {
    async initializeData() {
      const query = this.$route.query;
      console.log('Полученные параметры:', query); // Отладочная информация

      if (!query.name) {
        console.error('Отсутствует имя криптовалюты');
        return;
      }

      // Устанавливаем значения по умолчанию, если параметры не переданы
      this.cryptoName = query.name.split(' (')[0];
      this.cryptoPrice = parseFloat(query.price) || 1000; // Значение по умолчанию
      this.cryptoPriceChange = parseFloat(query.priceChange) || 0;
      this.cryptoMarketCap = query.marketCap || '1000000000';
      this.cryptoDescription = this.getCryptoDescription(this.cryptoName);
      
      console.log('Установленные значения:', {
        name: this.cryptoName,
        price: this.cryptoPrice,
        change: this.cryptoPriceChange,
        marketCap: this.cryptoMarketCap
      });

      // Генерируем тестовые данные
      this.generateTestData();
      
      // Ждем следующего тика и создаем график
      await nextTick();
      console.log('Canvas элемент:', this.$refs.priceChart); // Отладочная информация
      
      if (this.$refs.priceChart) {
        this.createChart();
      } else {
        console.error('Canvas элемент не найден');
      }
    },
    generateTestData() {
      if (!this.cryptoPrice) {
        console.error('Базовая цена не установлена');
        return;
      }

      const now = new Date();
      const testData = [];
      const basePrice = this.cryptoPrice;
      
      // Генерируем 24 точки данных за последние 24 часа
      for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
        const price = basePrice * (1 + Math.sin(i / 4) * 0.1);
        testData.push({
          date: time,
          price: price
        });
      }
      
      console.log('Сгенерированные данные:', testData); // Отладочная информация
      this.priceHistory = testData;
    },
    createChart() {
      if (!this.$refs.priceChart) {
        console.error('Canvas элемент не найден');
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.priceChart.getContext('2d');
      if (!ctx) {
        console.error('Не удалось получить контекст canvas');
        return;
      }

      const labels = this.priceHistory.map(item => 
        item.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      );
      const data = this.priceHistory.map(item => item.price);

      console.log('Данные для графика:', { labels, data }); // Отладочная информация

      try {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Цена (USD)',
              data: data,
              borderColor: this.cryptoPriceChange >= 0 ? 'green' : 'red',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderWidth: 2,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                ticks: {
                  callback: value => `$${value.toLocaleString('ru-RU')}`
                }
              },
              x: {
                ticks: {
                  maxRotation: 45,
                  minRotation: 45
                }
              }
            }
          }
        });
        console.log('График создан успешно'); // Отладочная информация
      } catch (error) {
        console.error('Ошибка создания графика:', error);
      }
    },
    goBack() {
      this.$router.push('/');
    },
    getCryptoDescription(name) {
      const descriptions = {
        'Bitcoin': 'Bitcoin — первая и самая известная криптовалюта.',
        'Ethereum': 'Ethereum — платформа для создания децентрализованных приложений.',
        'Binance Coin': 'Binance Coin — нативная криптовалюта биржи Binance.',
        'Solana': 'Solana — высокопроизводительный блокчейн.',
        'Cardano': 'Cardano — научно-ориентированный блокчейн-проект.',
        'XRP': 'XRP — криптовалюта для международных платежей.',
        'Polkadot': 'Polkadot — протокол для взаимодействия блокчейнов.',
        'Dogecoin': 'Dogecoin — популярная криптовалюта.',
        'Avalanche': 'Avalanche — платформа для децентрализованных приложений.',
        'Polygon': 'Polygon — решение для масштабирования Ethereum.'
      };
      return descriptions[name] || 'Описание этой криптовалюты пока недоступно.';
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>

<style>
body {
  background-color: #121212;
  color: #fff;
}
.container {
  margin-top: 20px;
}
.crypto-info {
  text-align: center;
  margin-bottom: 20px;
}
.chart-container {
  background: #1a1a1a;
  height: 400px;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  position: relative;
}
.data-source {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #666;
  font-size: 12px;
  text-align: right;
}
.text-success {
  color: green;
}
.text-danger {
  color: red;
}
</style>