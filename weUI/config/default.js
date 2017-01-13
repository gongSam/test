module.exports = {
  port:3000,
  session: {
    secret: 'myweb',
    key: 'myweb',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myweb'
};
