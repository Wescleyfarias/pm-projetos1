class GroceryItem {  
  constructor(item) {
    this.name = item.name;
    this.minimumStock = item.minimumStock;
    this.amountStock = item.amountStock;
  }
  
  hasToBuy() {
    return this.amountStock < this.minimumStock;
  }
  
  render(el) {
    this.el = el;
    const cssClass = this.hasToBuy() ? "hasToBuy" : ""; 
    el.innerHTML = $("#templateItem").innerHTML
    .replace(/{{cssClass}}/g, cssClass)
    .replace(/{{name}}/g, this.name)
    .replace(/{{minimumStock}}/g, this.minimumStock)
    .replace(/{{amountStock}}/g, this.amountStock);
    this.attachEvents();
  }
  
  attachEvents() {
    $(".description", this.el).addEventListener("click", this.onClickDescription.bind(this));
    $(".delete", this.el).addEventListener("click", this.onClickDelete.bind(this));
    $(".minus", this.el).addEventListener("click", this.onClickMinus.bind(this));
    $(".plus", this.el).addEventListener("click", this.onClickPlus.bind(this));
  }
  
  onClickDelete() {
    const id = this.el.getAttribute("id").replace("_", "");this.el.remove();
    groceryList.remove(parseInt(id));
    //this.el.remove();
  }

  onClickPlus() {
    const amount = $(".amountStock", this.el);
    const amountValue = parseInt(amount.innerHTML) + 1; 
    amount.innerHTML = this.amountStock = amountValue; 
    groceryList.updateList.show();
  }

  onClickMinus() {
    const amount = $(".amountStock", this.el);
    const amountValue = parseInt(amount.innerHTML);
    if (amountValue > 0) {
      amount.innerHTML = this.amountStock = amountValue - 1;
    }
    groceryList.updateList.show();
  }
  
  onClickDescription(event) {
    const actions = event.currentTarget.nextElementSibling;
    actions.classList.toggle("hidden");
    groceryList.inputItem.hideMinimumStock();
  }
  
}