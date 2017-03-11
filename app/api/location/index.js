'use strict';

const express = require('express');
const router = express.Router();
const logger = require('shared/logger').child({ module: 'location' });
const mongoose = require('mongoose');
const Locations = mongoose.model('locations');
const geolib = require('geolib')

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
TODO: would want to add pagination to this
*/

 router.get('/api/location/orderByDistance/:lat/:long', function(req, res) {
   if (isNumeric(req.params.lat) && isNumeric(req.params.long)){
    let point = {
            type: "Point",
            coordinates: [parseFloat(req.params.long), parseFloat(req.params.lat)]
        };
    let geoOptions =  {
        spherical: true
    };

    let nearP = Locations.geoNear( point, geoOptions )
    nearP.then(docs =>{
      res.status(200).json(JSON.stringify(docs))
    })
    .catch(err =>{
      logger.error(err)
      res.status(500).json({})
    })

  }else{
    res.status(400).json({});
  }

 });


router.post('/api/location', function(req, res) {
  let payload = req.body.payload
  let name = payload.name

  if ( payload.name && isNumeric(payload.latlong.latitude) && isNumeric(payload.latlong.longitude) ){
    let saveP = Locations.findOneAndUpdate({name:payload.name},
                                            { id: name.toLowerCase(),
                                              name: payload.name,
                                              loc: {type: "Point", coordinates: [payload.latlong.longitude,payload.latlong.latitude]},
                                              createdAt: Date.now()
                                            },
                                            {upsert: true}
                                          ).exec()
    saveP.then(doc =>{
      res.status(200).json({})
    })
    .catch(err =>{
      logger.error(err)
      res.status(500).json({})
    })
  }else{
    res.status(400).json({})
  }


});

module.exports = router;
