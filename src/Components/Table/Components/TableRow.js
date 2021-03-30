
function TableRow({ data }) 
{
    function renderSwitch( data ) 
    {
        switch( data[0] ) 
        {
          case 'ImageLink':
            return <img src={ data[1] } />;
          case 'CertificateLink':
            return <a href={ data[1] } > link </a>;
          case 'VideoLink':
            return <a href={ data[1] } > link </a>;
          default:
            return data[1];
        }
      }
    return (
        <tr>
            { 
                Object.entries( data ).map(( key ) => 
                (
                    <td key={ key[0] } >
                        { renderSwitch( key ) }
                    </td>
                )) 
            }
        </tr>
    )
}

export default TableRow;