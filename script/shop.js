if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}

/*redystete ritorna loading, interactive o complete 
L'evento DOMContentLoaded si attiva quando l'html è caricato*/


function main() {

  let removeCartItemButtons = document.getElementsByClassName('btn-remove')
  for (let i = 0; i < removeCartItemButtons.length; i++) {
      let button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

 /* per ogni bottone di rimozione mette in ascolto per l'evento click, e se
  succede esegue la funzione passata come secondo argomento. nella funzione passata 
  come argomento, addEventListener ritorna un oggetto "event", che ha la proprietà target
  il foreach non funziona*/

  let quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  let addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementById('btn-purchase').addEventListener('click', purchaseClicked)
  /*se lo metto fuori non riesce a leggere perchè non ha caricato*/
}

function purchaseClicked() {
  alert('Acquisto Completato')
  let cartItems = document.getElementById('cart-items')
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  let buttonClicked = event.target /* il target dell'evento "click" è il bottone in questione */
  buttonClicked.parentElement.parentElement.remove() 
  /* il parent element è l'elemento che contiene il precedente, se il btn è in un div è il div.
  dobbiamo rimuovere il div che contene sia il div con l'immagine sia il div con il bottone*/
  updateCartTotal()
}


function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1 /*se è negativo o non un numero lo mette = 1 */
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  /*prende i dati*/
  let button = event.target
  let item = button.parentElement.parentElement
  let title = item.getElementsByClassName('item-title')[0].innerText
  let price = item.getElementsByClassName('item-price')[0].innerText
  let imageSrc = item.getElementsByClassName('item-image')[0].src /* ricaviamo l'attributo src dal tag img */

  /*aggiunge */
  let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  let cartItems = document.getElementById('cart-items')

  /*controllo se è già nel carrello*/
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('e\' gia\' nel carrello!')
          return
      }
  }

  let cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <div class="cart-price cart-column">${price}</div>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-remove" type="button">RIMUOVI</button>
      </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

  updateCartTotal()

}


function updateCartTotal() {
  let cartItemContainer = document.getElementById('cart-items')
  let cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart-price')[0]
    let input = cartRow.getElementsByClassName('cart-quantity-input')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ''))
    /*inner text è il testo dentro l'elemento, togliano il dollaro per renderlo un nuumero
    e lo convertiamo in un float con "parseFloat" */
    let quantity = input.value
    total = total + (price * quantity)
  }

  total = Math.round(total * 100) / 100 /*arrotonda a 2 cifre decimali, spostando la virgola di 2,
  arrotondando all'unità e rispostando indietro di 2 */
  document.getElementById('cart-total-price').innerText = '$' + total
}