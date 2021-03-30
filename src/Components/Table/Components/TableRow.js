import { useState } from 'react';

import document from '../../../Static/document.svg';
import video from '../../../Static/video-camera.svg';

import { Modal } from '../../Modal';

function TableRow({ data }) 
{
	const [ modalIsOpen, setModalIsOpen ] = useState( false );
	
	function renderSwitch( data ) 
	{
		switch( data[0] ) 
		{
		case 'ImageLink':
			return <img src={ data[1] } onClick={ toggleModel } />;
		case 'CertificateLink':
			return <a href={ data[1] } target='_blank'> <img src={ document } /> </a>;
		case 'VideoLink':
			return <a href={ data[1] } target='_blank'> <img src={ video } /> </a>;
		default:
			return data[1];
		}
	}
	
    // Open and close modal
	function toggleModel() 
	{
        setModalIsOpen( !modalIsOpen );
	}

	return (
		<>
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

			{
				modalIsOpen && <Modal toggleModel={ toggleModel } img={ data['ImageLink'] } />
			}
		</>
	)
}

export default TableRow;