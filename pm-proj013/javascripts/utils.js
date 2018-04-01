function $(elemento, context) {
  if (context) {
    return context.querySelector(elemento);
  }
  else {
    return document.querySelector(elemento);
  }
}