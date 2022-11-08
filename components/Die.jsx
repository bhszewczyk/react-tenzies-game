import React from 'react';
import './die.css';

export default function Die(props) {
	console.log('die component', props);
	return (
		<div className='die'>
			<span>{props.die.value}</span>
		</div>
	);
}
