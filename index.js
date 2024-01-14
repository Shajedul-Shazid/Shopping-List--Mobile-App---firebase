import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    if(snapshot.exists()) {
        let itemsArray = Object.entries( snapshot.val() )     
        clearShoppoingListEl()

        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addShoppingListEl(currentItem)
        } 
    } else {
        shoppingListEl.innerHTML = "No items here ...yet"
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function clearShoppoingListEl() {
    shoppingListEl.innerHTML = ""
}

function addShoppingListEl(item) {
   let itemID = item[0]
   let itemValue = item[1]

   // shoppingListEl.innerHTML +=`<li> ${itemValue} </li>`

   let newEl = document.createElement("li")
   newEl.textContent = itemValue

//    delete item from database 

   newEl.addEventListener("click", function() {   
        let exactLocationInDB = ref(database, `todo/${itemID}`)  
        remove(exactLocationInDB)
   })

   shoppingListEl.append(newEl)

}




