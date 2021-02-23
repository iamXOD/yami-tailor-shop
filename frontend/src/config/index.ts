// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

const config: { url: { api: string } } = {
    url: { api: "/" }
}

if (NODE_ENV === 'production') {
    config.url.api = 'https://api.yamitailorshop.com/';
} else {
    config.url.api = '/';
}

export default config;