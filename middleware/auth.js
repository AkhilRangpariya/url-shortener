const { getUser } = require("../service/auth");

// using cookies 
// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.cookies?.id;
//     if (!userUid) return res.redirect("/login");
//     const user = getUser(userUid);
//     if (!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }
// using header 
async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.header['authorization'];
    if (!userUid) res.redirect("/login");

    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

// using cookies
// async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.id;
//     // just partially check the user are loin or not
//     const user = getUser(userUid);
//     req.user = user;
//     next();
// }

// using header
async function checkAuth(req, res, next){
    const userUid = req.header['authorization'];
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}