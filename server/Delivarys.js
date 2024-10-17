const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Delivery schema
const deliverySchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
