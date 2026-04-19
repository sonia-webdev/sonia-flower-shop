// --- 2. LOG out LOGIC ---

const signupBtn = document.getElementById('signup-btn');
if (signupBtn) {
    signupBtn.addEventListener('click', function() {
        const name = document.getElementById('signup-name').value;
        const pass = document.getElementById('signup-pass').value;

        if (name === "" || pass === "") {
            alert("Please fill in all fields!");
        } else {
            localStorage.setItem('registeredUser', name);
            localStorage.setItem('registeredPass', pass);
            alert("Account created for " + name + "! Please log in now.");
            window.location.href = "log in.html";
        }
    });
}

// --- 2. LOG IN LOGIC ---
const loginBtn = document.getElementById('login-submit');
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        const inputName = document.getElementById('login-name').value;
        const inputPass = document.getElementById('login-pass').value;
        
        const savedName = localStorage.getItem('registeredUser');
        const savedPass = localStorage.getItem('registeredPass');

        if (inputName === savedName && inputPass === savedPass && savedName !== null) {
            sessionStorage.setItem('isLoggedIn', 'true'); // Grant session access
            alert("Welcome "+ savedName +" !");
            window.location.href = "index.html";
        } else {
            alert("Error: Incorrect username/password or account does not exist.");
        }
    });
}

// --- 3. SECURITY GATEKEEPER ---
// Add this to prevent people from typing 'index.html' to bypass login
const protectedPages = ["index.html", "flower birthday.html", "symp.html", "gifl flower.html", "contact.html"];
const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert("You must log in to view the flower shop!");
        window.location.href = "log in.html";
    }
}

//TO MAKE A CART 





// --- ADD TO CART SYSTEM ---

// 1. Listen for clicks on "Add to Cart" buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('buy-btn')) {
        const name = e.target.getAttribute('data-name');
        const price = e.target.getAttribute('data-price');

        // Create an object for the item
        const item = { name: name, price: parseInt(price) };

        // Get existing cart or start a new one
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        
        // Add the new item
        cart.push(item);
        
        // Save back to localStorage
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        alert(name + " added to basket! 🌸");
        updateCartCount();
    }
});

// 2. Function to update the number in the menu
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// 3. Display items on the Cart Page
if (window.location.pathname.includes("cart.html")) {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your basket is empty.</p>";
    } else {
        cartItemsDiv.innerHTML = ""; // Clear placeholder
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsDiv.innerHTML += `
                <div style="border-bottom: 1px solid #4b0c40; padding: 10px; display: flex; justify-content: space-between;">
                    <span>${item.name}</span>
                    <span>${item.price} RWF</span>
                </div>
            `;
        });
        totalDiv.innerText = "Total: " + total + " RWF";
    }
}

// 4. Clear Cart Function
function clearCart() {
    localStorage.removeItem('myCart');
    location.reload();
}

// Run count update on every page load
updateCartCount();

// Function to update the number shown in the menu
/*function updateMenuCartCount() {
    // Get the cart from memory
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    
    // Find the number span in the menu
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        // Update the text to show how many items are inside
        countElement.innerText = cart.length;
    }
}

// Run this function every time any page is opened
window.addEventListener('load', updateMenuCartCount);

// Also run it immediately after someone clicks "Add to Cart"
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('buy-btn')) {
        // (Your existing add-to-cart logic here...)
        
        // After adding the item, refresh the menu number
        setTimeout(updateMenuCartCount, 100); 
    }
});*/