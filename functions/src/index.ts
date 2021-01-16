import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

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
