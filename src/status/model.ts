import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { StatusDocument } from './document';

const StatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Initialise mongoose paginate
StatusSchema.plugin(mongoosePaginate);

export default mongoose.model(
  'Status',
  StatusSchema
) as mongoose.PaginateModel<StatusDocument>;
