import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });

getAuth().getUserByEmail('kokoker179@gmail.com').then(userRecord => {
  return getAuth().updateUser(userRecord.uid, { password: 'newpassword123' });
}).then(() => console.log('Successfully updated password'))
.catch(e => console.error('Error updating password:', e.message));
