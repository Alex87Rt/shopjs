const goods = [
    {title: 'Мячи', price: 1000, src: 'image/products_photo/мячи.jpg'},
    {title: 'Футболки', price: 1500, src: 'image/products_photo/футболки.jpg'},
    {title: 'Шорты', price: 700, src: 'image/products_photo/шорты.jpg'}
];


const renderGoodsItem = (title, price) => {
    return `<div class="script__product-box">
    <span class="script__product-box__name">${title}</span>
    <div class="script__product-box__price">${price}</div>
    <input type="submit" value="X" class="script-item__product-box__delete" onclick="deleteProductStringBasket()">
    </div>`
};

const renderGoodsList = () => {
    let goodsList = goods.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    goodsListSection.style.display = 'block';
};

renderGoodsList(goods);

