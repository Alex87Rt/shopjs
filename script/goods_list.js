var goodsListSection = document.getElementById('goods-list-section'); // добавил косяк с первого урока
var buttonBasket = document.getElementById('basket-btn');

//Класс для товара
class GoodsItem {
    constructor(title, price, src) {
        this.title = title;
        this.price = price;
        this.src = src;
    }

    render() {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}</div>
        <img class="goods-list__product-box__img" src=${this.src} height="100px" alt="">
        <input type="submit" value="X" class="goods-list-item__product-box__delete"
         onclick="deleteProductStringBasket()">
        </div>`
    }
}

//Класс списка товара
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fillGoods() {
        this.goods = [
            {title: 'Мячи', price: 1000, src: 'image/products_photo/мячи.jpg'},
            {title: 'Футболки', price: 1500, src: 'image/products_photo/футболки.jpg'},
            {title: 'Шорты', price: 700, src: 'image/products_photo/шорты.jpg'}
        ];
    }
}

//Класс корзина
class Basket {
    constructor() {
        this.goods = [];
    }

    //добавить товар в корзину
    addBasketItem(basketItem) {
        this.goods.push(basketItem);
    }

    totalBasketPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        });
        totalPrice.innerText = `Итого   ${sum}   руб.`;
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        goodsList.innerHTML = listHtml;
    }
}

var renderBasket = () => {
    const list = new GoodsList();
    const basket = new Basket();

    list.fillGoods();
    basket.addBasketItem(list.goods[0]);
    basket.addBasketItem(list.goods[1]);
    basket.addBasketItem(list.goods[2]);
    basket.render();
    basket.totalBasketPrice();
    goodsListSection.style.display = 'block';
};

buttonBasket.addEventListener('click', renderBasket);
window.addEventListener('click', function (evt) {
    console.log(evt)
});

