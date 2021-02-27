let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();

app.use(morgan('tiny'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Setting the headers for all routes to be CORS compliant
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

function dataObject(req , metaAbstract){
  return  {   "meta:license": [
    "Copyright 2021 genesis. All rights reserved.",
    "This work is licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) license",
    "you may not use this file except in compliance with the License. You may obtain a copy",
    "of the License at https://creativecommons.org/licenses/by/4.0/"
  ],
  "$id": `https://ns.genesis.com/xdm/${req.body.schemaType}/${req.body.schemaName}`,
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": req.body.title,
  "type": "object",
  "auditable": true,
  "meta:extensible": true,
  "meta:abstract": metaAbstract,
  
  "description": req.body.description,// "An XDM Individual Profile forms a singular representation of the attributes and interests of both identified and partially-identified individuals. Less-identified profiles may contain only anonymous behavioral signals, such as browser cookies, while highly-identified profiles may contain detailed personal information such as name, date of birth, location, and email address. As a profile grows, it becomes a robust repository of personal information, identification information, contact details, and communication preferences for an individual.",
  "definitions": {
    "profile": {
      "properties": {
        "xdm": {
          "title": req.body.titleXmd,
          "description": req.body.descriptionXmd,//"Unique identifier of Person/Profile fragment.",
          "type": req.body.type
        }
      }
    }
  },
  "allOf": [
    {
      "$ref": `#/definitions/${req.body.schemaName}`
    }
  ],
  "meta:status": req.body.metaStatus
  // res.send(req.body)
  }
  
}

let jsonData = {}
let metaAbstract = false 
   
app.post('/getData' , (req, res) => {
    // res.set('Content-Type', 'application/json')
    if (req.body.schemaType === "class" || req.body.schemaType === "mixin"){
      metaAbstract = true
    }else{
      metaAbstract = false
    }
    jsonData = dataObject(req , metaAbstract)
     
    console.log(
      req.body.schemaType
    );
    if (req.body.schemaType === "class"){
      jsonData["meta:extends"] =[ `https://ns.genesis.com/xdm/data/${req.body.behaviour}`] 
      // "https://ns.genesis.com/xdm/common/auditable" ];
    }
    if (req.body.schemaType === "mixin"){
      jsonData["meta:intendedToExtend"] =[ `https://ns.adobe.com/xdm/classes/${req.body.className}`] 
      // "https://ns.genesis.com/xdm/common/auditable" ];
    }
    
    res.send(res.json(jsonData))
    
  // res.json(jsonData)
})
// router(app);

// Server Setup
const port = process.env.PORT || 5000;
let server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
