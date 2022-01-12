import React, { useContext, useState } from 'react'
import { ProductsContext } from '../contexts/ProductsContext'
import { formatPrice } from '../utils/formatPrice'
import { Link } from 'react-router-dom'
import {
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
  FaSortAmountDownAlt,
  FaSortAmountDown,
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaShoppingCart
} from 'react-icons/fa'
import { TiInputChecked } from 'react-icons/ti'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../styles/pages/Products.module.scss'

export default function Products() {
  const { cart, list, desc, addToCart, sortProductsBy } =
    useContext(ProductsContext)

  return (
    <div className={styles.container}>
      <section className={styles.filter}>
        <label htmlFor='name-icon' className={styles.iconButton}>
          <input
            type='radio'
            name='icon'
            id='name-icon'
            onClick={() => sortProductsBy('name')}
          />
          <span>
            {desc ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />} Name
          </span>
        </label>

        <label htmlFor='price-icon' className={styles.iconButton}>
          <input
            type='radio'
            name='icon'
            id='price-icon'
            onClick={() => sortProductsBy('price')}
          />
          <span>
            {desc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
            Price
          </span>
        </label>

        <label htmlFor='score-icon' className={styles.iconButton}>
          <input
            type='radio'
            name='icon'
            id='score-icon'
            onClick={() => sortProductsBy('score')}
          />
          <span>
            {desc ? <FaSortNumericDown /> : <FaSortNumericDownAlt />}
            Score
          </span>
        </label>

        <Link to='/checkout' className={styles.cart}>
          <FaShoppingCart size={30} />
          <span>{cart.length}</span>
        </Link>
      </section>

      <section className={styles.catalog}>
        {list.map((product) => (
          <div key={product.id}>
            {cart.some((e) => e.name === product.name) && <TiInputChecked />}

            <img src={`/assets/${product.image}`} alt='Jogo' />
            <p>{product.name}</p>

            <div className={styles.details}>
              <span>{product.score}</span>
              <span>{formatPrice(product.price)}</span>
            </div>

            <div className={styles.quantity}>
              <label htmlFor=''>Quantity :</label>
              <input type='number' min={0} max={99} defaultValue={0} />
            </div>

            <button onClick={() => addToCart(product)}>
              <FaShoppingCart size={18} />
              Add to cart
            </button>
          </div>
        ))}
      </section>

      <ToastContainer />
    </div>
  )
}
