const { csrfSync } = require('csrf-sync');
const {
    generateToken,
    csrfSynchronisedProtection
} = csrfSync({
    getTokenFromRequest: (req) => {
        return req.body._csrf
    }
});

module.exports = { generateToken, csrfSynchronisedProtection };