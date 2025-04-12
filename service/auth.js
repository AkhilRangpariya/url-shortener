const sessionIdToUserMap = new Map();

// for state-full storage of data   
function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id, user) {
    return sessionIdToUserMap.get(id);
}

module.exports = { setUser, getUser };
