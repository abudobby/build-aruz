// var sw = require("swagger-node-express");
import _ from 'lodash'

export function writeResponse(res, response) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({data: response});
};

export function writeError(res, status, message) {
  res.setHeader('Content-Type', 'application/json');
  res.status(status).send({error: message});
};

