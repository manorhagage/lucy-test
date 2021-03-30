import { useEffect, useState } from 'react';

import './App.css';
import { Loader } from './Components/Loader';

function App() 
{
	const [ diamonds, setDiamonds ] = useState();
	const [ fields, setFields ] = useState();

	// Read Diamonds file and arange data
	useEffect( async () => 
	{
		const file = await fetch( './Diamonds.csv' )
		.then( response => response.text() )
		.then( text => { return text })

		const data = csvToArray( file );
		setFields( data.shift() );
		setDiamonds( data );
	},[])

	// Convert string to 2D array
	function csvToArray ( csv ) 
	{
		let rows = [];
		rows = csv.split("\n");
	
		return rows.map( row => 
		{
			return row.split(",");
		});
	};

	// Sum total diamonds price
	function totalPrice()
	{
		let totalPrice = 0;
		diamonds.map( diamond => 
		{
			totalPrice += parseFloat( diamond[ diamond.length - 1 ] );
		});
		return totalPrice;
	}
	
	return (
		<div className="App">
			{
				!diamonds 
				? <Loader /> 
				: 
				<> 
					<div>
						Number of diamonds: { diamonds.length }
						Total Price: { totalPrice() }
					</div>
				</>
			}
		</div>
	);
}

export default App;