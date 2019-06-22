const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "key",
  mongoUri: process.env.MONGODB_URI || "mongodb://ania:ania1994@ds042459.mlab.com:42459/ania"

};

export default config
