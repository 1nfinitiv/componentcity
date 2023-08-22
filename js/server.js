const jwt = require('jsonwebtoken')
JWT_ACCESS_SECRET = 'jwt-service-neg_1'
JWT_REFRESH_SECRET = 'jwt-service-pid_22'
const fastify = require('fastify')({
  logger: true
})

const { Pool } = require('pg');
const pool = new Pool({
  host : '127.0.0.1',
  database : 'component',
  user : 'postgres',
  password : '123456789',
  port : 5432
});
fastify.register(require('@fastify/cors'), { origin: '*' });

fastify.post('/users', async (request, reply)=>{
  try {
    const user_table = request.body
    const user_login = user_table['Username']
    const examination = ('SELECT user_login FROM users')
    for (let i of examination){
      if(i === user_login){
        reply.send({examination: 'GOOD'})}
      else{
        reply.send({examination: 'BAD'})
      }
    }
    console.log(request.body)
    let payload
    payload = request.body
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn:'30m'})
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn:'30d'})
    pool.query('INSERT into i_users (access_token, refresh_token ) VALUES ($1,$2)', [accessToken, refreshToken])
    reply.send('user was created')

  }catch (err){
    console.log(err)
  }

})
//infa s servera


// fastify.get('/item/:item_nomber', async (request, reply) => {
//   const resultev = await pool.query('SELECT * FROM I_categories');

//   const result = await pool.query('SELECT * FROM I_item WHERE id = $1',[request.params.item_nomber]);
//   reply.send({categories:resultev.rows, item:result.rows})
// })



// fastify.get('/token/:tokens_nomber', async (request, reply) => {
//   // const token = await pool.query('SELECT * FROM I_users WHERE id = $1',[request.params.tokens_nomber]);
//   const user_token = await pool.query ('SELECT access_token, refresh_token FROM i_users');
//
//   for (i of user_token){
//     if (refreshToken === i.refresh_token){
//       i.access_token = accessToken
//     }
//     else{
//       fastify.get('/token/:registration',async (request, reply) => {
//         reply.send({registration:2})
//       })
//     }
//   }
//   reply.send({users:user_token.rows})
// })

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
