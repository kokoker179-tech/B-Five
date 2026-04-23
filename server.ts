import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'service-account.json'), 'utf-8'));
initializeApp({
  credential: cert(serviceAccount)
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json()); // Need to parse JSON bodies
  const PORT = 3000;

  // Admin route to update password
  app.post('/api/admin/change-password', async (req, res) => {
    const { email, newPassword, adminSecret } = req.body;
    
    // Simple secret check (should be more secure in real production)
    if (adminSecret !== 'kerolos1122') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!email) {
      return res.status(400).json({ error: 'البريد الإلكتروني للعميل غير متوفر.' });
    }

    try {
      const userRecord = await getAuth().getUserByEmail(email.trim());
      await getAuth().updateUser(userRecord.uid, {
        password: newPassword
      });
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error: any) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({ error: 'هذا الحساب محذوف من خوادم المصادقة (Auth).' });
      }
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback to avoid DEV 404 pages
    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexHtmlPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

  } else {
    // Production static file serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
