import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });

getFirestore().collection('users').get().then(snap => {
  snap.forEach(doc => {
    console.log("Firestore User:", doc.id, doc.data().email);
  });
}).catch(e => console.error(e));
