import app from './server';

const PORT = 5000;
const production = process.env.NODE_ENV === 'production';

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
    if(production)
        console.log('Production files are served');
});
