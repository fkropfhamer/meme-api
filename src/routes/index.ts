import Router from 'koa-router';
const router = new Router();

router.get('/', async ctx => {
  ctx.body = {
    msg: 'Hello World!',
    status: true
  };
});

export default router;
