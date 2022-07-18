import { session } from '../../config/database.js'
import _ from 'lodash'
import Place from './neo4j/place.js';


export function details(session, req) {
  return session.writeTransaction(txc => txc.run('MATCH (p: Place {UID: $id}), (t: Type {name: $type}) MERGE (p)-[:HAS_TYPE]->(t) WITH p UNWIND $cuisines AS cuisine MERGE (c: Cuisine {name: cuisine}) MERGE (p)-[:HAS_CUISINE]->(c) WITH p UNWIND $vibes AS vibe MERGE (v: Vibe {name: vibe}) MERGE (p)-[:HAS_VIBE]->(v)',
    {
      id: req.body.id,
      type: req.body.type,
      cuisines: req.body.cuisines,
      vibes: req.body.vibes
    }
  )).then(results => {
    return true;
   }
  )
};

export function create(session, body) {
  return session.writeTransaction(txc => txc.run('MATCH (c: Category {name: $category}) MERGE(p: Place {UID: apoc.create.uuid(), name:$name, coordinates: Point( {latitude: toFloat($lat), longitude: toFloat($long)})}) MERGE (p)-[:IN_CATEGORY]->(c) return properties(p)',
    {
      category: body.category,
      name: body.name,
      lat: body.lat,
      long: body.long
    }
  )).then(results => {
    return new Place(results.records[0]);
  }
  )
};

export function getAll(session, query) {

  return session.readTransaction(txc =>
    txc.run('MATCH (p: Place) WHERE distance(p.coordinates, point({longitude:$longitude, latitude:$latitude})) <= 00.025 * 1000 return collect({UID: p.UID, name:p.name, latitude: p.coordinates.y, longitude: p.coordinates.x})',
      {
        latitude: parseFloat(query.latitude),
        longitude: parseFloat(query.longitude),
      })
  ).then(result => result.records[0]);
};

export function getOne(session, name) {
  return session.readTransaction(txc =>
    txc.run('MATCH (p: Place {name: $name}) return {UID: p.UID, name:p.name, latitude: p.coordinates.y, longitude: p.coordinates.x}',
      {
        name: name,
      })
  ).then(result => result.records[0]);
};

// return many people
function _manyPlaces(neo4jResult) {
  if (neo4jResult._fields[1] == 0) {
    return []
  }
  return neo4jResult._fields[0]
}



