import Router from 'koa-router';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { createJWT } from '../util/authentication';
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

  const passwordHash = await bcrypt.hash(password, 8);

  const user = new User({
    username,
    password: passwordHash
  });

  try {
    await user.save();

    ctx.body = { status: true };
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      ctx.throw(422, 'username already exits');
    }

    ctx.throw(500);
  }
});

router.post('/authenticate', async ctx => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, 'invalid arguments');
  }

  const user = await User.findOne({ username });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = createJWT({ username: user.username, _id: username.id });

      ctx.body = {
        token,
        status: true
      };
    } else {
      ctx.throw(401, 'wrong password');
    }
  } else {
    ctx.throw(404, 'user not found');
  }
});

router.get('/authentication-check', async ctx => {
  if (ctx.state.user) {
    ctx.body = { status: true };
  } else {
    ctx.throw(401, ctx.state.jwtOriginalError);
  }
});

export default router;
