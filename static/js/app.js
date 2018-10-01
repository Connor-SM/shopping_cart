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
  }
  // inject html string into products id
  $("#products").html(html);
}

// use jQuery to pull product information
$.get('./assets/products.json', showProducts);


// TODO: add functionality later
function addToCart(id) {
  console.log(id);
}
