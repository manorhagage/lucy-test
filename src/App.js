import { useEffect, useState } from 'react';

import './App.css';
import { Filters } from './Components/Filters';
import { Loader } from './Components/Loader';
import { Table } from './Components/Table';

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

		setDiamonds( data );
	},[])

	// Convert string to 2D array
	function csvToArray ( csv ) 
	{
		let rows = [];

		// Split to arrays by new row
		rows = csv.split('\n');

		// Split headers to array and remove spaces
		const arrayOfFields = (( rows.shift() ).replace(/ /g,'')).split(',');

		setFields( arrayOfFields );
	
		// Split diamonds to objects
		return rows.map( row => 
		{
			let arr = row.split(',');

			const obj = {};
			for (var i = 0; i < arr.length; ++i)
				obj[ arrayOfFields[i] ] = arr[i];
			return obj;
		});
	};

	// Sum total diamonds price
	function totalPrice()
	{
		let totalPrice = 0;
		diamonds.map( diamond => 
		{
			totalPrice += parseFloat( diamond['PPC'] * diamond['Carat'] );
		});
		return totalPrice;
	}
	
	return (
		<div className='App'>
			{
				!diamonds 
				? <Loader /> 
				: 
				<> 
					<div className='general-info'>
						<p>
							Number of diamonds: { diamonds.length }
						</p>
						<p>
							Total Price: { totalPrice() }
						</p>
					</div>
					<Filters />
					<Table fields={ fields } diamonds={ diamonds } />
				</>
			}
		</div>
	);
}

export default App;