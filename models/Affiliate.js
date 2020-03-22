const mongoose = require('mongoose');

const AffiliateSchema = mongoose.Schema({
        
    clicks: {
        type: Number,
        required: false

     },

     registercount: {
        type: String,
        required: false

     },

    naam: {
        type: Object,
        required: false

    },

    nameclient: {
        type: Object,
        required: false

    },

    free: {
        type: Number,
        required: false

    },

    special: {
        type: Number,
        required: false

    },

    standard: {
        type: Number,
        required: false

    },

    pro: {
        type: Number,
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
