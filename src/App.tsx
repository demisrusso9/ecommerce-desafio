import { useState, useEffect } from 'react'
import { notify } from './utils/notification'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { ProductsContext } from './contexts/ProductsContext'
import { IProducts } from './interfaces/IProducts'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import products from './products.json'

import 'react-toastify/dist/ReactToastify.css'
import styles from './styles/pages/App.module.scss'

function App() {
  const getLocalValue = () => {
    const local: IProducts[] = JSON.parse(String(localStorage.getItem('cart')))
    return local || []
  }

  const [cart, setCart] = useState<IProducts[]>(getLocalValue())
  const [list, setList] = useState(products)
  const [desc, setDesc] = useState(false)

  const addToCart = (product: IProducts) => {
    if (cart.some((e) => e.name === product.name)) {
      return notify('warn', 'Produto já está no carrinho')
    }

    setCart([product, ...cart])
    return notify('', 'Adicionado ao carrinho')
  }

  const removeFromCart = (id: number) =>
    setCart(cart.filter((product) => product.id !== id))

  const sortProductsBy = (sort: string) => {
    list.sort((a: any, b: any) => {
      if (a[sort] < b[sort]) return -1
      if (a[sort] > b[sort]) return 1
      return 0
    })

    if (desc) list.reverse()
    setList(list)
    setDesc((prev) => !prev)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <Router>
      <header className={styles.header}>
        <h1>Demis Russo Games</h1>

        <Link to='/'>Products</Link>
        <Link to='/checkout'>Checkout</Link>
      </header>

      <ProductsContext.Provider
        value={{
          cart,
          list,
          desc,
          addToCart,
          removeFromCart,
          sortProductsBy
        }}
      >
        <Switch>
          <Route path='/' exact component={Products} />
          <Route path='/checkout' component={Checkout} />
        </Switch>
      </ProductsContext.Provider>
    </Router>
  )
}

export default App
