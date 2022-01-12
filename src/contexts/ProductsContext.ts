import { createContext } from 'react'
import { IProducts } from '../interfaces/IProducts'

type ICart = {
  cart: IProducts[]
  list: IProducts[]
  desc: boolean
  addToCart: (product: IProducts) => void
  removeFromCart: (id: number) => void
  sortProductsBy: (sort: string) => void
}

export const ProductsContext = createContext({} as ICart)
