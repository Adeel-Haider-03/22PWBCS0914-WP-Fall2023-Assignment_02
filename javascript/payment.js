
        document.addEventListener('DOMContentLoaded', function () {
  let urlParams = new URLSearchParams(window.location.search);
  let cartData = urlParams.get('cart');

  if (cartData) {
    let cartItems = JSON.parse(decodeURIComponent(cartData));
    // Update the payment page with the cartItems data
    console.log(cartItems);
  } else {
    // Handle the case when there's no cart data
    console.log('Cart is empty.');
  }
});

        // Function to retrieve cart data from local storage
        function getCartData() {
            const cartData = localStorage.getItem('cart');
            return cartData ? JSON.parse(cartData) : [];
        }

        // Function to generate the payment receipt
        function generateReceipt() {
            const receiptContainer = document.getElementById('receipt-items');
            const totalAmountElement = document.getElementById('total-amount');
            let totalAmount = 0;

            // Get cart data from local storage
            const cartItems = getCartData();

            // Clear existing items in the receipt
            receiptContainer.innerHTML = '';

            // Iterate through each item in the cart
            cartItems.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                `;
                receiptContainer.appendChild(row);

                // Update the total amount
                totalAmount += item.price * item.quantity;
            });

            // Update the total amount display
            totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
        }

        // Initial generation of the receipt
        generateReceipt();