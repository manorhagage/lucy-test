import './Table.css';

import TableRow from './Components/TableRow';

function Table({ fields, diamonds }) 
{
    return (
        <table className='table'>
            <thead>
                <TableRow data={ fields } />
            </thead>
            <tbody>
                {
                    diamonds.map(( diamond, index ) =>
                    (
                        <TableRow key={ index } data={ diamond } />
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;