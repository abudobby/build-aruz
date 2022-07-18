import { session } from '../../config/database.js';
import { writeResponse, writeError } from '../../helpers/response.js'
import _ from 'lodash'
import { create, getAll, getOne, details } from '../models/places.js';
import Place from '../models/neo4j/place.js';


export function addDetails(req, res, next) {
  details(session(req),req)
    .then(response => writeResponse(res, response))
    .catch(next);
}

export function createPlace(req, res, next) {
    create(session(req),req.body)
      .then(response => writeResponse(res, response))
      .catch(next);
  }

  export function places(req, res, next) {
    getAll(session(req), req.query)
    .then(response => {
      return writeResponse(res, response._fields[0].map(p => new Place(p)))
    })
    .catch(next);
  }