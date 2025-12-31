let cart = JSON.parse(localStorage.getItem("cart")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

/* CART */
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    item ? item.qty++ : cart.push({name, price, qty:1});
    localStorage.setItem("cart", JSON.stringify(cart));
    openCart();
}

function renderCart() {
    let list = document.getElementById("cartItems");
    let total = 0;
    if(!list) return;
    list.innerHTML = "";
    cart.forEach((i, idx) => {
        total += i.price * i.qty;
        list.innerHTML += `
        <li class="cart-item">
            ${i.name}
            <button onclick="changeQty(${idx},-1)">-</button>
            ${i.qty}
            <button onclick="changeQty(${idx},1)">+</button>
            ₹${i.price*i.qty}
            <button onclick="removeItem(${idx})">x</button>
        </li>`;
    });
    if(cartTotal) cartTotal.innerText = "Total ₹"+total;
}

function changeQty(i,d){ cart[i].qty+=d; if(cart[i].qty<=0) cart.splice(i,1); save(); }
function removeItem(i){ cart.splice(i,1); save(); }
function save(){ localStorage.setItem("cart",JSON.stringify(cart)); renderCart(); }

/* MODAL */
function openCart(){ document.getElementById("cartModal").style.display="flex"; renderCart(); }
function closeCart(){ document.getElementById("cartModal").style.display="none"; }

/* AUTH */
function signup(e){
    e.preventDefault();
    users.push({name:name.value,email:email.value,password:password.value,role:role.value});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Signup successful");
    location.href="login.html";
}

function login(e){
    e.preventDefault();
    let user = users.find(u=>u.email===loginEmail.value && u.password===loginPassword.value);
    if(!user) return alert("Invalid");
    localStorage.setItem("currentUser",JSON.stringify(user));
    location.href = user.role==="admin" ? "admin.html" : "index.html";
}

/* ADMIN */
function addProduct(e){
    e.preventDefault();
    products.push({name:pname.value,price:pprice.value});
    localStorage.setItem("products",JSON.stringify(products));
    loadAdmin();
}

function loadAdmin(){
    let list=document.getElementById("adminProducts");
    if(!list) return;
    list.innerHTML="";
    products.forEach(p=>list.innerHTML+=`<li>${p.name} - ₹${p.price}</li>`);
}

/* PAYMENT */
function payNow(e){
    e.preventDefault();
    alert("Payment Successful");
    localStorage.removeItem("cart");
    location.href="index.html";
}

/* FILTER */
function filterProducts(cat){
    document.querySelectorAll(".product-card").forEach(c=>{
        c.style.display = cat==="all" || c.classList.contains(cat) ? "block":"none";
    });
}
