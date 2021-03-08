import mongoose from 'mongoose';
import { MONGODB_URI } from './util/constants';

export function connectDb(): Promise<typeof mongoose> {
  const dbURI = MONGODB_URI;

  return mongoose.connect(`mongodb://${dbURI}/meme-api`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}
