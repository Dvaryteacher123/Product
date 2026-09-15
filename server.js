// ================== CLOTHING STORE - SERVER KUU ==================
// Express server inayowasha mfumo mzima na kuunganisha routes

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ================== VIEW ENGINE ==================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ================== MIDDLEWARE ==================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ================== SESSION ==================
app.use(session({
    secret: process.env.SESSION_SECRET || 'clothing-store-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // Siku 7
        httpOnly: true,
        secure: false // Weka true kama unatumia HTTPS
    }
}));

// ================== GLOBAL VARIABLES (kwa EJS) ==================
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.cartCount = req.session.cartCount || 0;
    res.locals.currentPage = '';
    next();
});

// ================== ROUTES ==================
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', adminRoutes);

// ================== 404 HANDLER ==================
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="sw">
        <head>
            <meta charset="UTF-8">
            <title>404 - Ukurasa Haupatikani</title>
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background: #f9fafb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    text-align: center;
                    padding: 20px;
                }
                .box {
                    max-width: 500px;
                    background: white;
                    padding: 50px 30px;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                }
                h1 {
                    font-size: 80px;
                    color: #ff6b00;
                    margin: 0 0 10px;
                    font-weight: 800;
                }
                h2 { color: #111827; margin-bottom: 10px; }
                p { color: #6b7280; margin-bottom: 25px; }
                a {
                    display: inline-block;
                    padding: 12px 26px;
                    background: #ff6b00;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 700;
                }
                a:hover { background: #e55f00; }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>404</h1>
                <h2>Ukurasa Haupatikani</h2>
                <p>Samahani, ukurasa ulioitafuta haupo kwenye mfumo wetu.</p>
                <a href="/">🏠 Rudi Nyumbani</a>
            </div>
        </body>
        </html>
    `);
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).send(`
        <!DOCTYPE html>
        <html lang="sw">
        <head>
            <meta charset="UTF-8">
            <title>500 - Hitilafu ya Server</title>
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background: #f9fafb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                }
                .box {
                    max-width: 550px;
                    background: white;
                    padding: 50px 30px;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                    text-align: center;
                }
                h1 { font-size: 70px; color: #ef4444; margin: 0 0 10px; }
                h2 { color: #111827; margin-bottom: 10px; }
                p { color: #6b7280; margin-bottom: 25px; }
                pre {
                    background: #f3f4f6;
                    padding: 14px;
                    border-radius: 8px;
                    text-align: left;
                    font-size: 12.5px;
                    overflow-x: auto;
                    color: #991b1b;
                    margin-bottom: 20px;
                }
                a {
                    display: inline-block;
                    padding: 12px 26px;
                    background: #ff6b00;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 700;
                }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>500</h1>
                <h2>Hitilafu ya Server</h2>
                <p>Samahani, kuna hitilafu iliyotokea. Tafadhali jaribu tena.</p>
                ${process.env.NODE_ENV === 'development'
                    ? `<pre>${err.stack || err.message}</pre>`
                    : ''}
                <a href="/">🏠 Rudi Nyumbani</a>
            </div>
        </body>
        </html>
    `);
});

// ================== START SERVER ==================
app.listen(PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('  👕 CLOTHING STORE - SERVER IMEWASHWA');
    console.log('═══════════════════════════════════════════');
    console.log(`  🌐 URL:      http://localhost:${PORT}`);
    console.log(`  🔥 Firebase: product-store-6a651`);
    console.log(`  📦 Mode:     ${process.env.NODE_ENV || 'development'}`);
    console.log('═══════════════════════════════════════════');
    console.log('');
});

// ================== GRACEFUL SHUTDOWN ==================
process.on('SIGINT', () => {
    console.log('\n🛑 Server inazimwa...');
    process.exit(0);
});

module.exports = app;
