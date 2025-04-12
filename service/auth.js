const sessionIdToUserMap = new Map();

const secret = "Akhil123@A"
// for state-full storage of data   
// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }
function setUser(id, user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        secret
    );
}

function getUser(id, user) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = { setUser, getUser };
