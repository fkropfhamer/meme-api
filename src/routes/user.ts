import Router from 'koa-router';
import User from '../models/user';
const router = new Router({ prefix: '/user' });

router.get('/', async ctx => {
  const user = await User.findOne({});

  if (user) {
    ctx.body = user;
    console.log(user.password);
  } else {
    ctx.body = { msg: 'user not found' };
  }
});

router.put('/', async ctx => {
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

export default router;
