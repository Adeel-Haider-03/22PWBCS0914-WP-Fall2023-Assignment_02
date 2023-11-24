
  document.addEventListener('DOMContentLoaded', function () {
      // Initialize an empty cartItems array
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

      // Fetch books from the server
      fetch('books.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok.');
              }
              return response.json();
          })
          .then(books => {
              let html = '<div class="d-flex flex-wrap">';
              books.forEach(book => {
                  let htmlSegment = `
                  <div class="card m-3" style="width: 18rem;">
                            <img src="${book.cover_image}" class="card-img-top" alt="...">
                            <div class="card-body" id="${book.id}">
                                <h4 class="card-title">${book.title}</h4>
                                <h5>${book.author}</h5>
                                <h5>${book.category}</h5>
                                <h5>Price: $${book.price}</h5>
                                <p class="card-text">${book.description}</p>
                                <button class="btn btn-dark addToCart" data-book-id="${book.id}">Add to cart</button>
                                <button class="btn btn-dark viewCart" data-book-id="${book.id}">View Cart</button>
                            </div>
                      </div>`;

                  html += htmlSegment;
              });

              html += '</div>';
              let container = document.querySelector('.card-section');
              container.innerHTML = html;

              // Event listener for adding to cart
              document.addEventListener('click', function (event) {
                  if (event.target.classList.contains('addToCart')) {
                      let bookId = event.target.dataset.bookId;
                      let selectedBook = books.find(book => book.id === bookId);
                      cartItems.push(selectedBook);
                      alert('Book added to cart!');
                      // Save updated cart to local storage
                      localStorage.setItem('cart', JSON.stringify(cartItems));
                  }
              });

              // Event listener for viewing the cart
              document.addEventListener('click', function (event) {
                  if (event.target.classList.contains('viewCart')) {
                      if (cartItems.length > 0) {
                          // Redirect to cart.html
                          window.location.href = 'cart.html';
                      } else {
                          alert('Your cart is empty.');
                      }
                  }
              });
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  });