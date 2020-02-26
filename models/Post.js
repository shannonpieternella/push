const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
        
        endpoint: {
        type: Object,
        required: true

     },

    naam: {
        type: Object,
        required: true

    },
    
    segment: {
        type: Object,
        required: true

    },

    date: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model('Posts', PostSchema);