
    let booksData = [];

        // Populate book list on page load
        displayBooks(booksData);

// Assuming booksData is an array of book objects with a 'category' property

// Function to filter books by category
function filterBooksByCategory(category) {
    const filteredBooks = booksData.filter(book => book.category.toLowerCase() === category.toLowerCase());
    displayBooks(filteredBooks);
}

// Function to clear the filter and display all books
function clearFilter() {
    displayBooks(booksData);
}

// Function to populate category list
function populateCategoryList() {
    const categories = [...new Set(booksData.map(book => book.category))];

    // Populate category list
    const categoryList = document.getElementById('categoryList');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('category-item');
        li.textContent = category;
        li.addEventListener('click', () => filterBooksByCategory(category));
        categoryList.appendChild(li);
    });
}

// Example usage:
// Fetch data from 'books.json' and populate category list
function fetchDataAndPopulateCategories() {
    fetch('books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(books => {
            booksData = books; // Assuming booksData is a global variable
            populateCategoryList();
            displayBooks(booksData); // Display all books initially
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            // Handle errors, such as updating the UI to inform the user
        });
}

// Ensure that the DOM has loaded before calling fetchDataAndPopulateCategories
document.addEventListener('DOMContentLoaded', fetchDataAndPopulateCategories);

// Add event listener for clear button
document.getElementById('clearButton').addEventListener('click', clearFilter);

// Function to filter books by search input
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput) ||
        book.category.toLowerCase().includes(searchInput)
    );
    displayBooks(filteredBooks);
}

// Function to display books
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear previous content

    books.forEach(book => {
        const li = document.createElement('li');
        li.classList.add('book-item');
        li.innerHTML = `
            <img src="${book.cover_image}" alt="${book.title}" style="max-width: 100%;">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>Price: $${book.price.toFixed(2)}</p>
            <p>${book.description}</p>
        `;
        bookList.appendChild(li);
    });
}

// Fetch data from 'books.json' and display books
function fetchDataAndDisplayBooks() {
    fetch('books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(books => {
            // 'books' is now an array containing the book data
            // Use the data to display books in your HTML
            booksData = books; // Assuming booksData is a global variable
            displayBooks(books);
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            // Handle errors, such as updating the UI to inform the user
        });
}

// Ensure that the DOM has loaded before calling fetchDataAndDisplayBooks
document.addEventListener('DOMContentLoaded', fetchDataAndDisplayBooks);

// Add event listener for search input
document.getElementById('searchInput').addEventListener('input', searchBooks);