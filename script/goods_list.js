// var goodsListSection = document.getElementById('goods-list-section'); // добавил косяк с первого урока
// var buttonBasket = document.getElementById('basket-btn');
//

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// const goods = [
//     {title: 'Мячи', price: 1000, src: 'image/products_photo/мячи.jpg'},
//     {title: 'Футболки', price: 1500, src: 'image/products_photo/футболки.jpg'},
//     {title: 'Шорты', price: 700, src: 'image/products_photo/шорты.jpg'},
// ];

// //Класс для товара
// class GoodsItem {
//     constructor(title, price) {
//         this.title = title;
//         this.price = price;
//     }
//
//     render() {
//         return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
//     }
// }
//
// //Класс списка товара
// class GoodsList {
//     constructor() {
//         this.goods = [];
//         this.filteredGoods = [];
//     }
//
//     // async fetchGoods() {
//     //     return await fetch(`${API_URL}/catalogData.json`).then(resp => resp.json());
//     // }
//     filteredGoods(value) {
//         // Здесь будем фильтровать список товаров
//         const regexp = new RegExp(value, 'i');
//         this.filteredGoods = this.goods.filter(good =>
//             regexp.test(good.product_name));
//         this.render();
//     }
//
//     fetchGoods(cb) {
//         return makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//             this.goods = JSON.parse(goods);
//             this.filteredGoods = JSON.parse(goods);
//             cb();
//         })
//     }
//
//     render() {
//         const listHtml = document.querySelector('.goods-list');
//         filteredGoods.forEach(good => {
//             const goodItem = new GoodsItem(good);
//             listHtml.insertAdjacentHTML('afterEnd', goodItem.render());
//         });
//         searchButton.addEventListener('click', (e) => {
//             const value = searchInput.value;
//             list.filterGoods(value);
//         });
//     }
// }
//
// //Класс корзина
// class Basket {
//     constructor() {
//         this.goods = [];
//     }
//
//     //добавить товар в корзину
//     addBasketItem(basketItem) {
//         this.goods.push(basketItem);
//     }
//
//     totalBasketPrice() {
//         let totalPrice = document.getElementById('goods-list__total');
//         let sum = 0;
//         this.goods.forEach(good => {
//             sum += good.price
//         });
//         totalPrice.innerText = `Итого   ${sum}   руб.`;
//     }
//
//     render() {
//         let listHtml = '';
//         let goodsList = document.getElementById('goods-list__product-box');
//
//         this.goods.forEach(good => {
//             const goodItem = new GoodsItem(good.title, good.price, good.src);
//             listHtml += goodItem.render();
//         });
//         goodsList.innerHTML = listHtml;
//     }
// }
//
// var renderBasket = () => {
//     const list = new GoodsList();
//     const basket = new Basket();
//
//     list.fetchGoods();
//     basket.addBasketItem(list.goods[0]);
//     basket.addBasketItem(list.goods[1]);
//     basket.addBasketItem(list.goods[2]);
//     basket.render();
//     basket.totalBasketPrice();
//     goodsListSection.style.display = 'block';
// };
//
// buttonBasket.addEventListener('click', renderBasket);
// window.addEventListener('click', function (evt) {
//     console.log(evt)
// });
// //
// // const makeGETRequest = (url) => {
// //     return new Promise((resolve) => {
// //         let xhr;
// //         if (window.XMLHttpRequest) {
// //             xhr = new XMLHttpRequest();
// //         } else if (window.ActiveXObject) {
// //             xhr = new ActiveXObject("Microsoft.XMLHTTP");
// //         }
// //
// //         xhr.onreadystatechange = function () {
// //             if (xhr.readyState === 4) {
// //                 resolve(JSON.parse(xhr.response));
// //             }
// //         }
// //
// //         xhr.open('GET', url, true);
// //         xhr.send();
// //     });
// // }
// const app = new Vue({
//     el: '#app',
//     data: {
//         goods: [],
//         filteredGoods: [],
//         searchLine: ''
//     },
//     methods: {
//         makeGETRequest(url, callback) {
//             // const API_URL =
//             //     'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//             var xhr;
//             if (window.XMLHttpRequest) {
//                 xhr = new XMLHttpRequest();
//             } else if (window.ActiveXObject) {
//                 xhr = new ActiveXObject("Microsoft.XMLHTTP");
//             }
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     callback(xhr.responseText);
//                 }
//             }
//             xhr.open('GET', url, true);
//             xhr.send();
//         }
//     },
//     mounted() {
//         this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//             this.goods = goods;
//             this.filteredGoods = goods;
//         });
//     }
// });

