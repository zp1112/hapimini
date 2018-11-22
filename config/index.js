const { env } = process;

module.exports = {
  host: env.HOST,
  port: env.PORT,  
  jwtSecret: env.JWT_SECRET,
  wxAppid: env.WX_APPID,
  wxSecret: env.WX_SECRET
}