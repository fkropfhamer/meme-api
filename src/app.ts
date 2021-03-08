import Koa from 'koa';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import indexRouter from './routes/index';
import userRouter from './routes/user';
import jwt from 'koa-jwt';
import { JWT_SECRET } from './util/constants';

const app = new Koa();

app.use(Logger());
app.use(bodyParser());
app.use(jwt({ secret: JWT_SECRET, passthrough: true }));

app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

export default app;
