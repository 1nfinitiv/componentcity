require('dotenv').config()
const nodemailer = require('nodemailer')
const transporter =  nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kostaykazunin@gmail.com',
    pass: 'suzeiputsxgounwu'
  }
})

let body

const jwt = require('jsonwebtoken')
JWT_ACCESS_SECRET = 'jwt-service-negr_1'
JWT_REFRESH_SECRET = 'jwt-service-pidr_22'
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

fastify.post('/registration', async (request, reply) => {
  try {
    body = request.body
    const email = await pool.query('SELECT user_email FROM i_users where user_email = $1', [body['Email_adress']])
    const login = await pool.query('SELECT user_name FROM i_users where user_name = $1', [body['User_name']])
    if (email.rows.length!==0) {
      reply.statusCode = 400;
      reply.send({id:'#email', message: 'Such email already exists', statusCode: 400})
    }
    if (login.rows.length!==0){
      reply.statusCode = 400
      reply.send({id:'#name', message: 'Such login already exists', statusCode: 400})
    }
    else {
      const body_login_code = request.body['Code_verification']
      const mailOptions = {
        from: 'kostaykazunin@gmail.com',
        to: body['Email_adress'],
        subject: 'Component-city',
        text: 'your individual code verification => ' + body_login_code
      }
      await transporter.sendMail(mailOptions, err => {
        console.log(err)

      })}
    }catch(err){
        console.log(err)
      }
    })
fastify.post('/login_id_number',async (request,reply) => {
  try {
    const body_id_number = request.body['Login_id']
    if (body_id_number === '1') {
      const accessToken = jwt.sign(body, JWT_ACCESS_SECRET, {expiresIn: '30d'})
      await pool.query('INSERT into "i_users" (user_name, access_token, user_email, user_password) VALUES($1,$2,$3,$4)', [body['User_name'], accessToken, body['Email_adress'], body['User_password']])
      reply.send({answer: 'User was created successful'})
    } else {
      reply.statusCode = 400;
      reply.send({message: 'User enter not verification code', statusCode: 400})
    }
  }catch (err){
    console.log(err)
  }
})

    // else {
    //   const accessToken = jwt.sign(body, JWT_ACCESS_SECRET, {expiresIn: '30d'})
    //   await pool.query('INSERT into "i_users" (user_name, access_token, user_email, user_password) VALUES($1,$2,$3,$4)', [body['User_name'], accessToken, body['Email_adress'], body['User_password']])
    //   reply.send({answer: 'User was created successful'})
    // }






fastify.post('/login', async (request, reply)=>{
  try{
    const body = request.body
    const login = await pool.query('SELECT user_email FROM i_users where user_name = $1 or user_email = $2', [body['User_name'], body['User_name']])
    console.log(login.rows)
    const password = await pool.query('SELECT user_password FROM i_users where user_name = $1 or user_email=$2', [body['User_name'],body['User_name']])
    console.log(password.rows)
    if (login.rows.length!==0){
      if (password.rows[0]['user_password']===body['User_password']){
        const token = await pool.query('SELECT access_token FROM i_users where user_name = $1 or user_email = $2', [body['User_name'],body['User_name']])
        reply.send({token:token.rows, answer:'You are logged in'})
      }
      else {
        reply.statusCode = 400;
        reply.send({message: 'User with this password or login does not exist', statusCode: 400 })
      }

    }
    else {
      reply.statusCode = 400;
      reply.send({message: 'User with this password or login does not exist', statusCode: 400 })
    }
  }catch (err){
    console.log(err)
  }
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

