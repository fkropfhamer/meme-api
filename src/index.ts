import app from './app';
import { connectDb } from './db';

connectDb().then(async() => {
  app.listen(8080, () => {
    console.log('Server running on port 8080');
  });
});
