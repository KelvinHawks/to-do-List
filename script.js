//select items
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

//edit option
let editElement
let editFlag = false
let editID = ""

//clear item

 clearBtn.addEventListener('click', clearItems)

form.addEventListener('submit', addItem)

window.addEventListener('DOMContentLoaded', setUpItems)

function addItem(e){
    e.preventDefault()

    const value = grocery.value
    const id = new Date().getTime().toString()
   if(value && editFlag === false){
    createListItems(id, value)
    displayAlert('Item added to the list', 'success')
    container.classList.add('show-container')

    addToLocalStorage(id, value)

    setBackToDefault()

   }else if(value && editFlag){
    editElement.innerHTML = value
    displayAlert('value changed', 'succcess')
    editLocalStorage(editID, value)
    setBackToDefault()
   }else{
    displayAlert('Please enter value', 'danger')
   }
}

function displayAlert(text, action){
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

function setBackToDefault(){
    form.reset()
    editFlag = false
    editID = ''
    submitBtn.textContent = 'submit'
}

function clearItems(){
    const items = document.querySelectorAll('.grocery-items')

    if(items.length > 0){
       items.forEach(function(item){
        list.removeChild(item)
       })
    }
    container.classList.remove('show-container')
    displayAlert('empty list', 'danger')
    setBackToDefault()
    localStorage.removeItem('list')
}

//delete element
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if(list.children.length === 0){
        container.classList.remove('show-container')
    }
    displayAlert('Item removed', 'danger')
    

    setBackToDefault()

    removeLocalStorage(id)

}

// edit item

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    grocery.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = "edit"
    //setBackToDefault()
}


// local Storage

function addToLocalStorage(id, value){
    const grocery = {id,value}
    let items = getLocalStorage()

    items.push(grocery)
    localStorage.setItem('list', JSON.stringify([items]))
    
}
function removeLocalStorage(id){
    let items = getLocalStorage()
    items = items.filter(function(item){
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(items))
}
function editLocalStorage(id, value){
    let items = getLocalStorage()
    items = items.map(function(item){
        if(item.id === id){
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))
}
function getLocalStorage(){
    return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')) :[]
}
//show items
function setUpItems(){
    let items = getLocalStorage()
    if(items.length > 0){
        items.forEach(function(item){
            createListItems(item.id, item.value)
        })
    }
    container.classList.add('show-container')
}
// localStorage.setItem('classmates', JSON.stringify(['kelvin', 'johnson', 'chris']))
// const classmates = JSON.parse(localStorage.getItem('classmates'))

//localStorage.removeItem('list')
// console.log(classmates);

function createListItems(id, value){
    const element = document.createElement('article')
    element.classList.add('grocery-items')

    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button class="edit-btn">
            <i class="fa-sharp fa-solid fa-pen-to-square edit"></i>
        </button>
        <button class="delete-btn">
            <i class="fa-solid fa-trash trash"></i>
        </button>
    </div>`

    // delete btn
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)

    list.appendChild(element)
}















