import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const users = new Schema({
    firebase_id: { type: String, unique: true, index: true, required: true },
    email: { type: String, unique: true, index: true, required: true },
    first_name: { type: String, unique: false, index: false, required: true },
});
const Users = mongoose.model('users', users);

export { Users };
