const createErrorString = (name: string) => `Environment variable ${name} is missing`;

if (!process.env.JWT_SECRET) {
  throw Error(createErrorString('JWT_SECRET'));
}

if (!process.env.MONGODB_URI) {
  throw Error(createErrorString('MONGODB_URI'));
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
