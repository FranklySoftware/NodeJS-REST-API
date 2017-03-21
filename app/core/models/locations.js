'use strict';

let mongoose = require('mongoose');
let Schema   = mongoose.Schema;


let locationsSchema = new Schema({
  id: { type : String, index : true },
  name: { type : String, required: true},
  loc: { type: {type: String}, coordinates: []},
  createdAt: { type: Date, 'default': Date.now }
});
locationsSchema.index({ loc: '2dsphere' });

module.exports = mongoose.model('locations', locationsSchema);
