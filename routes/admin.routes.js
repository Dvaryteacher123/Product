// ================== ADMIN ROUTES ==================
// Njia zote za Admin Panel — zinalindwa na requireAdmin

const express = require('express');
const router = express.Router();
const { requireAdmin } = require('./auth.routes');

// ================== ADMIN GUARD ==================
// Kila route hapa inahitaji admin aliyeingia
router.use(requireAdmin);

// ================== DASHBOARD ==================
router.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'Dashibodi - Admin',
        currentPage: 'admin',
        adminPage: 'dashboard',
        admin: req.session.user,
        user: req.session.user,
        cartCount: req.session.cartCount || 0,
        newOrders: 0
    });
});

// ================== PRODUCTS ==================
router.get('/admin/products', (req, res) => {
    res.render('admin/products', {
        title: 'Bidhaa - Admin',
        currentPage: 'admin',
        adminPage: 'products',
        admin: req.session.user,
        user: req.session.user,
        cartCount: req.session.cartCount || 0,
        newOrders: 0
    });
});

// ================== ORDERS ==================
router.get('/admin/orders', (req, res) => {
    res.render('admin/orders', {
        title: 'Oda - Admin',
        currentPage: 'admin',
        adminPage: 'orders',
        admin: req.session.user,
        user: req.session.user,
        cartCount: req.session.cartCount || 0,
        newOrders: 0
    });
});

// ================== CUSTOMERS ==================
router.get('/admin/customers', (req, res) => {
    res.render('admin/customers', {
        title: 'Wateja - Admin',
        currentPage: 'admin',
        adminPage: 'customers',
        admin: req.session.user,
        user: req.session.user,
        cartCount: req.session.cartCount || 0,
        newOrders: 0
    });
});

// ================== CATEGORIES ==================
router.get('/admin/categories', (req, res) => {
    res.render('admin/categories', {
        title: 'Aina za Nguo - Admin',
        currentPage: 'admin',
        adminPage: 'categories',
        admin: req.session.user,
        user: req.session.user,
        cartCount: req.session.cartCount || 0,
        newOrders: 0
    });
});

// ================== SETTINGS ==================
router.get('/admin/settings', (req, res) => {
    res.render('admin/settings', {
        title: 'Mipangilio - Admin',
        currentPage: 'admin',
        adminPage: 'settings',
        admin: req.session.user,
        user: req.session.user,
        cartCount: req.session.cartCount || 0,
        newOrders: 0
    });
});

// ================== EXPORT ==================
module.exports = router;
