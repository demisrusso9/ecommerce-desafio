import React, { useEffect, useContext, useState } from 'react'
import { ProductsContext } from '../contexts/ProductsContext'
import { formatPrice } from '../utils/formatPrice'
import { MdDelete } from 'react-icons/md'
import styles from '../styles/pages/Checkout.module.scss'

export default function Checkout() {
  const { cart, removeFromCart } = useContext(ProductsContext)
  const [shipping, setShipping] = useState(0)

  const totalValue = cart.reduce((acc, curr) => curr.price + acc, 0)

  const calcShipping = () => {
    totalValue > 250 ? setShipping(0) : setShipping(cart.length * 10)
  }

  useEffect(() => calcShipping(), [cart])

  return (
    <div className={styles.container}>
      <section className={styles.products}>
        {cart.map((item) => (
          <div key={item.id}>
            <figure>
              <img src={`/assets/${item.image}`} alt='Jogo' />
            </figure>

            <div className={styles.display}>
              <span>{item.name}</span>

              <div className={styles.details}>
                <small>{item.score}</small>
                <small>Qnt: {item.quantity}</small>
                <span>{formatPrice(item.price)}</span>
              </div>
            </div>

            <MdDelete onClick={() => removeFromCart(item.id)} size={40} />
          </div>
        ))}
      </section>

      <section className={styles.checkout}>
        <div>
          <h1>Checkout</h1>

          <small>
            Itens no carrinho: <strong>{cart.length}</strong>
          </small>
        </div>

        <div className={styles.prices}>
          <p>
            Frete<strong>{formatPrice(shipping)}</strong>
          </p>

          <p>
            Total<strong>{formatPrice(totalValue)}</strong>
          </p>
        </div>
      </section>
    </div>
  )
}
