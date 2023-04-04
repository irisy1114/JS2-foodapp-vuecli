import Toastify from 'toastify-js';

export default {
    GetCart:function (){
        const myCartString = localStorage.getItem('foodCart');
        return myCartString? JSON.parse(myCartString): {items: [], payment: {}};
    },
    AddItemToCart:function (newItem){
        const myCartString = localStorage.getItem('foodCart');
        const myCart =  myCartString? JSON.parse(myCartString): {items: [], payment: {}};
        const found = myCart.items.find(i => i.name === newItem.name);

        if(found)
            found.qty += newItem.qty;
        else
            myCart.items.push(newItem);

        // display toast
        localStorage.setItem('foodCart', JSON.stringify(myCart));
        const message = newItem.qty + ' of ' + newItem.name + (newItem.qty > 1?' were':' was') + ' added to cart successfully.';
        // refer to the toastify library https://github.com/apvarun/toastify-js
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            onClick: function(){} // Callback after click
        }).showToast();
    },
    Prompt(message, error = false){
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: error?"linear-gradient(to right, red, yellow)":"linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }
}