import { useRef, useState, useEffect } from "react";

function FilterTypeRange({ name, filters, setFilters }) 
{
    const [ showOptions, setShowOptions ] = useState( false );
    const [ state, setState ] = useState({ min: '', max: '' })
    const [ activeFilter, setActiveFilter ] = useState('');

    function handleChange( e ) 
    {
        const value = e.target.value;
        console.log( value );
        setState({ ...state, [ e.target.name ]: value });

    };
    useEffect(() => 
    {
        const range = state.min + '-' + state.max;
        setActiveFilter( range );

        setFilters( prev =>
            prev.map(({ field, value, ...rest }) => 
            ({
                ...rest, field,
                value: field == name ? range : value
            }))
        );
        
    }, [ state ]);
    
    return (
        <div className='filter'>
            <div onClick={ () => { setShowOptions( !showOptions ) }}>
                { name }
                <label className='active-filter'> { activeFilter } </label>
            </div >
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