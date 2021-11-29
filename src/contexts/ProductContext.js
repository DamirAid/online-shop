import React, { createContext, useReducer } from 'react';
import axios from 'axios'
import { calcSubPrice, calcTotalPrice, getCountProductsInCart } from '../helpers/cartFunctions';
export const productsContext = createContext()

const INIT_STATE = {
	products: [],
	currentProduct: {},
	productLimit: 3,
	productPage: 1,
	allProducts: [],
	pageCount: 0,
	cartLength: getCountProductsInCart(),
	cart: {}
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case "GET_PRODUCTS":
			return { ...state, products: action.payload }
		case "GET_CURRENT_PRODUCT":
			return { ...state, currentProduct: action.payload, productPage: action.page }
		case "GET_ALL_PRODUCTS":
			return { ...state, allProducts: action.payload, pageCount: action.pageCount }
		case "CHANGE_CART_COUNT":
			return { ...state, cartLength: action.payload }
		case "GET_CART":
			return { ...state, cart: action.payload }
		default: return state
	}
}

const ProductsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	const getProducts = async (params = "", page = '1') => {

		const { data } = await axios(`http://localhost:8000/products?${params}&_limit=${state.productLimit}&_page=${page}`)
		console.log(data)
		dispatch({
			type: "GET_PRODUCTS",
			payload: data,
			page
		})
	}

	const getAllProducts = async (params = "") => {
		console.log(params)
		const { data } = await axios(`http://localhost:8000/products?${params}`)
		console.log(data)
		dispatch({
			type: "GET_ALL_PRODUCTS",
			payload: data,
			pageCount: data.length
		})
	}

	const getCurProduct = async (id) => {
		const { data } = await axios(`http://localhost:8000/products/${id}`)
		dispatch({
			type: "GET_CURRENT_PRODUCT",
			payload: data
		})
	}

	const addProductToCart = (product) => {
		let cart = JSON.parse(localStorage.getItem('cart'))
		if (!cart) {
			cart = {
				products: [],
				totalPrice: 0
			}
		}
		let newProduct = {
			item: product,
			count: 1,
			subPrice: 0
		}
		newProduct.subPrice = calcSubPrice(newProduct)
		let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
		if (filteredCart.length > 0) {
			cart.products = cart.products.filter(elem => elem.item.id !== product.id)
		} else {
			cart.products.push(newProduct)
		}

		cart.totalPrice = calcTotalPrice(cart.products)

		localStorage.setItem('cart', JSON.stringify(cart))
		dispatch({
			type: "CHANGE_CART_COUNT",
			payload: cart.products.length
		})
	}

	const getCart = () => {
		let cart = JSON.parse(localStorage.getItem('cart'))
		if (!cart) {
			cart = {
				products: [],
				totalPrice: 0
			}
		}
		dispatch({
			type: "GET_CART",
			payload: cart
		})
	}
	const changeProductCount = (count, id) => {
		let cart = JSON.parse(localStorage.getItem('cart'))
		cart.products = cart.products.map(elem => {
			if (elem.item.id === id) {
				elem.count = count
				elem.subPrice = calcSubPrice(elem)
			}
			return elem
		})
		cart.totalPrice = calcTotalPrice(cart.products)
		localStorage.setItem('cart', JSON.stringify(cart))
		getCart()
	}

	return (
		<productsContext.Provider value={{
			products: state.products,
			currentProduct: state.currentProduct,
			productPage: state.productPage,
			allProducts: state.allProducts,
			productLimit: state.productLimit,
			pageCount: state.pageCount,
			cartLength: state.cartLength,
			cart: state.cart,
			getProducts,
			getCurProduct,
			getAllProducts,
			addProductToCart,
			getCart,
			changeProductCount


		}}>
			{children}
		</productsContext.Provider>
	);
};

export default ProductsContextProvider;