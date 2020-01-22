import { Schema, model } from 'mongoose';

const clickSchema = new Schema({
    _id: { type: Number, required: true },
    count: { type: Number, default: 0 }
});

let Counter;
try { Counter = model('Counter', clickSchema) }
catch (err) { Counter = model('Counter') }

export default Counter;