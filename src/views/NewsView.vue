<template>
  <div class="news">
    <div class="container mt-4">
      <h1>Новости криптовалют</h1>
      
      <div class="row mt-4">
        <div v-for="article in news" :key="article.id" class="col-md-6 mb-4">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text text-muted">
                {{ article.date }} | Источник: {{ article.source }}
              </p>
              <button class="btn btn-outline-primary mt-2">Читать полностью</button>
            </div>
          </div>
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
      news: [
        { id: 1, title: 'Биткоин установил новый рекорд цены', date: '2023-10-19', source: 'CryptoDaily' },
        { id: 2, title: 'Ethereum обновит сеть в следующем месяце', date: '2023-10-18', source: 'CoinDesk' },
        { id: 3, title: 'Регуляторы ужесточают правила для криптовалютных бирж', date: '2023-10-17', source: 'Bloomberg' },
        { id: 4, title: 'Новый криптопроект привлек $50 млн инвестиций', date: '2023-10-16', source: 'Reuters' },
        { id: 5, title: 'Аналитики прогнозируют рост биткоина до конца года', date: '2023-10-15', source: 'Forbes' },
        { id: 6, title: 'Центральные банки исследуют CBDC', date: '2023-10-14', source: 'Financial Times' }
      ]
    };
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-weight: bold;
}
</style>