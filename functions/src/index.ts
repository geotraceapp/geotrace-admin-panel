import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios from 'axios';

const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
}

admin.initializeApp()

export const makeUser = functions.https.onRequest(async (_req, res): Promise<void> => {
  const token = random()
  const writeResult = await admin.firestore().collection('users').add({ token, covid: false });
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
    lng,
    count: 0
  });
  res.send('OK')
  return
})

export const makeExchange = functions.https.onRequest(async (req, res): Promise<void> => {
  const { userId, userToken, establishmentToken } = req.query;
  const establishmentRef = (await admin.firestore().collection('establishments').where('token', '==', establishmentToken).get()).docs[0].ref
  const users = (await admin.firestore().collection('users').where('token', '==', userToken).get()).docs
  const userRef = users.find(user => {
    return user.id === userId
  })?.ref
  await admin.firestore().collection('exchanges').add({
    establishmentRef,
    userRef,
    date: new Date()
  });
  await establishmentRef.update({ count: admin.firestore.FieldValue.increment(1) })
  res.send('OK')
  return
})
