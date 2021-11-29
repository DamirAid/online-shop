import { Button, CircularProgress, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { productsContext } from "../../contexts/ProductContext";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Cart.css'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


const Cart = () => {
	const { cart, getCart, changeProductCount } = useContext(productsContext)
	useEffect(() => {
		getCart()
	}, [])
	console.log(cart)
	return (
		<Container>
			{cart.products ? (
				<div className="cart">
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>

									<StyledTableCell>Image</StyledTableCell>
									<StyledTableCell >Title&nbsp;(g)</StyledTableCell>
									<StyledTableCell>Price&nbsp;(g)</StyledTableCell>
									<StyledTableCell >Count&nbsp;(g)</StyledTableCell>
									<StyledTableCell>SubPrice&nbsp;(g)</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cart.products.map((elem) => (
									<StyledTableRow key={elem.item.id}>
										<StyledTableCell component="th" scope="row">
											<img src={elem.item.image[0]} alt="product img" />
										</StyledTableCell>
										<StyledTableCell >{elem.item.title}</StyledTableCell>
										<StyledTableCell>{elem.item.price}</StyledTableCell>
										<StyledTableCell>
											<Button onClick={elem.count+1}>+</Button>
											<input onChange={(e) => changeProductCount(e.target.value, elem.item.id)} value={elem.count} type="number" />
											{/* <Button onClick={}>-</Button> */}
										</StyledTableCell>
										<StyledTableCell >{elem.subPrice}</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<h4>Total: {cart.totalPrice}</h4>
					<button>Купить</button>
				</div>) : (<CircularProgress />)
			}
		</Container>

	);
};

export default Cart;
