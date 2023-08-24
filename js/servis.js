const jwt = require('jsonwebtoken')
JWT_ACCESS_SECRET = 'jwt-service-negr_1'
JWT_REFRESH_SECRET = 'jwt-service-pidr_22'
const fastify = require('fastify')({
    logger: true
})
const { Pool } = require('pg');
const pool = new Pool({
    host : '127.0.0.1',
    database : 'cars',
    user : 'postgres',
    password : '123456789',
    port : 5432
});
fastify.register(require('@fastify/cors'), { origin: '*' });
 fastify.post('/registration', async (request, reply) => {

     const body = request.body
     const email = pool.query('SELECT user_email FROM i_users')
     for (let i = 0; i < email.length; i++) {
         if (body['Email_adress'][i][i]!==email){
             const accessToken = jwt.sign(body, JWT_ACCESS_SECRET, {expiresIn:'30d'})
             pool.query('INSERT into i_users (user_name, access_token, user_login, user_password) VALUES($1,$2,$3,$4,$5)',[body['User_name'],accessToken,body['User_login'], body['User_password'] ])
         }


     else{
         reply.send({kosty:'vse bad'})
        }}
    })




// server start
const start = async () => {
    try {
        await fastify.listen({ port: 8000 })
    }
    catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
