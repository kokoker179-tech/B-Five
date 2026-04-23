import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });

getAuth().listUsers(10).then(res => {
  console.log("Users:", res.users.map(u => ({ email: u.email, providers: u.providerData.map(p => p.providerId) })));
}).catch(e => console.error(e));
