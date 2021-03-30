import './Filters.css';

import FilterTypeOptions from './Components/FilterTypeOptions';
import FilterTypeRange from './Components/FilterTypeRange';

function Filters({ setFilters }) 
{
    return (
        <div className='filters'>
            <FilterTypeOptions name='Shape' options={[ 'ROUND', 'OVAL', 'PEAR' ]} setFilters={ setFilters } />
            <FilterTypeRange name='Carat' setFilters={ setFilters }/>
            <FilterTypeOptions name='Color' options={[ 'E', 'F' , 'G', 'H', 'D', 'FANCY', 'I', 'S-T', 'Q-R' ]} setFilters={ setFilters } />
            <FilterTypeOptions name='Clarity' options={[ 'VVS1', 'VVS2' , 'SI1', 'VS1', 'I2', 'VS2', 'SI2', 'IF' ]} setFilters={ setFilters } />
            <FilterTypeOptions name='Cut' options={[ 'EX', 'VG' , 'GD' ]} setFilters={ setFilters } />
            <FilterTypeOptions name='Polish' options={[ 'EX', 'VG' , 'GD' ]} setFilters={ setFilters } />
            <FilterTypeOptions name='Symmetry' options={[ 'EX', 'VG' , 'GD' ]} setFilters={ setFilters } />
            <FilterTypeOptions name='Fluorescent' options={[ 'M', 'N' , 'ST', 'F' ]} setFilters={ setFilters } />
        </div>
    )
}

export default Filters;