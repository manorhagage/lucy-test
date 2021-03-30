import { useEffect, useState } from 'react';

import './App.css';
import { Filters } from './Components/Filters';
import { Loader } from './Components/Loader';
import { Table } from './Components/Table';

function App() 
{
	const [ diamonds, setDiamonds ] = useState();
	const [ filteredDiamonds, setFilteredDiamonds ] = useState();
	const [ fields, setFields ] = useState();
	const [ filters, setFilters ] = useState(
		[
			{'field': 'Shape', 'type': 'option', 'value': '' }, 
			{'field': 'Carat', 'type': 'range', 'value': '' }, 
			{'field': 'Color', 'type': 'option', 'value': '' }, 
			{'field': 'Clarity', 'type': 'option', 'value': '' }, 
			{'field': 'Cut', 'type': 'option', 'value': ''  }, 
			{'field': 'Polish', 'type': 'option', 'value': '' }, 
			{'field': 'Symmetry', 'type': 'option', 'value': '' }, 
			{'field': 'Fluorescent', 'type': 'option', 'value': ''}
		]);

	// Read Diamonds file and arange data
	useEffect( async () => 
	{
		const file = await fetch( './Diamonds.csv' )
		.then( response => response.text() )
		.then( text => { return text })

		const data = csvToArray( file );

		setDiamonds( data );
		setFilteredDiamonds( data );

	},[])

	// Get all diamonds every filter change
	useEffect(() => 
	{
		if( !diamonds )
		{
			return;
		}

		let tempDiamonds = diamonds;
		
		filters.forEach( filter => 
		{
			// Skip empty filters
			if( filter.value === '' || filter.value === '-' )
			{
				return;
			}

			// Filter types
			if( filter.type === 'range' )
			{
				const arrayRange = ( filter.value ).split('-');
				tempDiamonds = tempDiamonds.filter( diamond => diamond[ filter.field ] >= arrayRange[0] && diamond[ filter.field ] <= arrayRange[1] );
			}
			else
			{
				tempDiamonds = tempDiamonds.filter( diamond => diamond[ filter.field ] === filter.value );
			}
		});

		setFilteredDiamonds( tempDiamonds );
	},[ filters ]);

	

	// Convert string to 2D array
	function csvToArray ( csv ) 
	{
		let rows = [];

		// Split to arrays by new row
		rows = csv.split('\n');

		// Split headers to array and remove spaces
		const arrayOfFields = (( rows.shift() ).replace( /\s*/g, '' )).split(',');

		setFields( arrayOfFields );
	
		// Split diamonds to objects
		return rows.map( row => 
		{
			let arr = row.split(',');

			const obj = {};
			for (let i = 0; i < arr.length; ++i)
				obj[ arrayOfFields[i] ] = arr[i];
			return obj;
		});
	};

	// Sum total diamonds price
	function totalPrice()
	{
		let totalPrice = 0;
		filteredDiamonds.map( diamond => 
		{
			totalPrice += parseFloat( diamond['PPC'] * diamond['Carat'] );
		});
		return totalPrice.toFixed(2);
	}
	
	return (
		<div className='App'>
			{
				!filteredDiamonds 
				? <Loader /> 
				: 
				<> 
					<div className='general-info'>
						<p>
							Number of diamonds: { filteredDiamonds.length }
						</p>
						<p>
							Total Price: { totalPrice() }
						</p>
					</div>
					<Filters setFilters={ setFilters } />
					<Table fields={ fields } diamonds={ filteredDiamonds } />
				</>
			}
		</div>
	);
}

export default App;