// ================== INDEX ROUTES ==================
// Njia zote za mbele: Home, Shop, Product, Cart, Checkout, About, Contact

const express = require('express');
const router = express.Router();

// ================== HOME PAGE ==================
router.get('/', (req, res) => {
    res.render('shop/index', {
        title: 'Nyumbani',
        currentPage: 'home',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0,
        searchQuery: ''
    });
});

// ================== SHOP PAGE ==================
router.get('/shop', (req, res) => {
    const search = (req.query.search || '').trim();
    const category = (req.query.category || '').trim();

    res.render('shop/shop', {
        title: 'Duka',
        currentPage: 'shop',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0,
        searchQuery: search,
        categoryQuery: category
    });
});

// ================== PRODUCT DETAIL ==================
router.get('/product/:id', (req, res) => {
    const productId = req.params.id;

    res.render('shop/product-detail', {
        title: 'Bidhaa',
        currentPage: 'shop',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0,
        productId: productId
    });
});

// ================== CART PAGE ==================
router.get('/cart', (req, res) => {
    res.render('shop/cart', {
        title: 'Kikapu Changu',
        currentPage: 'cart',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0
    });
});

// ================== CHECKOUT PAGE ==================
router.get('/checkout', (req, res) => {
    res.render('shop/checkout', {
        title: 'Kuweka Oda',
        currentPage: 'checkout',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0
    });
});

// ================== ABOUT PAGE ==================
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'Kuhusu Sisi',
        currentPage: 'about',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0
    });
});

// ================== CONTACT PAGE ==================
router.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Wasiliana Nasi',
        currentPage: 'contact',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0
    });
});

// ================== 404 HANDLER (kwa mbele) ==================
router.use((req, res) => {
    res.status(404).render('pages/contact', {
        title: 'Ukurasa Haupatikani',
        currentPage: '404',
        user: req.session.user || null,
        cartCount: req.session.cartCount || 0
    });
});

// ================== EXPORT ==================
module.exports = router;
