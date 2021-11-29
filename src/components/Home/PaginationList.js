import React, { useState, useContext, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { productsContext } from '../../contexts/ProductContext';
import history from '../../helpers/history'
const PaginationList = () => {
	let { getProducts, productPage, productLimit, pageCount } = useContext(productsContext)

	const [page, setPage] = useState(getPagi())
	useEffect(() => {
		setPage(getPagi())
	}, [getPagi()])
	function getPagi(defaultPage) {
		const search = new URLSearchParams(history.location.search);
		defaultPage = search.get('_page')
		return !defaultPage ? 1 : defaultPage
	}


	const handleChangePagi = (event, value) => {
		productPage = value

		const pagiSearch = new URLSearchParams(history.location.search);

		pagiSearch.set('_page', productPage)
		history.push(`${history.location.pathname}?${pagiSearch.toString()}`);
		getProducts(pagiSearch.toString())

		setPage(value)
	}
	
	return (
		<>
			{
				pageCount > productLimit ? (
					<Stack spacing={2} >
						<Pagination
							count={Math.ceil(pageCount / productLimit)}
							defaultPage={productPage}
							sx={{display: 'flex', justifyContent: 'center', pt: '30px'}}
							page={+page}
							color="primary"
							onChange={handleChangePagi} />
					</Stack>
				) : null
			}

		</>
	);
};

export default PaginationList;