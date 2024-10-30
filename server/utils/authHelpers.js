const jwt = require('jsonwebtoken');
const secretKey = 'gizliAnahtar';

// Token oluşturma işlevi
function generateToken(user) {
    const payload = {
        id: user.customer_id || user.seller_id,
        role: user.customer_id ? 'customer' : 'seller',
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Token doğrulama için middleware
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token gerekli' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Geçersiz token' });
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };
