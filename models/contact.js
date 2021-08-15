const mongoose = require('mongoose');

// our schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    }
});

// name of db
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;