import { useState, useEffect } from "react";

function FilterTypeRange({ name, setFilters }) 
{
    const [ showOptions, setShowOptions ] = useState( false );
    const [ state, setState ] = useState({ min: '', max: '' })
    const [ activeFilter, setActiveFilter ] = useState('');

    // Handle typing
    function handleChange( e ) 
    {
        const value = e.target.value;
        console.log( value );
        setState({ ...state, [ e.target.name ]: value });
    };

    // Change filters by state changes
    useEffect(() => 
    {
        const range = state.min + '-' + state.max;
        setActiveFilter( range );

        setFilters( prev =>
            prev.map(({ field, value, ...rest }) => 
            ({
                ...rest, field,
                value: field === name ? range : value
            }))
        );
        
    }, [ state ]);
    
    return (
        <div className='filter'>
            <span onClick={ () => { setShowOptions( !showOptions ) }}>
                { name }
                <label className='active-filter'> { activeFilter } </label>
            </span >
            { 
                showOptions &&
                <div className='options'>
                    <input name='min' type='text' placeholder='Min' onChange={(e) => handleChange( e ) } value={ state.min } />
                    <input name='max' type='text' placeholder='Max' onChange={(e) => handleChange( e ) } value={ state.max }/>
                </div>
            }
        </div>
    )
}

export default FilterTypeRange;