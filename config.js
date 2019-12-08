
let keys;

console.log('process.env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    keys = require('./key');
}

module.exports = {
    iam_access_id: keys.iam_access_id || process.env.IAM_ACCESS,
    iam_secret: keys.iam_secret || process.env.IAM_SECRET,
    dbUrl: keys.dbUrl || process.env.DB_URL,
    dbUser: keys.dbUser || process.env.DB_USER,
    dbPassword: keys.dbPassword || process.env.DB_PASSWORD,
    authUser: keys.authUser || process.env.AUTH_USER,
    authPassword: keys.authPassword || process.env.AUTH_PASWORD
}; 