import jwt from 'jsonwebtoken';

const SECRET_KEY = 'meu_sergredo';

export default function authenticateAdminToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        }

        if (user.eAdmin != 1) {
            return res.status(403).json({ error: 'Acesso negado.' });
        }

        req.user = user;
        next();
    });
}