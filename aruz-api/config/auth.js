
import * as admin from 'firebase-admin';
import config from './admin-creds.js';


const app = admin.default.initializeApp({
    credential: admin.default.credential.cert(config)
});

export function validateAcessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        app
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            req.userId = uid
            next()
      })
      .catch((error) => {
          console.log(`invalid api token ${token}`)
          res.sendStatus(401);
        });
    }
    else {
        console.log("Please supply api key")

        res.sendStatus(401);
    }
}