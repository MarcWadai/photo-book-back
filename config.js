
let keys;

console.log('process.env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    keys = require('./key');
}

module.exports = {
    iam_access_id: (process.env.NODE_ENV !== 'production') ? keys.iam_access_id : process.env.IAM_ACCESS,
    iam_secret: (process.env.NODE_ENV !== 'production') ?keys.iam_secret || process.env.IAM_SECRET,
    dbUrl: (process.env.NODE_ENV !== 'production') ? keys.dbUrl : process.env.DB_URL,
    dbUser: (process.env.NODE_ENV !== 'production') ? keys.dbUser : process.env.DB_USER,
    dbPassword: (process.env.NODE_ENV !== 'production') ? keys.dbPassword : process.env.DB_PASSWORD,
    authUser: (process.env.NODE_ENV !== 'production') ? keys.authUser : process.env.AUTH_USER,
    authPassword: (process.env.NODE_ENV !== 'production') ? keys.authPassword : process.env.AUTH_PASWORD
}; 