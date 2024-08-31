let bagItem;
onLoad();

function onLoad() {
  let productContainerElement = document.querySelector(".product_container");
  let bagItemStr = localStorage.getItem("bagItem");
  bagItem = bagItemStr ? JSON.parse(bagItemStr) : [];
  if (!productContainerElement) {
    return;
  } else {
    displayItemsOnHomePage();
    displayBagCount();
  }
}

function addToBag(itemId) {
  bagItem.push(itemId);
  localStorage.setItem("bagItem", JSON.stringify(bagItem));
  displayBagCount();
}

function displayBagCount() {
  let bagCountElement = document.querySelector(".bag_item_count");
  let actionBagElement = document.querySelector("#bag_01");

  if (bagItem.length > 0) {
    bagCountElement.style.display = "inline";
    actionBagElement.classList.add("position");
    bagCountElement.innerHTML = bagItem.length;
  } else {
    bagCountElement.style.display = "none";
  }
}

function displayItemsOnHomePage() {
  let productContainerElement = document.querySelector(".product_container");
  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += `<div class="product">
            <div class="product_image">
              <img src="${item.image}" />
            </div>
            <div class="product_content">
              <h3 class="product_brand">${item.company}</h3>
              <h4 class="product-description">${item.item_name}</h4>
              <div class="product-price">
                <span class="product_curr_price">Rs.${item.current_price}</span>
                <span class="product_actual_price">Rs.${item.original_price}</span>
                <span class="product_discount_percentage">(${item.discount_percentage}%OFF)</span>
              </div>
              <button class="add_to_bag_btn" onclick="addToBag(${item.id})">
                <div class="add_to_bag">
                  <span class="material-symbols-outlined bag_icon"
                    >shopping_bag</span
                  >
                  <span class="bag">add to bag</span>
                </div>
              </button>
            </div>
            <div class="rating_container">
              <span>${item.rating.stars}</span>
              <span class="material-symbols-outlined star_symbol">grade</span>
              <div class="rating_count">
                <div class="separator">|</div>
                ${item.rating.count}
              </div>
            </div>
          </div>
          `;
  });

  productContainerElement.innerHTML = innerHtml;
}
