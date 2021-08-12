document.addEventListener('DOMContentLoaded', () => {
var monsterNum = 50;
const monstrContainer = document.querySelector('#monster-container')
const createMonstr = document.querySelector('#create-monster')
const forwardButton = document.querySelector('#forward');
const backButton = document.querySelector('#back');

const getData = (monsterNum) => {
    fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(data => renderData(data, monsterNum))

}


const renderData = (data, monsterNum) => {
    console.log(data)
    let monstrList = document.createElement('ul')
    
    for (let i = 0; i < monsterNum && i < data.length; i++) {
        let monstr = data[i]
        let monstrPost = document.createElement('li')

        monstrPost.innerHTML = `<b>Name:</b> ${monstr.name} <br/><br/> <b>Age:</b> ${monstr.age} <br/><br/> <b>Description:</b> ${monstr.description}<br/><br/><br/>`
        
        
        monstrList.appendChild(monstrPost)
    }
    monstrContainer.appendChild(monstrList)
}
let monsterCreator = () =>{
    let monstrCreateForm = document.createElement('form')
    monstrCreateForm.setAttribute('id', 'monstr-form')
    
    let monstrName = document.createElement('input')
    monstrName.setAttribute('id', 'monstr-name')
    monstrName.setAttribute('placeholder', 'Name')
    
    let monstrAge = document.createElement('input')
    monstrAge.setAttribute('id', 'monstr-age')
    monstrAge.setAttribute('placeholder', 'Age')
    
    let monstrDesc = document.createElement('input')
    monstrDesc.setAttribute('id', 'monstr-desc')
    monstrDesc.setAttribute('placeholder', 'Description')

    let submit = document.createElement('button')
    submit.setAttribute('id', 'submit-button')
    submit.innerHTML = 'create'


    monstrCreateForm.appendChild(monstrName)
    monstrCreateForm.appendChild(monstrAge)
    monstrCreateForm.appendChild(monstrDesc)
    monstrCreateForm.appendChild(submit)

    createMonstr.appendChild(monstrCreateForm)

    monstrCreateForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addNewMonstr(monstrName.value, monstrAge.value, monstrDesc.value)
        monstrCreateForm.reset()
    })
}
let addNewMonstr = (name, age, desc) => {
   fetch('http://localhost:3000/monsters', {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           'name': name,
           'age': age,
           'description': desc
       })
   })
   let success = document.createElement('p');

   success.innerHTML = `${name} was created and stored!`
   success.style.background = 'green'
   success.style.color = 'white';
   success.style.fontSize = '30px';
   success.style.textAlign = 'center';
   createMonstr.appendChild(success)
   setTimeout(()=> {createMonstr.removeChild(success)}, 3000)
}
monsterCreator()
getData(monsterNum)

forwardButton.addEventListener('click', () =>{
    monsterNum += 50;
    console.log(monsterNum)
    monstrContainer.innerHTML = ''
    getData(monsterNum)
})
backButton.addEventListener('click', () =>{
    if (monsterNum >= 100) {
        monsterNum -= 50;
        console.log(monsterNum)
        monstrContainer.innerHTML = ''
        getData(monsterNum)
    } else {
        alert('Cannot have less than 50 monsters')
    }
    
    
})


})