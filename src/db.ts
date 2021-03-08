import mongoose from 'mongoose';

export function connectDb(): Promise<typeof mongoose> {
  const dbURI = process.env.MONGODB_URI || 'localhost';

  return mongoose.connect(`mongodb://${dbURI}/meme-api`, { useNewUrlParser: true, useUnifiedTopology: true });
}
