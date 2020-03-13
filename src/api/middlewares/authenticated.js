
const authenticated = (req, res, next) => {
    let userId = req.header('user_id');
    if (userId !== '1') {
        return res.status(403).json({
            ok: false,
            message: 'unnauthorized user',
            user: userId
        });
    }
    next();
}

module.exports = authenticated;