import { useRef, useState, useEffect } from "react";

function FilterTypeRange({ name, filters, setFilters }) 
{
    const [ showOptions, setShowOptions ] = useState( false );
    const minRef = useRef('');
    const maxRef = useRef('');
    const [ activeFilter, setActiveFilter ] = useState('');

    function changeFilter()
    {
        setActiveFilter( minRef.current.value + '-' + maxRef.current.value );
    }

    useEffect(() => 
    {
        if( activeFilter != '' )
        {
            setFilters( prev =>
                prev.map(({ field, value, ...rest }) => 
                ({
                    ...rest, field,
                    value: field == name ? activeFilter : value
                }))
            );
        }
    }, [ activeFilter ])
    
    return (
        <div className='filter'>
            <div onClick={ () => { setShowOptions( !showOptions ) }}>
                { name }
                <label className='active-filter'> { activeFilter } </label>
            </div >
            { 
                showOptions &&
                <div className='options'>
                    <input ref={ minRef } type='text' placeholder='Min' onChange={ changeFilter } />
                    <input ref={ maxRef } type='text' placeholder='Max' onChange={ changeFilter } />
                </div>
            }
        </div>
    )
}

export default FilterTypeRange;