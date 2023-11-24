
const cart = [];
let totalSelectedPrice = 0;
let books = [];

async function displayBooks() {
const bookList = document.getElementById("bookList");
bookList.innerHTML = "";

try {
    // Fetch data from books.json
    const response = await fetch('books.json');
    if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
    }

    books = await response.json();

    books.forEach(book => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `<div>
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Category: ${book.category}</p>
            <p>Price: $${book.price.toFixed(2)}</p>
            <button class="btn btn-dark" onclick="showBookDetails(${book.id})">Select</button>
            </div>
        `;

        bookList.appendChild(listItem);
    });
} catch (error) {
    console.error('Error fetching books:', error);
}
}


function showBookDetails(bookId) {
    const selectedBook = books.find(book => book.id === bookId);

    const detailsElement = document.getElementById("selectedBookDetails");

    const detailsRow = document.createElement("tr");
    detailsRow.id = `bookRow_${selectedBook.id}`;
    detailsRow.innerHTML = `
        <td>${selectedBook.title}</td>
        <td>${selectedBook.author}</td>
        <td>${selectedBook.category}</td>
        <td>$${selectedBook.price.toFixed(2)}</td>
        <td><input type="number" id="quantity_${selectedBook.id}" value="1" min="1" onchange="updateQuantity(${selectedBook.id}, this.value)"></td>
        <td>
            <button class="btn btn-danger" onclick="removeFromCart(${selectedBook.id})">Delete</button>
        </td>
    `;

    detailsElement.appendChild(detailsRow);

    // Add the book to the cart when selected
    addToCart(selectedBook.id);
}

function updateQuantity(bookId, quantity) {
    const cartItem = cart.find(item => item.id === bookId);

    if (cartItem) {
        cartItem.quantity = parseInt(quantity, 10);
        updateSelectedBooks();
    }
}

function addToCart(bookId) {
    const quantityInput = document.getElementById(`quantity_${bookId}`);
    const quantity = parseInt(quantityInput.value);
    const selectedBook = books.find(book => book.id === bookId);

    const existingCartItem = cart.find(item => item.id === bookId);

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    } else {
        cart.push({
            ...selectedBook,
            quantity
        });
    }

    updateSelectedBooks();
}

function removeFromCart(bookId) {
    const index = cart.findIndex(item => item.id === bookId);

    if (index !== -1) {
        cart.splice(index, 1);
        updateSelectedBooks();
    }
}

function updateSelectedBooks() {
    const detailsElement = document.getElementById("selectedBookDetails");
    detailsElement.innerHTML = "";
    totalSelectedPrice = 0;

    cart.forEach(item => {
        const detailsRow = document.createElement("tr");
        detailsRow.id = `bookRow_${item.id}`;
        detailsRow.innerHTML = `
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.category}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" id="quantity_${item.id}" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Delete</button>
            </td>
        `;
        detailsElement.appendChild(detailsRow);

        totalSelectedPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = totalSelectedPrice.toFixed(2);
}

function proceedToPayment() {
    // Store selected books and details in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalSelectedPrice.toFixed(2));

    // Redirect to the payment page
    window.location.href = 'payment.html';
}

displayBooks();