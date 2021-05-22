let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Wah Nimco',
        tag: 'deal1',
        price: 80,
        inCart: 0
    },
    {
        name: 'Vital Tea',
        tag: 'vitaltea',
        price: 202,
        inCart: 0
    },
    {
        name: 'Vital Tea Zip Pack',
        tag: 'vital',
        price: 915,
        inCart: 0
    },
    {
        name: 'Bisconni',
        tag: 'bisconni',
        price: 248,
        inCart: 0
    },
    {
        name: 'Knorr Noodle',
        tag: 'knorrnoodle',
        price: 236,
        inCart: 0
    },
    {
        name: 'Cherry Blossom',
        tag: 'cherryblossom',
        price: 226,
        inCart: 0
    },
    {
        name: 'Rose Petal',
        tag: 'rosepetal',
        price: 248,
        inCart: 0
    },
    {
        name: 'Lays',
        tag: 'lays',
        price: 236,
        inCart: 0
    },
    {
        name: 'Nestle Milk Pak',
        tag: 'nestlemilk',
        price: 226,
        inCart: 0
    },
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function OnLoadCartNumbers() {
    let productNum = localStorage.getItem('cartNumbers');

    if(productNum) {
        document.querySelector('.mycart span').textContent = productNum;
    }
}
function cartNumbers(product) {
    
    let productNum = localStorage.getItem('cartNumbers');

    productNum = parseInt(productNum);
    
    if(productNum) {
        localStorage.setItem('cartNumbers', productNum + 1);
        document.querySelector('.mycart span').textContent = productNum + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.mycart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems !=  null) {
        
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log('The products price is', product.price);
    let cartCost = localStorage.getItem("totalCost");
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    let productNum = localStorage.getItem('cartNumbers');

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                
                <img src="./images/${item.tag}.jpg" height = "50px">
                <span>${item.name}</span>
            </div>
            <div class="price">Rs.${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                Rs.${item.inCart * item.price}.00
            </div>
            
            `
        });

        productContainer.innerHTML += `
            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle" style="font-size: 17px">
                    Cart Total
                </h4>
                <h4 class="cartTotal" style="font-size: 17px">
                    Rs.${cartCost}.00
                </h4>

            </div>
            <div class="cartProductsContainer"> 
                <h4 class="cartProductsTitle" style="font-size: 17px">
                    No. of Products
                </h4>
                <h4 class="cartProducts" style="font-size: 17px">
                    ${productNum}
                </h4>
            </div>
        `;
       
    }
}
OnLoadCartNumbers();
displayCart();