import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON & enabling CORS
  app.use(cors());
  app.use(express.json());

  // ==========================================
  // API Routes (Must be defined BEFORE Vite middleware)
  // ==========================================
  
  // Database instantiation
  const { createClient } = await import("@libsql/client");
  const dbUrl = process.env.TURSO_DATABASE_URL;
  const dbAuthToken = process.env.TURSO_AUTH_TOKEN;

  const db = (dbUrl && dbAuthToken) 
    ? createClient({ url: dbUrl, authToken: dbAuthToken })
    : {
        execute: async (stmt: any) => {
          console.warn("Turso client not configured server-side. Running dummy execute.", stmt);
          return { rows: [] };
        }
      };

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "RFX UI API Server is running." });
  });

  // Dummy Data for fallback
  const DUMMY_PRODUCTS = [
    { id: 1, title: 'Minimalist Portfolio Dev', slug: 'minimalist-portfolio', price: 4900, tags: ['React', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSFBjqw-i5jeJ4Bml6cFINu9iXDe7I1P5T3UMTWXvRrHB37gXs6Bauyd8hPxN4midBceZeXFQhMKwrAiIgZhjnLBEm5AtsAsA3g84MkstlzReNSbQfqKQW2xI0d_KhyvYyc0LdvlaMPOt2ph5to6tdQUZcJqBIZW3tQFSarOZ9IzeUpxb0_u9dPSIN3fBornbzANpljjLssAdorspbhFqqM5z0d0reYY3pRRMRmXpN3uz7gKEFL-KeM6Rph_GESmf9_RiJKU5wSbk' },
    { id: 2, title: 'Enterprise SaaS Admin', slug: 'enterprise-saas', price: 8900, tags: ['Next.js', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcA-wssBjm4ge7r8U5L5xVO_22aE_r0-ErbeCzznJitWtubh1nfDepJU0TizILO8mHMK5zndS5q-CnPglYegGkIU5vghAXiZKP6HylNSKPIY99rtVrhypvMxEM2p7DQILM7NMjIQD5xuCtichHkr7-8tXUcaTqczYmaWbB9SXtz2Yjt-AR5lXkiakMX4q1_YxTSuVIBcVcMt6ckSRYvQMb0AJPP3USY_DWlXjsAiKBScT-hwWTuAbZh7JbmjyoySGjraeBONcShuc' },
    { id: 3, title: 'Brutalist Agency Folio', slug: 'brutalist-agency', price: 3900, tags: ['Vue', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBakliY-YUWRGDQiz2ppccwfsWZb7yVCNjEM9rfJMHGiGA8HvcLwzEb6KzIwC2sPX8O5rpCyT3B1ga0UG785neT98FUwFF2BuSyT3e79tbNXimT0PxhtSW4QIBhhOiin65O8KG_j-d_lf6X449wrMI3BRVZKWpk2dS_Af3Q6E0l25TlZCcqGw-iQPDvyysDr6zG6WNlCmaSe7y-lh5zIcPcDVpD4AqJekBGLBIicz5OtWv2mLbxo0sJMoOX9C_ppZwsfCTo2Zmrttg' },
  ];

  app.get("/api/products", async (req, res) => {
    try {
      const result = await db.execute('SELECT * FROM products ORDER BY id DESC');
      res.json(result.rows.length > 0 ? result.rows : DUMMY_PRODUCTS);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      res.status(500).json({ error: "Failed to fetch products", data: DUMMY_PRODUCTS });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM products WHERE slug = ?',
        args: [req.params.slug]
      });
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        const fallback = DUMMY_PRODUCTS.find(p => p.slug === req.params.slug);
        if (fallback) res.json(fallback);
        else res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      const fallback = DUMMY_PRODUCTS.find(p => p.slug === req.params.slug);
      if (fallback) res.json(fallback);
      else res.status(404).json({ error: 'Product not found' });
    }
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { productId } = req.body;
      const amount = 4900; // Hardcoded or fetch from DB
      
      // Auto-generate 4 digit code
      const orderCode = `RFX-${Math.floor(1000 + Math.random() * 9000)}`;

      // Insert logic for DB here...
      try {
        await db.execute({
          sql: "INSERT INTO transactions (order_code, product_id, status, amount) VALUES (?, ?, 'PENDING', ?)",
          args: [orderCode, productId, amount]
        });
      } catch (err) {
        console.warn("DB not ready, skipping transaction insert in development.");
      }

      res.json({ orderCode, amount });
    } catch (error) {
      console.error("Checkout failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const result = await db.execute('SELECT * FROM articles ORDER BY id DESC');
      res.json(result.rows);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      res.status(500).json({ error: "Failed to fetch articles", data: [] });
    }
  });

  const JWT_SECRET = process.env.JWT_SECRET || "rfx-secret-dev-key";

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      // Dummy check
      if (email === "admin@rfx.ui" && password === "admin123") {
        const token = jwt.sign({ id: 1, role: "admin" }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_SECRET);

      // Return dashboard stats (Total Revenue, Transactions, etc.)
      res.json({
        stats: {
          totalRevenue: 245000,
          pendingTransactions: 2,
          successfulTransactions: 45
        },
        recentTransactions: [
          { id: 1, code: 'RFX-8821', product_id: 1, amount: 4900, status: 'PAID' },
          { id: 2, code: 'RFX-1033', product_id: 2, amount: 8900, status: 'PENDING' }
        ]
      });
    } catch (error) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  });

  // Saweria Webhook Listener (Implementation Phase 3)
  app.post("/api/webhooks/saweria", async (req, res) => {
    try {
      const payload = req.body;
      console.log("Saweria webhook received payload:", payload);
      
      // Expected payload format based on Saweria usually contains a 'message' field
      const message = payload.message || "";
      const match = message.match(/RFX-\d{4}/);
      
      if (!match) {
        console.warn("No order code found in webhook message.");
        return res.status(200).json({ received: true, status: "ignored_no_code" });
      }

      const orderCode = match[0];
      const amountReceived = parseInt(payload.amount); // total amount they paid

      console.log(`Webhook triggered for order: ${orderCode}, amount: ${amountReceived}`);

      try {
        const txResult = await db.execute({
          sql: 'SELECT * FROM transactions WHERE order_code = ? AND status = "PENDING"',
          args: [orderCode]
        });

        if (txResult.rows.length === 0) {
          console.warn(`Transaction ${orderCode} not found or already processed.`);
          return res.status(200).json({ received: true, status: "tx_not_found" });
        }

        const tx = txResult.rows[0];
        // Calculate amount + 5% roughly, or just validate they paid enough
        // If tx.amount is e.g. 4900, we expect they paid approx 4900 or more.
        if (amountReceived >= Number(tx.amount)) {
          // Success
          await db.execute({
            sql: 'UPDATE transactions SET status = "PAID" WHERE order_code = ?',
            args: [orderCode]
          });
          console.log(`Transaction ${orderCode} successfully marked as PAID.`);
        } else {
          console.warn(`Transaction ${orderCode} amount mismatch. Expected ${tx.amount}, got ${amountReceived}`);
        }
      } catch (dbError) {
        console.error("DB operations failed during webhook:", dbError);
      }

      res.status(200).json({ received: true, status: "processed" });
    } catch (error) {
      console.error("Webhook processing failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  // ==========================================
  // Vite Frontend Integration
  // ==========================================
  
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA Fallback for express 4.x
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
