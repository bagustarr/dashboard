<template>
    <div class="container">
        <h1 class="text-center">{{ cryptoName }} ({{ cryptoSymbol }})</h1>

        <div class="crypto-info">
            <h2>Цена: ${{ cryptoPrice }}</h2>
            <p>Изменение за 24ч: 
                <span :class="cryptoPriceChange >= 0 ? 'text-success' : 'text-danger'">
                    {{ cryptoPriceChange > 0 ? '+' : '' }}{{ cryptoPriceChange }}%
                </span>
            </p>
            <p>Рыночная капитализация: ${{ cryptoMarketCap }}</p>
        </div>

        <div class="chart-placeholder">
            <p>График цены (здесь будет реальный график)</p>
        </div>

        <h3 class="mt-4">О {{ cryptoName }}</h3>
        <p>{{ cryptoDescription }}</p>
        
        <button @click="$router.push('/')" class="btn btn-primary mt-3">Назад</button>
    </div>
</template>

<script>
export default {
    name: 'BasePersonal',
    data() {
        return {
            cryptoName: '',
            cryptoSymbol: '',
            cryptoPrice: 0,
            cryptoPriceChange: 0,
            cryptoMarketCap: '',
            cryptoDescription: ''
        };
    },
    created() {
        const query = this.$route.query;
        this.cryptoName = query.name || 'Bitcoin';
        this.cryptoSymbol = query.symbol || 'BTC';
        this.cryptoPrice = query.price || 45000;
        this.cryptoPriceChange = query.priceChange || 0;
        this.cryptoMarketCap = query.marketCap || '875B';
        this.cryptoDescription = this.getCryptoDescription(this.cryptoName);
    },
    methods: {
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
    .chart-placeholder {
            background: #1e1e1e;
            height: 300px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #888;
        }
    .text-success {
        color: #28a745;
    }
    .text-danger {
        color: #dc3545;
    }
</style>