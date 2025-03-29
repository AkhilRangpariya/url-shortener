const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.find({ email, password });
    if (!user) {
        // return res.status(204).
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }

    // create uniq session id & store in map wit user & res as cookies set 
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookies("uid", sessionId);
    return res.redirect("/");

}
module.exports = {
    handleUserSignup,
    handleUserLogin,
};
