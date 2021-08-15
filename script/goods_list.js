var goodsListSection = document.getElementById('goods-list-section'); // добавил косяк с первого урока
var buttonBasket = document.getElementById('basket-btn');


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const goods = [
            {title: 'Мячи', price: 1000, src: 'image/products_photo/мячи.jpg'},
            {title: 'Футболки', price: 1500, src: 'image/products_photo/футболки.jpg'},
            {title: 'Шорты', price: 700, src: 'image/products_photo/шорты.jpg'},
        ];
//Класс для товара
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}
//Класс списка товара
class GoodsList {
    constructor() {
      this.goods = [];
      this.filteredGoods = [];
    }
    // async fetchGoods() {
    //     return await fetch(`${API_URL}/catalogData.json`).then(resp => resp.json());
    // }
    filterGoods(value) {
    // Здесь будем фильтровать список товаров
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good =>
        regexp.test(good.product_name));
        this.render();
    }

    fetchGoods(cb) {
        return makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
        this.goods = JSON.parse(goods);
        this.filteredGoods = JSON.parse(goods);
        cb();
        })
    }
    render() {
        const listHtml = document.querySelector('.goods-list');
        filteredGoods.forEach(good => {
          const goodItem = new GoodsItem(good);
          listHtml.insertAdjacentHTML('afterEnd', goodItem.render());
        });
        searchButton.addEventListener('click', (e) => {
            const value = searchInput.value;
            list.filterGoods(value);
        });
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

    list.fetchGoods();
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

const makeGETRequest = (url) => {
    return new Promise((resolve) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(JSON.parse(xhr.response));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}