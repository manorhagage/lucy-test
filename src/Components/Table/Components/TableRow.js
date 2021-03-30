import document from '../../../Static/document.svg';
import video from '../../../Static/video-camera.svg';

function TableRow({ data }) 
{
    function renderSwitch( data ) 
    {
        switch( data[0] ) 
        {
          case 'ImageLink':
            return <img src={ data[1] } />;
          case 'CertificateLink':
            return <a href={ data[1] } target='_blank'> <img src={ document } /> </a>;
          case 'VideoLink':
            return <a href={ data[1] } target='_blank'> <img src={ video } /> </a>;
          default:
            return data[1];
        }
      }
    return (
        <tr>
            { 
                Object.entries( data ).map(( key ) => 
                (
                    <td key={ key[0] } className={ key[0] }>
                        { renderSwitch( key ) }
                    </td>
                )) 
            }
        </tr>
    )
}

export default TableRow;