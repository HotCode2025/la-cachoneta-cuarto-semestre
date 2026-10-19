const modalContainer = document.getElementById('modal-container');
const modalOverlay = document.getElementById('modal-overlay')

const cartBtn = document.getElementById('cart-btn')
const cartCounter = document.getElementById('cart-counter')

const displayCart = () => {
  modalContainer.innerHTML = ''

  modalContainer.style.display = 'block'
  modalOverlay.style.display = 'block'

  // modal Header
  const modalHeader = document.createElement('div')

  const modalClose = document.createElement('div')
  modalClose.innerText = '✖️'
  modalClose.className = 'modal-close'
  modalHeader.append(modalClose)

  modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none'
    modalOverlay.style.display = 'none'
  })

  const modalTitle = document.createElement('div')
  modalTitle.innerText = 'Cart'
  modalTitle.className = 'modal-title'
  modalHeader.append(modalTitle)

  modalContainer.append(modalHeader)
  
  // modal Body
  if(cart.length > 0) {

    cart.forEach(product => {
      const modalBody = document.createElement('div')
      modalBody.className = 'modal-body'
      modalBody.innerHTML = `
      <div class="product">
        <img class="product-img" src="${product.img}">
        <div class="product-info">
          <h4>${product.productName}</h4>
        </div>
        <div class="quantity">
          <span class="quantity-btn-decrease">-</span>
          <span class="quantity-input">${product.quanty}</span>
          <span class="quantity-btn-increase">+</span>
        </div>
        <div class="price">${product.price * product.quanty} $</div>
        <div class="delete-product">🗑️</div>
      </div>
      `

      modalContainer.append(modalBody)

      const decrease = modalBody.querySelector('.quantity-btn-decrease')
      decrease.addEventListener('click', () => {
        if (product.quanty !==1) {
          product.quanty--
        } else {
          deleteCartProduct(product.id)
        }
        displayCart()
        displayCartCounter()
      })

      const increase = modalBody.querySelector('.quantity-btn-increase')

      increase.addEventListener('click', () => {
        product.quanty++
        displayCart()
        displayCartCounter()
      })

      //delete
      const deleteProduct = modalBody.querySelector('.delete-product')

      deleteProduct.addEventListener('click', () => {
        deleteCartProduct(product.id)
        displayCart()
      })
    })


    // modal footer
    const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0)

    const modalFooter = document.createElement('div')
    modalFooter.className = 'modal-footer'
    modalFooter.innerHTML = `
    <div class="total-price">Total: ${total} $</div>
    <button class='btn-primary' id='checkout-btn'> go to checkout </button>
    <div id="button-checkout"></div>
    `
    modalContainer.append(modalFooter)
    // Mercado Pago
    const mercadopago = new MercadoPago('APP_USR-7ceebaff-9416-448d-8ef6-9da94969ce4b', {
      locale: 'es-AR'
    })

    const checkoutButton = modalFooter.querySelector('#checkout-btn')

    checkoutButton.addEventListener('click', function () {
      checkoutButton.remove()

      const orderData = {
        quantity: 1,
        description: 'compra de ecommerce',
        price: total
      }

      fetch('http://localhost:8080/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(function (preference) {
        if (preference.id) {
          createCheckoutButton(preference.id);
        } else {
          alert('No se pudo generar el ID de la preferencia');
        }
      })
      .catch(function (error) {
        console.error(error);
        alert('Error al procesar la compra');
      });
    })

    function createCheckoutButton(preferenceId) {
      const bricksBuilder = mercadopago.bricks();

      // Limpia el contenedor HTML por si ya había un botón creado previamente
      const container = document.getElementById('button-checkout');
      container.innerHTML = '';

      const renderComponent = async (bricksBuilder) => {
        await bricksBuilder.create(
          'wallet',
          'button-checkout',
          {
            initialization: {
              preferenceId: preferenceId,
              redirectMode: 'self' // Opcional: 'modal' o 'self'
            },
            callbacks: {
              onError: (error) => console.error('Brick Error:', error),
              onReady: () => {}
            }
          }
        );
      };
      renderComponent(bricksBuilder);
    }

  } else {
    const modalText = document.createElement('h2')
    modalText.className = 'modal-body';
    modalText.innerText = 'Your cart is empty'
    modalContainer.append(modalText)
  }
}

cartBtn.addEventListener('click', displayCart)

const deleteCartProduct = (productId) => {
  const foundId = cart.findIndex(cartProduct => cartProduct.id === productId)
  cart.splice(foundId, 1)
  displayCartCounter()
}

const displayCartCounter = () => {
  const cartLenght = cart.reduce((acc, el) => acc + el.quanty, 0)

  if (cartLenght) {
    cartCounter.style.display = 'block'
  } else {
    cartCounter.style.display = 'none'
  }
  cartCounter.innerText = cartLenght
  console.log(cartLenght)
}