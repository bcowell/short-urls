import { Schema, model } from 'mongoose';

const clickSchema = new Schema({
    _id: { type: Number, required: true },
    count: { type: Number, default: 0 }
});

const Counter = model('Counter', clickSchema);

export default Counter;