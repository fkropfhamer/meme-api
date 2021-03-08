import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import User from './models/user';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = {
    msg: 'Hello World!',
    status: true
  };
});

router.get('/user', async ctx => {
  const user = await User.findOne({});

  if (user) {
    ctx.body = user;
    console.log(user.password);
  } else {
    ctx.body = { msg: 'user not found' };
  }
});

router.put('/user', async ctx => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, 'invalid arguments');
  }

  const user = {
    username,
    password
  };

  try {
    await User.create(user);

    ctx.body = { status: true };
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      ctx.throw(422, 'username already exits');
    }

    ctx.throw(500);
  }
});

app.use(Logger());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

export default app;
