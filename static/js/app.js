// global cart variable
// TODO: replace with cloud database
let cart = [];

// if cart is empty don't show cart
if (cart.length === 0) {
  $("#cart").css("display", "none");
}


$.get('./components/header.html', function(r) {
  $("#nav").html(r);
});

// callback function to show products.json
function showProducts(response) {
  // define local variables for headers and html
  let products = response.products;
  let html = "";

  // loop through products and create card for each
  for (let i = 0; i < products.length; i++) {
    // open row for each third product
    if (i % 3 == 0) {
      html += '<div class="row">';
    }
    html += `
      <div class="card col-md-4">
        <div class="card-img-top">
          <img src="http://placehold.it/1x1" alt="Placeholder" class="card-img" />
        </div>
        <div class="card-title">${products[i].title}</div>
        <div class="card-subtitle">$${products[i].price}</div>
        <div class="card-text">${products[i].description}</div>
        <button onclick="addToCart(${products[i].id})" class="btn btn-primary">Add To Cart</button>
      </div> <!-- End of card -->
    `;
    // close row after 3 products have been added
    if ((i + 1) % 3 == 0) {
      html += '</div>';
    }
  }
  // inject html string into products id
  $("#products").html(html);
}

// use jQuery to pull product information
$.get('./assets/products.json', showProducts);


function addToCart(id) {
  $.get('./assets/products.json', function(res) {
    let products = res.products;

    // loop through products array to find correct id
    for (let i = 0; i < products.length; i++) {
      // check current product id to id parameter passed
      if (products[i].id == id) {
        // add product to global cart
        cart.push(products[i]);
        break;
      }
    }
  });

  // call showCart to update table
  // Usage!
  sleep(50).then(() => {
    showCart();
    displayTotal();
  })
}


function showCart() {
  // if cart is empty don't show, otherwise show
  if (cart.length === 0) {
    $("#cart").css("display", "none");
  } else {
    $("#cart").css("display", "block");
  }

  // define html variable to be inserted to tbody
  let html = "";

  // loop through all products in cart
  // TODO: change total to be quantity times price
  for (let i = 0; i < cart.length; i++) {
    html += `
      <tr>
        <td>1</td>
        <td>${cart[i].title}</td>
        <td>$${cart[i].price}</td>
        <td>$${cart[i].price}</td>
        <td><button onclick="removeFromCart(${cart[i].id})" class="btn btn-danger">x</button></td>
      </tr>
    `;
  }

  console.log(cart);
  // inject html variable into table-body
  $("#table-body").html(html);
}


function removeFromCart(id) {
  // loop through products in cart and remove one instance of id
  for (let i = 0; i < cart.length; i++) {
    // check current product for id passed in
    if (cart[i].id == id) {
      // splice current product
      cart.splice(i, 1);
      break;
    }
  }

  // run showCart to generate current cart array
  // Usage!
  sleep(50).then(() => {
    showCart();
    displayTotal();
  });
}


function getTotal() {
  let total = 0;

  // loop through products in cart and add prices
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }

  return total.toFixed(2);
}


// TODO: display correct total in proper locations
function displayTotal() {
  // get total and store in variable
  let total = getTotal();

  // change total in navbar
  $("#nav-total").text(`Total: $${total}`);

  // change total in cart
  $("#cart-total").text(`$${total}`);
}




// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
