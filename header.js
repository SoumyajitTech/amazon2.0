function getCartItems(){
    db.collection("cart items").onSnapshot((Snapshot) => {
        let count = 0;
        Snapshot.forEach(doc => {
            count += doc.data().quantity;
        });
        cartNumber(count);
    })
}

function cartNumber(count){
    document.querySelector(".cart_item_number").innerText = count;
}

getCartItems();