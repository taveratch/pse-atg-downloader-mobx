import app from './server';
import config from '../config';

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Proxy server is running on ${config.proxy}`);
});
