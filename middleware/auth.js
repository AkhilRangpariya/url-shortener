const { getUser } = require("../service/auth");

// AUTHENTICATION only 
function checkForAuthentication(req, res, next){
    // const authorizationHeaderVale = req.headers['authorization'];
    const tokenCookie = req.cookies?.token;

    
    req.user = null;
    // if(!authorizationHeaderVale || !authorizationHeaderVale.startsWith('Bearer ')) next();
    if(!tokenCookie) return next();

    // const token = authorizationHeaderVale.split('Bearer ')[1];
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    next();
}

// AUTHORIZATION specific access to specific user only
function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("./login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        // res.redirect("./login");
        return next();
    }
}

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
// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.header['authorization'];
//     if (!userUid) res.redirect("/login");

//     const token = userUid.split('Bearer ')[1];
//     const user = getUser(token);
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// using cookies
// async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.id;
//     // just partially check the user are loin or not
//     const user = getUser(userUid);
//     req.user = user;
//     next();
// }

// using header
// async function checkAuth(req, res, next){
//     const userUid = req.header['authorization'];
//     const token = userUid.split('Bearer ')[1];
//     const user = getUser(token);

//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
    // restrictToLoggedinUserOnly,
    // checkAuth,
}