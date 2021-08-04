
function getItems(){
db.collection("items").get().then((querySnapshot) => {
    let items = [];
    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
            maker: doc.data().maker,
            rating: doc.data().rating,
            price: doc.data().price,
        })
    });
    generateItems(items)
});
}

function addToCart(item){
    let cartItem = db.collection("cart items").doc(item.id);
    cartItem.get()
    .then(function (doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                name: item.name,
                maker: item.maker,
                rating: item.rating,
                price: item.price,
                quantity: 1
            })
        }
    })
}

function generateItems(items){
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main_product", "cursor-pointer", "mr-5");
        doc.innerHTML = `
            <div class="product-image h-52 w-48 p-4 mb-4 bg-white border border-gray-100 hover:border-gray-700 rounded-xl">
                <img class="w-full h-full object-contain p-3" src="${item.image}" alt="This is an image">
            </div>
            <div class="product-name px-2 font-bold w-48">
                ${item.name}
            </div>
            <div class="product-maker px-2 text-blue-600 font-bold w-48">
                ${item.maker}
            </div>
            <div class="product-rating px-2 text-yellow-400">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price px-2 font-bold">
                ₹ ${item.price}
            </div>
        `

        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("add_to_cart", "bg-yellow-500", "text-white", "font-bold", "flex", "justify-center", "items-center", "rounded", "p-3", "mt-3", "hover:bg-yellow-600");
        addToCartEl.innerText = "Add to cart";
        addToCartEl.addEventListener("click", function(){
            addToCart(item)
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".products").appendChild(doc);
    })
}
getItems();
