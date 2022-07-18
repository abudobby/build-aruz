// extracts just the data from the query results
import _ from 'lodash'

export default function Invite(data) {
  _.extend(this, {
    'id': data.id,
    'first_name': data.first_name,
    'last_name': data.last_name,
    'inviteCode': data.invite_code,
    'going': data.going,
    'authenticated': data.authenticated,
    'rsvp': data.rsvp
    });
};
