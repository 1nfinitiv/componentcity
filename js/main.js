$('.message a').click(function(){
    $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
axios.defaults.baseURL = 'http://127.0.0.1:8000'
// let login = document.querySelector('.')
let botton = document.querySelector('#click')
let botton1 = document.querySelector('#click1')
// register

// const getRegister = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/${password}`)
//       const response1 = await axios.get(`http://127.0.0.1:8000/${name}`)
//       const response2 = await axios.get(`http://127.0.0.1:8000/${email}`)
//       return response.data, response1.data, response2.data
//     } catch (err) {
//       console.error(err.toJSON())
//     }
//   }

// botton.addEventListener('click', function(){
//     console.log('work')
//     let password = document.querySelector('#password').value
//     let name = document.querySelector('#name').value
//     let email = document.querySelector('#email').value
//     getRegister()
// })

// log in
const addNewUser = async (newUser) => {
    try {
      const response = await axios.post('/users', newUser)
      return response.data
    } catch (err) {
      console.error(err.toJSON())
    }
  }
botton1.addEventListener('click', function(){
    console.log('work')
    let password = document.querySelector('#password1').value
    let name = document.querySelector('#username').value
    addNewUser({Username:name, User_password:password})
})