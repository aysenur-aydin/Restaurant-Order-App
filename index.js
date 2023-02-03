import { menuArray } from './data.js'

const mealSection = document.getElementById('meal-section')
const preCheckout = document.getElementById('pre-checkout-section')
const modal = document.getElementById('modal')
const orderComplete = document.getElementById('order-complete')

const orderArray = []

document.addEventListener('click', function(e){
    // ADD BUTTON CLICK
    if (e.target.dataset.add){

        preCheckout.style.display = 'block'

        let alreadyAdded = addedMealObj(e.target.dataset.add)

        alreadyAdded.amount++
        
        if (!orderArray.includes(alreadyAdded)){

            orderArray.push(addedMealObj(e.target.dataset.add))

        }

        renderPreCheckout()

    } 
    // REMOVE BUTTON CLICK
    else if (e.target.dataset.remove) {
        
        let removedMeal = removedMealObj(e.target.dataset.remove)
        
        removedMeal.amount = 0

        let index = orderArray.indexOf(removedMeal)

        orderArray.splice(index, 1)
        
        renderPreCheckout()
    }
    // COMPLETE BUTTON CLICK
    else if (e.target.id === 'complete-btn'){
        modal.style.display = 'block'
    }
    // EMPTY CLICK FOR CLOSE MODAL
    else if (!e.target.closest(".modal")){
        modal.style.display = 'none'
    }
    // PAY BUTTON CLICK
    else if (e.target.id === 'pay-btn'){
        const payBtn = document.getElementById('pay-btn')
        preCheckout.style.display = 'none'
        setTimeout(function(){
            modal.style.display = 'none'
            const clientNameString = document.getElementById('client-name')
            const clientName = document.querySelector("input[type=text]").value
            clientNameString.textContent = `${clientName}`
            orderComplete.style.display = 'block'
        }, 1000)
    }
})

//------------------- MEAL LIST -------------------//

function getMealList() {
    
    let mealList = ``

    menuArray.forEach( meal => {
        
        let ingredientsArray = meal.ingredients

        mealList += `
        <div id="${meal.id}" class="list"> 
            <div class="meal">
                <span>${meal.emoji}</span>
                <div class="meal-detail">
                    <p>${meal.name}</p>
                    <p class="ingredient">${ingredientsArray}</p>
                    <p class="price">$${meal.price}</p>
                </div>
            </div>
            <div class="div-add-btn">
                <span class="add-btn">
                    <i class="fa-solid fa-plus" data-add="${meal.id}"></i>
                </span>
            </div>
        </div>
        <hr>
        `
    })

    return mealList
}

//------------------- PRE CHECKOUT -------------------//

function renderPreCheckout() {

    const preCheckoutItems = document.getElementById('pre-checkout-items')

    const totalPrice = document.getElementById('total-price')

    let addedMealString = ``

    let mealPrices = 0

    orderArray.forEach( item => {

        addedMealString += `
        <div class="pre-checkout-detail">
            <div>  
                <p>${item.name} 
                    <button class="remove-btn" data-remove="${item.id}">
                        remove
                    </button>
                </p>
            </div>
            <div class="item-price-section">
                <p class="item-amount">${item.amount}x</p>
                <p class="bold">$${item.price * item.amount }</p>
            </div>
        </div>
        `
        mealPrices += item.price * item.amount
    })

    preCheckoutItems.innerHTML = addedMealString

    totalPrice.innerHTML = `$${mealPrices}`

    if(orderArray.length === 0) {
        preCheckout.style.display = 'none'
    }
}

//------------------- ADD ITEM -------------------//

function addedMealObj(mealId) {

    const mealObj = menuArray.filter( meal => meal.id == mealId )[0]

    return mealObj
}

//------------------- REMOVE ITEM -------------------//

function removedMealObj(mealId) {

    const mealObj = orderArray.filter( meal => meal.id == mealId )[0]

    return mealObj
}

function render(){
    mealSection.innerHTML = getMealList()
}

render()