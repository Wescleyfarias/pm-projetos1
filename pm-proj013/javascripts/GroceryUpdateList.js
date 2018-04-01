class GroceryUpdateList {
  constructor() {
    this.el = $(".updateList");
    this.attachEvents();
  }
  
  attachEvents() {
    $(".save", this.el).addEventListener("click", this.onClickSave.bind(this));
    $(".cancel", this.el).addEventListener("click", this.onClickCancel.bind(this));
  }
  
  show() {
    this.el.classList.remove("hidden");
    $(".inputItem").classList.add("hidden");
  }
  
  hide() {
    this.el.classList.add("hidden");
    $(".inputItem").classList.remove("hidden");
  }
  
  onClickSave() {
    groceryList.saveToLocalStorage();
    groceryList.render();
    this.hide();
  }
  
  onClickCancel() {
    this.hide();
  }
  
}


