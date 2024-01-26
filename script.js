// const divEle = document.querySelector('.card-container');

//   const req = new XMLHttpRequest();

//   req.open('GET', `https://dummyjson.com/users/1`);
//   req.send();

//   req.addEventListener('load', function () {
//     console.log(responseText);
//   });


const WEB_API = "https://dummyjson.com/products";
let currentImage = 0;

async function getProducts() {
    const request = await fetch(WEB_API);
    const data = await request.json();
    const products = data.products;
    displayProducts(products);
    changeImage(products);

}

getProducts();

function displayProducts (products) {
  const pro = 'dummy';
  const productsEl = document.querySelector('.products');

  for (const product of products) {
    const contentDiv = `<div class="product">
    <div class="img_con">
      <button class="pre-product"><<</button>
      <img class="product-img" src="${product.images[currentImage]}" alt="${product.title}">
      <button class="next-product">>></button>
    </div>
    <div class="product-details">
      <div class="product-name">${product.title}</div>
      <div class="product-price">Price: ${product.price}</div>
      <button class="add-to-cart addToCartBtn">Add to Cart</button>
    </div>
  </div>`;

  productsEl.insertAdjacentHTML("beforeend", contentDiv);
  
  }
  
}

function changeImage(products) {
  const imgEl = document.querySelectorAll(".product-img");
  const preImgEl = document.querySelectorAll(".pre-product");
  const nextImgEl = document.querySelectorAll(".next-product");
  const addToCartEl = document.querySelectorAll(".add-to-cart");

  for (let i = 0; i < imgEl.length; i++) {
    preImgEl[i].addEventListener("click", () => {
      if (currentImage > 0){
        nextImgEl[i].disabled = false;
        currentImage -= 1;
      } else {
        preImgEl[i].disabled = true;
      }
      const individualImage = products[i].images;
      imgEl[i].src = individualImage[currentImage];
    });

    nextImgEl[i].addEventListener("click", () => {
      const individualImage = products[i].images;
      if (currentImage < individualImage.length - 1){
        preImgEl[i].disabled = false;
        currentImage += 1;
      } else {
        nextImgEl[i].disabled = true;
      }
      imgEl[i].src = individualImage[currentImage];
    })

    let count = 1;
    addToCartEl[i].addEventListener("click", () => {
      
      const cartEl = document.getElementById("cart");
      const cartItemDiv = `<div class="cart_item">
      <span>
        ${products[i].title} &nbsp; Price: $${products[i].price} &nbsp; Quant: ${count} &nbsp;
      </span>
      <button>
        -
      </button>
    </div>`;
    if (!cartEl.innerHTML.includes(products[i].title)){
      cartEl.insertAdjacentHTML("beforeend", cartItemDiv);
    } else {
      count += 1;
      cartEl.querySelector("span").innerHTML = `${products[i].title} &nbsp; Price: $${products[i].price} &nbsp; Quant: ${count} &nbsp`;
    }
    });

  }
}
