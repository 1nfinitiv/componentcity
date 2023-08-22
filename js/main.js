$('.message a').click(function(){
    $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
});
axios.defaults.baseURL = 'http://127.0.0.1:8000'
let botton = document.querySelector('#click')

// register
const addNewUser = async (newUser) => {
    try {
        const response = await axios.post('/users', newUser)
        return response.data
    } catch (err) {
        console.error(err.toJSON())
    }
}
botton.addEventListener('click', function(){
    console.log('work')
    let password = document.querySelector('#password').value
    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    addNewUser({User_name:name, User_password:password, Email_adress:email})
})