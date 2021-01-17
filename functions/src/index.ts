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
  const { userId, establishmentToken } = req.query;
  const establishmentRef1 = (await admin.firestore().collection('establishments').where('token', '==', establishmentToken).get()).docs[0].ref
  await admin.firestore().collection('exchanges').add({
    establishmentRef: establishmentRef1.id,
    userRef: userId,
    date: new Date()
  });
  await establishmentRef1.update({ count: admin.firestore.FieldValue.increment(1) })
  res.send('OK')
  return
})

export const reportNEGATIVE = functions.https.onRequest(async (req, res): Promise<void> => {
  const { userId } = req.query;

  (await admin.firestore().doc(`/users/${userId}`).update({
    covid: false
  }))

  res.send('OK')

  return

})

export const reportPOSITIVE = functions.https.onRequest(async (req, res): Promise<void> => {
  const { userId } = req.query;

  (await admin.firestore().doc(`/users/${userId}`).update({
    covid: true
  }))

  res.send('OK')

  return

})

export const getRiskLevel = functions.https.onRequest(async (req, res): Promise<void> => {
  const { userId } = req.query;

  const currentUser: any = (await admin.firestore().doc(`/users/${userId}`).get()).data()

  if (currentUser.covid) {
    res.json({ degree: 0 })
    return
  }

  const checkedUserIds: any[] = []
  const checkedEstablishmentIds: any[] = []

  checkedUserIds.push(userId)

  const locationsToCheck = (await admin.firestore().collection('exchanges').where('userRef', '==', userId).get()).docs.map(location => {
    return {
      establishmentRef: location.data().establishmentRef,
      degree: 1
    }
  }) as any

  let marked = false

  while (locationsToCheck.length > 0 && !marked) {
    const { establishmentRef, degree } = locationsToCheck.shift()
    checkedEstablishmentIds.push(establishmentRef)
    await Promise.all(((await admin.firestore().collection('exchanges').where('establishmentRef', '==', establishmentRef).get()).docs.map(location => {
      return {
        userRef: location.data().userRef,
        degree
      }
    }).filter(location => {
      return checkedUserIds.findIndex(x => {
        return x === String(location.userRef)
      }) === -1
    })).map(async x => {
      checkedUserIds.push(x.userRef)
      const user: any = (await admin.firestore().doc(`/users/${x.userRef}`).get()).data()
      if (user.covid) {
        res.json({ degree })
        marked = true
      }
      if (degree < 3) {
        (await admin.firestore().collection('exchanges').where('userRef', '==', x.userRef).get()).docs.forEach(location => {
          const establishmentRef2 = location.data().establishmentRef
          const cond = checkedEstablishmentIds.findIndex(y => {
            return y === String(establishmentRef2)
          })
          if (cond === -1) {
            locationsToCheck.push(
              {
                establishmentRef: establishmentRef2,
                degree: degree + 1
              }
            )
          }
        })
      }
    }))
  }

  if (marked) return

  res.json({ degree: 4 })
  return
})
