import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios from 'axios';

const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
}

admin.initializeApp()

export const makeUser = functions.https.onRequest(async (_req, res): Promise<void> => {
  const token = random()
  const writeResult = await admin.firestore().collection('users').add({ token });
  res.json({ id: writeResult.id, token })
  return
})

export const makeEstablishment = functions.https.onRequest(async (req, res): Promise<void> => {
  const name = req.query.name;
  if (!name) {
    res.status(400)
  }
  const token = random()
  const { lat, lng } = (await axios({
    "method": "GET",
    "url": "https://maps.googleapis.com/maps/api/geocode/json",
    "params": {
      "address": name,
      "key": functions.config().geocode?.key
    }
  })).data?.results?.[0]?.geometry?.location
  await admin.firestore().collection('establishments').add({
    token,
    name,
    lat,
    lng 
  });
  res.send('OK')
  return
})
