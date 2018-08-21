import React from 'react';
import './ImageLink.css';

const ImageLink = ( { onInputChange , onButtonClick } ) => {
	return (
		<div>
			<p>
				{"This is image's Face Detector"}
			</p>
			<div className='center'>
				<div className='form center pa3 br2 shadow-5'>
					<input 
					type='text' 
					className='f4 pa2 w-70 br3 ma2'
					onChange = { onInputChange }
					/>

					<button 
						className='f4 pa2 ma2 w-30 bg-light-blue br2 grow'
						onClick = { onButtonClick }
					>Detect</button>
				</div>
			</div> 
		</div>
	);
}

export default ImageLink;