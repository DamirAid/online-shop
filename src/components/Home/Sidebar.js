import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from "@mui/material";
import React, { useContext, useState } from "react";
import { productsContext } from "../../contexts/ProductContext";
import history from '../../helpers/history';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
const Sidebar = () => {
	const { getProducts } = useContext(productsContext);
	const [memory, setMemory] = useState(getMemory());
	const [priceValue, setPriceValue] = useState(getPrice());
	function getMemory() {
		const search = new URLSearchParams(history.location.search);
		return search.get('memory')
	}
	function getPrice() {
		const priceSearch = new URLSearchParams(history.location.search);
		return [priceSearch.get('price_gte'), priceSearch.get('price_lte')]
	}
	function handleChangeMemory(e) {
		if (e.target.value === "all") {
			history.push(`${history.location.pathname.replace('memory')}`)
			getProducts()
			setMemory(e.target.value)
			return
		}
		const search = new URLSearchParams(history.location.search);
		search.set('memory', e.target.value)
		history.push(`${history.location.pathname}?${search.toString()}`);
		getProducts(search.toString())
		setMemory(e.target.value)
	}

	const handleChangePrice = (e) => {
		const priceSearch = new URLSearchParams(history.location.search);
		priceSearch.set('price_gte', e.target.value[0])
		priceSearch.set('price_lte', e.target.value[1])
		history.push(`${history.location.pathname}?${priceSearch.toString()}`);
		getProducts(priceSearch.toString())
		setPriceValue(e.target.value);
	};
	function valuetext(value) {
		return `${value}`;
	}
	return (
		<Grid item md={3}>
			<Paper sx={{ p: '20px' }}>
				<Box sx={{mb:2}}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Memory</FormLabel>
						<RadioGroup value={memory} onChange={handleChangeMemory} aria-label="memory" name="memory1">
							<FormControlLabel value="64" control={<Radio />} label="64" />
							<FormControlLabel value="128" control={<Radio />} label="128" />
							<FormControlLabel value="256" control={<Radio />} label="256" />
							<FormControlLabel value="512" control={<Radio />} label="512" />
							<FormControlLabel value="1024" control={<Radio />} label="1024" />
							<FormControlLabel value="all" control={<Radio />} label="All" />
						</RadioGroup>
					</FormControl>
				</Box>
				<Box sx={{mb:2}}>
					<FormLabel component="price">Price</FormLabel>
					<Slider
						getAriaLabel={() => 'Temperature range'}
						value={priceValue}
						onChange={handleChangePrice}
						valueLabelDisplay="auto"
						getAriaValueText={valuetext}
						min={0}
						max={6000}
					/>
				</Box>
			</Paper>
		</Grid>
	)
};

export default Sidebar;
