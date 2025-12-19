import mongoose from 'mongoose';
const BotSchema = new mongoose.Schema({

    text:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const Bot= mongoose.model('Bot', BotSchema);
export default Bot;