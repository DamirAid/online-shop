import { Container, Grid } from '@mui/material';
import React from 'react';
import Content from './Content';
import './Home.css'
import Sidebar from './Sidebar';
const Home = () => {
	return (
		<section className="product__block-details">
			<Container maxWidth='xl'>
				<Grid container spacing={3}>
					<Sidebar />
					<Content />
				</Grid>
			</Container>
		</section>
	);
};

export default Home;