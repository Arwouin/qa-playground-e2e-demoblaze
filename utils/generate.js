function generateUser() {
    const time = Date.now();
    return {
        username: `user${time}`,
        password: `pass${time}`
    }
}

module.exports = { generateUser }