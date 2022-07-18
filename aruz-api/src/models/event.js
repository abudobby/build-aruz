// extracts just the data from the query results
import _ from 'lodash'

export default function Event(data) {
  _.extend(this, {
    'id': data.id,
    'name': data.name,
    'description': data.description,
    'date': data.date,
    'location': (data.latitude ? {display: data.location, latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude)} : null)
  });
};
