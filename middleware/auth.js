const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.id;

    if (!userUid) return res.redirect("/login");

    const user = getUser(userUid);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.id;
    // just partially check the user are loin or not
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}