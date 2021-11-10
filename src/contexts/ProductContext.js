import React, { createContext, useReducer } from 'react';
import axios from 'axios'
export const productsContext = createContext()

const INIT_STATE = {
  products: [],
  currentProduct: {}
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload }
    case "GET_CURRENT_PRODUCT":
      return { ...state, currentProduct: action.payload }
    default: return state
  }
}

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  const getProducts = async (params="") => {
    const { data } = await axios(`http://localhost:8000/products?${params}`)
    dispatch({
      type: "GET_PRODUCTS",
      payload: data
    })

  }
  
  const getCurProduct = async (id) => {
    const { data } = await axios(`http://localhost:8000/products/${id}`)
    dispatch({
      type: "GET_CURRENT_PRODUCT",
      payload: data
    })
  }

  return (
    <productsContext.Provider value={{
      products: state.products,
      currentProduct: state.currentProduct,

      getProducts,
      getCurProduct

    }}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;