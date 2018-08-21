import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import icon from './icon.png';

const Logo = () => {
	return (
		<div className='pa3'>
			<Tilt className="Tilt  br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner pa3">
			 		<img src={icon} alt='Logo' style={{ padding: '5px'}}/>
			 	</div>
			</Tilt>
		</div>
	);
}

export default Logo;