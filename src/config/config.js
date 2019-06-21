const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "key",
  mongoUri: process.env.MONGODB_URI || "mongodb://test:040993jrula@ds145563.mlab.com:45563/todoapp"

};

export default config
