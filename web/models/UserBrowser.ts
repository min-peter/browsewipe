import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUserBrowser extends Document {
  user_id: mongoose.Types.ObjectId;
  browser_id: string;
  browser_name: string | null;
  emergency_action: boolean;
  profile_uuid: string;
  profile_label: string | null;
}

const UserBrowserSchema = new Schema<IUserBrowser>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  browser_id: {
      type: String,
      required: true,
  },
  browser_name: {
      type: String,
      default: null,
  },
  emergency_action: {
      type: Boolean,
      default: false,
  },
  profile_uuid: {
      type: String,
      required: true,
  },
  profile_label: {
      type: String,
      default: null,
  }
});

type UserBrowserModelType = Model<IUserBrowser>;

const UserBrowser: UserBrowserModelType = (mongoose.models.UserBrowser as UserBrowserModelType) || mongoose.model<IUserBrowser>('UserBrowser', UserBrowserSchema);
export default UserBrowser;