"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createProducts;

function createProducts() {
  var items = [];


  items.push(createProduct("1", "Mobile phone", "gadgets"));
  items.push(createProduct("2", "Computer", "gadgets"));
  items.push(createProduct("3", "Tablet", "gadgets"));
  items.push(createProduct("4", "Battery pack", "accessories"));
  items.push(createProduct("5", "Desktop", "gadgets"));

  return items;
}

function createProduct(id, name, category) {

  return {
    id: id,
    url: "/p/" + id,
    name: name,
    price: 10.99,
    priceText: "RM10.99",
    rating: 4.5,
    thumbnail: {
      src: "https://dummyimage.com/400x400/9e9e9e/FFFFFF?text=".concat(encodeURIComponent(name)),
      alt: name,
    },
    media: {
      full: [{
        src: "https://dummyimage.com/600x600/9e9e9e/FFFFFF?text=".concat(encodeURIComponent(name)),
        alt: name,
        type: "image"
      }],
      thumbnails: [{
        src: "https://dummyimage.com/400x400/9e9e9e/FFFFFF?text=".concat(encodeURIComponent(name)),
        alt: name,
      }]
    },
    category: category,
    description: "This is Ace IT best " + name,
    specs: "Specification for " + name,
    brands: [{
      id: "asus",
      text: "Asus",
      image: {
        src: "https://dummyimage.com/200x200/9e9e9e/FFFFFF?text=".concat(encodeURIComponent("Asus")),
        alt: "Asus",
      },
      media: {
        full: [{
          src: "https://dummyimage.com/600x600/9e9e9e/FFFFFF?text=".concat(encodeURIComponent(name + " - Asus")),
          alt: name + " - Asus",
          type: "image"
        }],
        thumbnails: [{
          src: "https://dummyimage.com/400x400/9e9e9e/FFFFFF?text=".concat(encodeURIComponent("Asus")),
          alt: "Asus",
        }]
      }
    }, {
      id: "lg",
      text: "LG",
      image: {
        src: "https://dummyimage.com/200x200/9e9e9e/FFFFFF?text=".concat(encodeURIComponent("LG")),
        alt: "LG",
      },
      media: {
        full: [{
          src: "https://dummyimage.com/600x600/9e9e9e/FFFFFF?text=".concat(encodeURIComponent(name + " - LG")),
          alt: name + " - LG",
          type: "image"
        }],
        thumbnails: [{
          src: "https://dummyimage.com/400x400/9e9e9e/FFFFFF?text=".concat(encodeURIComponent("LG")),
          alt: "LG",
        }]
      }
    }, {
      id: "samsung",
      text: "Samsung",
      image: {
        src: "https://dummyimage.com/200x200/9e9e9e/FFFFFF?text=".concat(encodeURIComponent("Samsung")),
        alt: "Samsung",
      },
      media: {
        full: [{
          src: "https://dummyimage.com/600x600/9e9e9e/FFFFFF?text=".concat(encodeURIComponent(name + " - Samsung")),
          alt: name + " - Samsung",
          type: "image"
        }],
        thumbnails: [{
          src: "https://dummyimage.com/400x400/9e9e9e/FFFFFF?text=".concat(encodeURIComponent("Samsung")),
          alt: "Samsung",
        }]
      }
    }]
  }
}
