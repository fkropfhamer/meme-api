import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
    username: string
    password: string
    role: string
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }

}, { timestamps: true });

export default model<User>('User', UserSchema);
