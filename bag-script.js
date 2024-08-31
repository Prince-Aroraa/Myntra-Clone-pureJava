let bagItemObj;
onLoad();

function onLoad() {
  let cartItemElement = document.querySelector(".cart_item_list");
  if (!cartItemElement) {
    return;
  } else {
    loadBagItemObj();
    displayBagItems();
    displayBagSummary();
  }
}

function handleCloseBtn(itemId) {
  console.log("deleted", itemId);
  bagItem = bagItem.filter((item) => item !== itemId);
  localStorage.setItem("bagItem", JSON.stringify(bagItem));
  onLoad();
}

function loadBagItemObj() {
  bagItemObj = bagItem.map((itemId) => {
    for (i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObj);
}

function displayBagItems() {
  let cartItemElement = document.querySelector(".cart_item_list");
  let bagItemHtml = "";
  bagItemObj.forEach((bagItem) => {
    bagItemHtml += generateItemHtml(bagItem);
  });
  cartItemElement.innerHTML = bagItemHtml;
}


function displayBagSummary(){
    price_detail = bagItemObj.length;
    total_MRP =0
    discount_value =0
    total_discount = 0
    curr_price = 0

    bagItemObj.forEach(item=>{
        total_MRP += item.original_price;
        curr_price += item.current_price;
        discount_value = total_MRP - curr_price;

    })

    let rightBlockElement = document.querySelector('.right_block');
    rightBlockElement.innerHTML = `<div class="order_container">
            <div class="order_detail">PRICE DETAILS (${price_detail} item)</div>
            <div class="order_summary">
              <div class="price_detail">
                <span class="price_span">Total MRP</span>
                <span class="price_detail_value">₹${total_MRP}</span>
              </div>
              <div class="price_detail">
                <span class="price_span">Discount on MRP</span>
                <span class="price_detail_value">
                  <span class="price_detail_free">₹${discount_value}</span>
                </span>
              </div>
              <div class="price_detail">
                <span class="price_span">Coupon discount</span>
                <span class="price_detail_value">
                  <span class="apply_coupon">Apply Coupon</span>
                </span>
              </div>
              <div class="price_detail">
                <span class="price_span"
                  >Platform fee
                  <span class="know_more">Know More</span>
                </span>
                <span class="price_detail_value">
                  <span class="price_detail_free">FREE</span>
                </span>
              </div>
              <div class="price_detail shipping_text">
                <span class="price_span"
                  >Shipping fee
                  <span class="know_more">Know More</span>
                </span>
                <span class="price_detail_value">
                  <span class="shipping_fee">₹79</span>
                  <span class="price_detail_free">FREE</span>
                </span>
              </div>
              <div class="free_shipping_text">Free shipping for you</div>
              <div class="order_total">
                <span class="total_amount">Total Amount</span>
                <span class="total_amount_value">₹${curr_price}</span>
              </div>
            </div>
            <div>
              <button class="place_order_btn">
                <div class="place_order">place order</div>
              </button>
            </div>
          </div>`
}

function generateItemHtml(item) {
  return `<div class="card_item">
                          <span class="material-symbols-outlined close_btn" onclick="handleCloseBtn(${item.id});">
                            close
                            </span>
                            <div class="cart_image"><img src="${item.image}" alt=""></div>
                            <div class="cart_content">
                                <p class="item_brand">${item.company}</p>
                                <p class="item_name">${item.item_name}</p>
                                <p class="item_seller">Sold by: ARVIND LIFESTYLE BRANDS LIMITED</p>
                                <div class="qty_container">
                                    <span>Qty: 1</span>
                                </div>
                                <div class="item_price_container">
                                    <span class="item_curr_price">₹${item.current_price}</span>
                                    <span class="item_actual_price">₹${item.original_price}</span>
                                    <span class="item_discount">${item.discount_percentage}%OFF</span>
                                </div>
                                <div class="return_period_container">
                                    <span class="material-symbols-outlined return_symbol">keyboard_return</span>
                                    <span class="item_return_period">${item.return_period} days</span>
                                    <span class="return_available">return available</span>
                                </div>
                            </div>
                        </div>`;
}


