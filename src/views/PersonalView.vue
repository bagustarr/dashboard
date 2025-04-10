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
    </div>

    <h3 class="mt-4">О {{ cryptoName }}</h3>
    <p>{{ cryptoDescription }}</p>
    
    <button @click="goBack" class="btn btn-primary mt-3">Назад</button>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import config from '@/config';

export default {
    name: 'PersonalView',
  data() {
    return {
      cryptoName: '',
      cryptoSymbol: '',
      cryptoPrice: 0,
      cryptoPriceChange: 0,
      cryptoMarketCap: '',
      cryptoDescription: '',
      priceChart: null,
      priceHistory: []
    };
  },
  created() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      const query = this.$route.query;
      this.cryptoName = query.name.split(' (')[0];
      this.cryptoSymbol = query.symbol || 'BTC';
      this.cryptoPrice = query.price || 45000;
      this.cryptoPriceChange = query.priceChange || 0;
      this.cryptoMarketCap = query.marketCap || '875B';
      this.cryptoDescription = this.getCryptoDescription(this.cryptoName);
      this.fetchPriceHistory();
    },
    async fetchPriceHistory() {
      try {
        const response = await axios.get(`${config.api.baseUrl}/coins/${this.cryptoSymbol.toLowerCase()}/market_chart`, {
        params: {
            vs_currency: 'usd',
            days: '7',
            interval: 'daily',
          x_cg_demo_api_key: config.apiKeys.coingecko
        },
        headers: {
          'x-cg-demo-api-key': config.apiKeys.coingecko
        }
      });

        this.priceHistory = response.data.prices.map(price => ({
          date: new Date(price[0]),
          value: price[1]
        }));

        this.initChart();
      } catch (error) {
        console.error('Error fetching price history:', error);
        // Создаем тестовые данные в случае ошибки
        this.createTestData();
      }
    },
    createTestData() {
      const now = new Date();
      this.priceHistory = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        return {
          date,
          value: this.cryptoPrice * (1 + (Math.random() - 0.5) * 0.1)
        };
      });
      this.initChart();
    },
    initChart() {
      if (this.priceChart) {
        this.priceChart.destroy();
      }

      const ctx = this.$refs.priceChart.getContext('2d');
      this.priceChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.priceHistory.map(price => price.date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
          })),
          datasets: [{
            label: 'Цена (USD)',
            data: this.priceHistory.map(price => price.value),
            borderColor: '#00ff88',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#00ff88',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#fff',
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#00ff88',
              borderWidth: 1,
              padding: 10,
              displayColors: false
            }
          },
          scales: {
            y: {
              ticks: {
                color: '#fff',
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            x: {
              ticks: {
                color: '#fff'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    },
    goBack() {
      this.$router.push('/');
    },
    getCryptoDescription(name) {
      const descriptions = {
        'Bitcoin': 'Bitcoin — первая и самая известная криптовалюта, созданная в 2009 году. Это децентрализованная цифровая валюта, работающая на блокчейне.',
        'Ethereum': 'Ethereum — платформа для создания децентрализованных приложений и смарт-контрактов. Вторая по капитализации криптовалюта.',
        'Binance Coin': 'Binance Coin — нативная криптовалюта биржи Binance, используемая для оплаты комиссий и участия в различных сервисах платформы.',
        'Solana': 'Solana — высокопроизводительный блокчейн, известный своей скоростью и низкими комиссиями за транзакции.',
        'Cardano': 'Cardano — научно-ориентированный блокчейн-проект, разрабатываемый с использованием научной философии и методов.',
        'XRP': 'XRP — криптовалюта, созданная для быстрых и дешевых международных платежей между финансовыми учреждениями.',
        'Polkadot': 'Polkadot — протокол, позволяющий различным блокчейнам взаимодействовать друг с другом и обмениваться данными.',
        'Dogecoin': 'Dogecoin — криптовалюта, созданная как шутка, но получившая широкую популярность благодаря сообществу.',
        'Avalanche': 'Avalanche — платформа для создания децентрализованных приложений с высокой производительностью и масштабируемостью.',
        'Polygon': 'Polygon — решение для масштабирования Ethereum, обеспечивающее быстрые и дешевые транзакции.',
        'Chainlink': 'Chainlink — децентрализованный оракул, обеспечивающий надежную передачу данных между блокчейнами и внешним миром.',
        'Litecoin': 'Litecoin — форк Bitcoin, созданный для более быстрых транзакций и более эффективного майнинга.',
        'Uniswap': 'Uniswap — децентрализованная биржа, работающая на основе автоматизированных маркет-мейкеров.',
        'Monero': 'Monero — криптовалюта, ориентированная на конфиденциальность и анонимность транзакций.',
        'Aave': 'Aave — протокол децентрализованного кредитования, позволяющий пользователям зарабатывать проценты на депозитах.',
        'Cosmos': 'Cosmos — экосистема блокчейнов, разработанная для решения проблем масштабируемости и совместимости.',
        'Tezos': 'Tezos — блокчейн-платформа с встроенным механизмом самоуправления и обновления протокола.',
        'Algorand': 'Algorand — блокчейн-платформа, разработанная для обеспечения высокой производительности и безопасности.',
        'Filecoin': 'Filecoin — децентрализованная сеть хранения данных, позволяющая пользователям арендовать свободное место на жестких дисках.',
        'EOS': 'EOS — платформа для создания децентрализованных приложений с высокой производительностью и масштабируемостью.'
      };
      return descriptions[name] || 'Описание этой криптовалюты пока недоступно.';
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
            background: #1e1e1e;
  height: 400px;
            border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}
.text-success {
  color: #28a745;
}
.text-danger {
  color: #dc3545;
        }
</style>