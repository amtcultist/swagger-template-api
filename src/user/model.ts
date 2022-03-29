import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { UserDocument } from './document';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gender',
    },
  },
  {
    timestamps: true,
  }
);

// Initialise mongoose paginate
UserSchema.plugin(mongoosePaginate);

// Pre save middleware
UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  // Only hash when users password is getting update
  if (!user.isModified('password')) return next();

  // Salt gen
  const factor = +process.env.SALT_FACTOR;
  const salt = await bcrypt.genSalt(factor);

  // Hash gen
  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace password with salt
  user.password = hash;

  return next();
});

export default mongoose.model(
  'User',
  UserSchema
) as mongoose.PaginateModel<UserDocument>;
