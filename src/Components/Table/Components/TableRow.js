
function TableRow({ data }) 
{
    return (
        <tr>
            { 
                data.map(( d, index ) => 
                (
                    <td key={ index } >{ d }</td>
                )) 
            }
        </tr>
    )
}

export default TableRow;