// 'use strict';

let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'catalogData.json',
        products: [
            {
                "id_product": 111,
                "product_name": "Мячи",
                "price": 1000
            },
            {
                "id_product": 222,
                "product_name": "Футболки",
                "price": 1500
            },
            {
                "id_product": 333,
                "product_name": "Шорты",
                "price": 700
            }
        ],
        imgCatalog: 'image/products_photo/мячи.jpg',
        searchText: '',
        filteredProducts: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        },

        addProduct(product) {
            console.log(product.id_product);
        },

        searchFor() {
            let text = this.searchText.toLowerCase().trim();
            if (text === '') {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter((el) => {
                    return el.product_name.toLowerCase().includes(text);
                });
            }
        }
    },
    mounted() {
        this.makeGETRequest(`/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    }


});

class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init()

    }

    _init() {
        return false
    }

    getJson(url) {
        console.log(this);
        console.log(url);
        return fetch(url ? url : `${API_URL + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            })
    }

    handleData(data) {
        this.goods = [...data];
        this.render()
    }

    sumPrice() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0)
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {

            const prod = new lists[this.constructor.name](product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render())
        }
    }
}

class Item {
    constructor(el) {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product
    }

    render() {
        return `<div class="goods-item">
                    <h5>${this.product_name}</h5>
                    <p>${this.price} руб.</p>
                    <button 
                    class="addButton" 
                    data-name="${this.product_name}" 
                    data-price="${this.price}"
                    >Добавить</button>
                    <button class="removeButton" 
                    data-id="${this.id_product}" 
                    >Удалить</button>
                </div>`;
    }
}

class ProductsList extends List {
    constructor(cart, url = 'catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.classList.contains('addButton')) {
                this.cart.addProduct(evt.target)
            }
        })
    }
}


class ProductItem extends Item {
}

class Cart extends List {
    constructor(url = 'getBasket.json', container = '.basket') {
        super(url, container);
        this.getJson()
            .then(data => this.handleData(data.contents));
    }

    addProduct(element) {
        this.getJson(`${API_URL}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);

                    if (find) {
                        find.quantity++;
                        this._updateCart(find)
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: +element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    console.log('Ошибка')
                }
            })
    }

    removeProduct(element) {
        this.getJson(`${API_URL}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);

                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}]`).remove()
                    }
                } else {
                    console.log('Ошибка')
                }
            })
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${productId}]`);
        block.querySelector(`.product-quantity`).textContent = `Количество: ${product.quantity}`;
        block.querySelector(`.product-price`).textContent = `${this.price * product.price} руб.`;
    }

    _init() {
        document.querySelector('.cart-button').addEventListener('click', () => {
            document.querySelector(this.container.classList.toggle('invisible'))
        });
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.classList.contains('del-btn')) {
                this.removeProduct(evt.target)
            }
        })
    }
}

class CartItem extends Item {
    constructor(el) {
        super(el);
        this.quantity = el.quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <h6>${this.product_name}</h6>
                    <p class="product-price">${this.price} руб.</p>
                    <p class="product-quantity">Количество: ${this.quantity}</p>
                    <button class="del-btn" data-id="${this.id_product}"> &times; </button>
                </div>`;
    }
}

let lists = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);