import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = {
        msg: 'Hello World!',
        status: true
    }
});

app.use(Logger());

app.use(router.routes()).use(router.allowedMethods());

export default app;
