const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const routes = require('./routes');
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const startApp = async () => {
  await app.prepare();
  createServer(handle).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
};

startApp().then(() => {
  console.log('Started app...')
});
