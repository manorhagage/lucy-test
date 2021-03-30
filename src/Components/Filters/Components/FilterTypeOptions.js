import { useState } from "react";

function FilterTypeOptions({ name, options, setFilters }) 
{
    const [ showOptions, setShowOptions ] = useState( false );
    const [ activeFilter, setActiveFilter ] = useState('');

    // Change filters by selceted option
    function changeFilter( selectedOption )
    {
        setShowOptions( !showOptions );

        // Remove filter by reClick the same option
        if( selectedOption === activeFilter )
        {
            setActiveFilter( '' );

            setFilters( prev =>
                prev.map(({ field, value, ...rest }) => 
                ({
                    ...rest, field,
                    value: field === name ? '' : value
                }))
            );
        }
        else
        {
            setActiveFilter( selectedOption );

            setFilters( prev =>
                prev.map(({ field, value, ...rest }) => 
                ({
                    ...rest, field,
                    value: field === name ? selectedOption : value
                }))
            );
        }
    }

    return (
        <div className='filter'>
            <div onClick={ () => { setShowOptions( !showOptions ) }}>
                { name }
                <label className='active-filter'> { activeFilter } </label>
            </div>
            { 
                showOptions &&
                <div className='options choose'>
                    {
                        options.map(( option, index ) =>
                        (
                            <span key={ index } className={ activeFilter === option ? 'active' :'' } onClick={() => changeFilter( option ) }> { option } </span>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default FilterTypeOptions;