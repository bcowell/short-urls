import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
    _id: { type: Number },
    url: String,
    createdAt: { type: Date, default: Date.now() }
});

let Link; 
try { Link = model('Link', linkSchema) }
catch (err) { Link = model('Link') }


export default Link;