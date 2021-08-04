
function cartItems(){
    db.collection("cart_items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(items);
    })
}

function generateCartItems(items){
    let itemsHTML = "";
    items.forEach((item) => {
         itemsHTML += `
            <div class="products flex items-center mt-10">
                <div class="product_image w-40 h-24 bg-white hover:bg-gray-100 rounded-lg">
                    <img class="h-full w-full object-contain" src="${item.image}" alt="Macbook">
                </div>
                <div class="product_details flex items-center flex-grow">
                    <div class="product_name">
                        ${item.name}
                    </div>
                    <div class="pruduct_maker font-bold">
                        ${item.maker}
                    </div>
                </div>
                <div class="count flex justify-center items-center w-48">
                    <div class="left_chevron bg-gray-100 flex items-center justify-center hover:bg-gray-200 mr-2 h-8 w-6 rounded-lg"><i class="fas fa-chevron-left"></i></div>
                    <div class="product_number">x ${item.quantity}</div>
                    <div class="right_chevron bg-gray-100 rounded-lg w-6 h-8 flex justify-center items-center hover:bg-gray-200 ml-2 mr-28"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="product_cost w-48 font-bold">
                    ₹ ${item.price}
                </div>
                <div class="delete_item w-10 text-gray-500 hover:text-gray-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
         `
    })
    document.querySelector(".cart_items").innerHTML = itemsHTML;
}

cartItems();