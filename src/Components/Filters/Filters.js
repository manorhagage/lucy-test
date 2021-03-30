import './Filters.css';

import FilterTypeOptions from './Components/FilterTypeOptions';
import FilterTypeRange from './Components/FilterTypeRange';

function Filters({ filters, setFilters }) 
{
    return (
        <div className='filters'>
            <FilterTypeOptions name='Shape' options={[ 'ROUND', 'OVAL', 'PEAR' ]} filters={ filters } setFilters={ setFilters } />
            <FilterTypeRange name='Carat' filters={ filters } setFilters={ setFilters }/>
            <FilterTypeOptions name='Color' options={[ 'E', 'F' , 'G', 'H', 'D', 'FANCY', 'I', 'S', 'Q-R' ]} filters={ filters } setFilters={ setFilters } />
            <FilterTypeOptions name='Clarity' options={[ 'VVS1', 'VVS2' , 'SI1', 'VS1', 'I2', 'VS2', 'SI2', 'IF' ]} filters={ filters } setFilters={ setFilters } />
            <FilterTypeOptions name='Cut' options={[ 'EX', 'VG' , 'GD' ]} filters={ filters } setFilters={ setFilters } />
            <FilterTypeOptions name='Polish' options={[ 'EX', 'VG' , 'GD' ]} filters={ filters } setFilters={ setFilters } />
            <FilterTypeOptions name='Symmetry' options={[ 'EX', 'VG' , 'GD' ]} filters={ filters } setFilters={ setFilters } />
            <FilterTypeOptions name='Fluorescent' options={[ 'M', 'N' , 'ST', 'F' ]} filters={ filters } setFilters={ setFilters } />
        </div>
    )
}

export default Filters;