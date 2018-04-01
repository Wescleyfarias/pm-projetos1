class GroceryInputItem {
  
  constructor() {
    this.el = $(".inputItem");
    this.attachEvents();
  }
  
  attachEvents() {
    $("input", this.el).addEventListener("focus", this.onFocusInput.bind(this));
    $(".minus", this.el).addEventListener("click", this.onClickMinus.bind(this));
    $(".plus", this.el).addEventListener("click", this.onClickPlus.bind(this));
    $(".save", this.el).addEventListener("click", this.onClickSave.bind(this));
  }

  onClickSave() {
    if (this.get().name.length == 0) {
      alert("Preencha o nome");
    }
    else {
      groceryList.add(this.get());
      $("input", this.el).value = "";
      this.hideMinimumStock();
    }
  }
  
  onFocusInput() {
    this.showMinimumStock();
  }
  
  hideMinimumStock() {
    $(".minimumStock", this.el).classList.add("hidden");
    $(".amount", this.el).innerHTML = 1;
  }
  
  showMinimumStock() {
    $(".minimumStock", this.el).classList.remove("hidden");
  }
  
  get() {
    return {
      name: $("input", this.el).value,
      minimumStock: parseInt($(".amount", this.el).innerHTML),
      amountStock: 0
    };
  }
  
  onClickMinus() {
    if (this.get().minimumStock > 0) {
      $(".amount", this.el).innerHTML = this.get().minimumStock - 1;
    }
  }
  
  onClickPlus() {
    $(".amount", this.el).innerHTML = this.get().minimumStock + 1;
  }
  
}

