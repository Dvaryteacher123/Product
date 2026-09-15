// ================== AUTH ROUTES ==================
// Njia za Login, Signup, Logout

const express = require('express');
const router = express.Router();

// ================== AUTH PAGE (Login / Signup) ==================
router.get('/auth', (req, res) => {
    // Kama mtumiaji ameingia tayari, mpeleke nyumbani
    if (req.session.user) {
        return res.redirect('/');
    }

    res.render('auth/login-signup', {
        title: 'Ingia / Jisajili',
        currentPage: 'auth',
        user: null,
        cartCount: req.session.cartCount || 0
    });
});

// ================== SET SESSION AFTER FIREBASE LOGIN ==================
// Firebase inafanya authentication kwenye browser.
// Baada ya kufanikiwa, browser inatuma taarifa hapa ili kuhifadhi kwenye session.
router.post('/auth/session', (req, res) => {
    try {
        const { uid, email, name, role } = req.body;

        if (!uid || !email) {
            return res.status(400).json({
                success: false,
                message: 'Taarifa hazijakamilika'
            });
        }

        // Hifadhi kwenye session
        req.session.user = {
            uid,
            email,
            name: name || 'Mtumiaji',
            role: role || 'customer'
        };

        res.json({
            success: true,
            message: 'Session imehifadhiwa',
            user: req.session.user
        });

    } catch (err) {
        console.error('Session error:', err);
        res.status(500).json({
            success: false,
            message: 'Hitilafu ya server'
        });
    }
});

// ================== GET CURRENT USER ==================
router.get('/auth/me', (req, res) => {
    if (req.session.user) {
        return res.json({
            loggedIn: true,
            user: req.session.user
        });
    }
    res.json({
        loggedIn: false,
        user: null
    });
});

// ================== LOGOUT ==================
router.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

// ================== ADMIN GUARD ==================
// Middleware ya kulinda routes za admin — itatumika kwenye admin.routes.js
function requireAdmin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/auth');
    }
    if (req.session.user.role !== 'admin') {
        return res.status(403).render('pages/contact', {
            title: 'Hairuhusiwi',
            currentPage: '403',
            user: req.session.user,
            cartCount: req.session.cartCount || 0
        });
    }
    next();
}

// ================== CUSTOMER GUARD ==================
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/auth');
    }
    next();
}

// ================== EXPORT ==================
module.exports = router;
module.exports.requireAdmin = requireAdmin;
module.exports.requireAuth = requireAuth;
