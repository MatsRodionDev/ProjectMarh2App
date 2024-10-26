const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.roles)) {
            return res.sendStatus(403); 
        }
        next();
    };
};

export default authorizeRoles;