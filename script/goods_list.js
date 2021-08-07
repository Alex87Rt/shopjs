var goodsListSection = document.getElementById('goods-list-section'); // добавил косяк с первого урока
var buttonBasket = document.getElementById('basket-btn');
var blockForGood = document.querySelector('.goods-list');

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// const goods = [
//     {title: 'Мячи', price: 1000, src: 'image/products_photo/мячи.jpg'},
//     {title: 'Футболки', price: 1500, src: 'image/products_photo/футболки.jpg'},
//     {title: 'Шорты', price: 700, src: 'image/products_photo/шорты.jpg'},
// ];

//Класс для товара
class GoodsItem {
    constructor(title, price, src) {
        this.title = title;
        this.price = price;
        this.src = src;
    }

    render() {
        return `<div
    class="goodsitem"><h3>${this.title}</h3><p>${this.price}</p><p>${this.src}</p></div>`;
    }
}

//Класс списка товара
class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        makeGetRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                this.goods = JSON.parse(goods);
                console.log(`${goods}`)
            })
            .then(() => {
                this.render()
            })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        blockForGood.innerHTML = listHtml;
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

function makeGetRequest(url) {
    return new Promise ((resolve, reject) => {
        let xhr;
        let fakeError = Math.round(Math.random() * 100);
        console.log(fakeError);

        if ( 20 < fakeError && fakeError <= 40) {
            url += 'n/a_file_at_server';
        }
        if (fakeError <= 20) {
            setTimeout(() => {
                reject('Время ожидание истекло')
            }, 3000);
        }
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                xhr.status === 404 ? reject (`404 - файл не найден `) :
                    resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        if (fakeError > 20) {
            xhr.send();
        }
    })
}
const div = document.getElementById('body');

makeGetRequest(`${API_URL}/catalogData.json`)
    .then((response) => {
        div.innerText += response;
    })
    .catch((error) => {
        div.innerText = error;
    });
