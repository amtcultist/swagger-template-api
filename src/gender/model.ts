import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { GenderDocument } from './document';

const GenderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Apply plugin
GenderSchema.plugin(mongoosePaginate);

export default mongoose.model(
  'Gender',
  GenderSchema
) as mongoose.PaginateModel<GenderDocument>;
