import * as mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    id: { type: String, required: true, index: { unique: true }, default: uuidv4() },

    username: { type: String, required: true, index: { unique: true } },
    password: { type: String },

    invCode: { type: String, required: true },

    banned: {
        isBanned: { type: Boolean, required: true },
        duration: { type: Number, required: false },
    },

    admin: { type: Boolean, required: true },
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", UserSchema);