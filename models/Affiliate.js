const mongoose = require('mongoose');

const AffiliateSchema = mongoose.Schema({
        
    clicks: {
        type: String,
        required: false

     },

    naam: {
        type: Object,
        required: false

    },

    affiliateID: {
        type: String,
        required: false

    },


    date: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model('Analyse', AffiliateSchema);