<template>
  <div class="container">
    <h1 class="text-center mb-4">Криптовалютные Новости</h1>
    
    <div class="news-container">
      <div v-for="(news, index) in newsList" :key="index" class="news-card">
        <h3>{{ news.title }}</h3>
        <p>{{ news.description }}</p>
        <div class="news-meta">
          <span>Источник: {{ news.source }}</span>
          <span>Дата: {{ news.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsView',
  data() {
    return {
      newsList: [
        {
          title: 'Bitcoin достиг нового максимума',
          description: 'Крупнейшая криптовалюта установила новый рекорд по капитализации.',
          source: 'CryptoNews',
          date: '2024-04-11'
        },
        {
          title: 'Ethereum 2.0: Обновление сети',
          description: 'Завершено обновление сети Ethereum, улучшена производительность.',
          source: 'Blockchain Daily',
          date: '2024-04-10'
        },
        {
          title: 'Новые правила регулирования криптовалют',
          description: 'Центральные банки обсуждают новые правила для криптовалютного рынка.',
          source: 'Financial Times',
          date: '2024-04-09'
        },
        {
          title: 'DeFi проекты набирают популярность',
          description: 'Объем блокированных средств в DeFi превысил $100 миллиардов.',
          source: 'DeFi Pulse',
          date: '2024-04-08'
        },
        {
          title: 'NFT рынок: новые тренды',
          description: 'Анализ последних тенденций на рынке невзаимозаменяемых токенов.',
          source: 'NFT News',
          date: '2024-04-07'
        }
      ]
    };
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
.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
.news-card {
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s ease;
}
.news-card:hover {
  transform: translateY(-5px);
}
.news-card h3 {
  color: #fff;
  margin-bottom: 15px;
}
.news-card p {
  color: #ccc;
  margin-bottom: 15px;
  line-height: 1.5;
}
.news-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9em;
}
</style>