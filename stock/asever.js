const { name } = require("ejs");

const about = document.querySelector('square_box');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let phone = document.getElementById('phone');
let tellus = document.getElementById('tellus');

about.addEventListener('submit',(e)=>{
    e.preventDefault();

    let formData ={
        name: name.value,
        email: email.value,
        subject: subject.value,
        tellus: tellus.value,
        phone: phone.value

    }

    console.log(formData)
})