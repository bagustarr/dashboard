<template>
  <div class="about">
    <div class="container mt-4">
      <h1>О нас</h1>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Crypto Dashboard</h5>
              <p class="card-text">
                Мы предоставляем актуальную информацию о криптовалютах, их ценах и рыночной капитализации.
                Наш сервис помогает отслеживать изменения на криптовалютном рынке в реальном времени.
              </p>
              <h5 class="mt-4">Наши преимущества:</h5>
              <ul>
                <li>Актуальные данные о ценах криптовалют</li>
                <li>Удобный интерфейс для отслеживания изменений</li>
                <li>Топ-10 криптовалют по капитализации</li>
                <li>Последние новости криптовалютного рынка</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}
li:before {
  content: "•";
  color: #00ff88;
  position: absolute;
  left: 0;
}
</style> 