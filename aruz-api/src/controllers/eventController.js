// import { session } from '../../config/database.js';
import { writeResponse, writeError } from '../../helpers/response.js'
import { pool } from '../../config/database.js';
import _ from 'lodash'
import Event from '../models/event.js';
import Invite from '../models/invite.js';
import Model from '../models/model.js';
import { nanoid } from 'nanoid'

let eventsData = [
  {eventID: "9G239h34hgfh", description: "Start planning on travel to canada. The events will be in located in Missussage and Bramtom area so hotels around that area will be ideal", name: "Check-in", date: "2022-08-04T18:00:00Z" }, 
  {eventID: "9G239h34hgfh", description: "The nikkah will take place Jamee Masshid in Maussauge. Please be sure to be on time as Jumma will begin shortly after the nikkah. if you get here early, you will have time to take some  photos of this stunning masjid", name: "Nikkah", date: "2022-08-05T15:00:00Z", location: {display: "Jame Masjid Mississauga", latitude: 43.6323259, longitude: -79.6578244} }, 
  {eventID: "KG239h34hgfh", description: "This will be a seat reception with everyone a seating chart. Please refer to your digital invitation on where your seat is located", name: "Reception", date: "2022-08-04T20:00:00Z", location: {display: "1224 Dundas St. E",  latitude: 43.6046727, longitude: -79.5879922}}
]

const invitesModel = new Model('invites');
const eventsModel = new Model('events');

  export const createInvite = async (req, res) => {
    const { firstName, lastName } = req.body;
    const columns = 'first_name, last_name, invite_code, authenticated, going, rsvp, user_id, occasion_id';
    const values = `'${firstName}', '${lastName}', '${nanoid(5)}', false, false, false, 2, 1 `;
    try {
      const data = await invitesModel.insertWithReturn(columns, values);
      writeResponse(res, new Invite(data.rows[0]))
    } catch (err) {
      res.status(503).json({ messages: err.stack });
    }
  };

  export const invites = async (req, res) => {
    try {
      const data = await invitesModel.select('*');
      writeResponse(res, data.rows.map(i=> new Invite(i)))
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  };

  export const events = async (req, res) => {
    try {
      const data = await eventsModel.select(`*`, ` ORDER BY date ASC`);
      writeResponse(res, data.rows.map(e=> new Event(e)))
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  };


  export const rsvp = async (req, res) => {
    const { rsvp } = req.body;
    const { inviteCode } = req.params;

    try {
      const data = await invitesModel.updateWithReturn(rsvp, inviteCode)
      writeResponse(res, new Invite(data.rows[0]))
    } catch (err) {
      res.status(503).json({ messages: err.stack });
    }
  };

  export const find = async (req, res) => {
    try {
      const data = await invitesModel.select(`*`, ` WHERE invite_code = '${req.params.inviteCode}'`);
      if(data.rowCount == 0){
        writeError(res, 404, 'Invite not found')
      } else {
        writeResponse(res, new Invite(data.rows[0]))
      }
    } catch (err) {
       writeError(res, 503, err)
    }
  };