import { events, invites, find, rsvp, createInvite } from '../controllers/eventController.js'



export default (server) => {

  server.get('/api', (req, res) => {
    res.send('Aruz API')
  })

  // EVENt ROUTES
  server.get(`/api/events`, events);

  // INVITE ROUTES
  server.get(`/api/invites`, invites);
  server.post(`/api/invites`, createInvite);
  server.get(`/api/invites/:inviteCode`, find);
  server.put(`/api/invites/:inviteCode`, rsvp);
}