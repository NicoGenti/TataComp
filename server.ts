import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route for Telegram notifications (handling both /api/notify and /api/notify/)
  app.post(["/api/notify", "/api/notify/"], async (req, res) => {
    const { couponName } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    console.log(`Tentativo di invio notifica per: ${couponName}`);

    if (!token || !chatId) {
      console.warn("Configurazione Telegram mancante (TOKEN o CHAT_ID)");
      return res.json({ 
        success: false,
        error: "Configurazione Telegram mancante. Assicurati di aver impostato TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID nei segreti." 
      });
    }

    const text = `🎉 La tua ragazza ha appena riscattato il coupon: ${couponName}!`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(url, { method: "POST" });
      const errorData = await response.json();

      if (response.ok) {
        res.json({ success: true });
      } else {
        console.error("Telegram API error:", errorData);
        
        let errorMessage = "Errore nell'invio del messaggio Telegram.";
        if (errorData.error_code === 403) {
          errorMessage = "Il bot non può inviarti messaggi (Errore 403). Verifica che: 1) Il TELEGRAM_CHAT_ID sia il tuo ID NUMERICO (es. 12345678) e NON il tuo username. 2) Il token sia corretto e non abbia spazi extra all'inizio o alla fine. 3) Tu abbia effettivamente avviato il bot corretto su Telegram.";
        } else if (errorData.error_code === 400) {
          errorMessage = "Chat ID non valido o formato errato (Errore 400). Assicurati che sia solo un numero senza @ o lettere e che non ci siano spazi vuoti nei segreti.";
        }

        // Return 200 even on error to prevent proxy interception, but with success: false
        res.json({ 
          success: false, 
          error: errorMessage,
          details: errorData.description 
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      res.json({ success: false, error: "Errore interno del server durante l'invio." });
    }
  });

  // Catch-all for API routes to prevent HTML fallback
  app.all("/api/*", (req, res) => {
    res.json({ success: false, error: `API Route ${req.method} ${req.url} not found` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares as any);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
