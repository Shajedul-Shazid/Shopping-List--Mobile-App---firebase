import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-344ad-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "todo")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value  
    push(moviesInDB, inputValue)    
    clearInputField()    
})

onValue(moviesInDB, function(snapshot) {
    let itemsArray = Object.values( snapshot.val() )
     
    shoppingListEl.innerHTML = ""

    for( let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        addShoppingListEl(currentItem)
    } 

})

function clearInputField() {
    inputFieldEl.value = ""
}

function addShoppingListEl(itemValue) {
    shoppingListEl.innerHTML +=`<li> ${itemValue} </li>`
}
