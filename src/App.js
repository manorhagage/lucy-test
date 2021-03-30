import { useEffect, useState } from 'react';

import './App.css';
import { Filters } from './Components/Filters';
import { Loader } from './Components/Loader';
import { Table } from './Components/Table';

function App() 
{
	const [ diamonds, setDiamonds ] = useState();
	const [ filterdDiamonds, setFilterdDiamonds ] = useState();
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
		setFilterdDiamonds( data );

	},[])

	// Filter diamonds every filter change
	useEffect(() => 
	{
		if( !diamonds )
		{
			return;
		}

		filters.forEach( filter => 
		{
			if( filter.value !== '' )
			{
				setFilterdDiamonds( diamonds.filter( diamond => diamond[ filter.field ] === filter.value ));
			}
		});

	},[ filters ])

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
		filterdDiamonds.map( diamond => 
		{
			totalPrice += parseFloat( diamond['PPC'] * diamond['Carat'] );
		});
		return totalPrice.toFixed(2);
	}
	
	return (
		<div className='App'>
			{
				!filterdDiamonds 
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
					<Filters filters={ filters } setFilters={ setFilters } />
					<Table fields={ fields } diamonds={ filterdDiamonds } />
				</>
			}
		</div>
	);
}

export default App;