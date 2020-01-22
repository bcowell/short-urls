import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
    _id: { type: Number },
    url: String,
    createdAt: { type: Date, default: Date.now() }
});

const Link = model('Link', linkSchema);

export default Link;