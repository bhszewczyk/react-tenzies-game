import React from 'react';
import './die.css';

export default function Die(props) {
	return (
		<div className='die'>
			<span>{props.dice.value}</span>
		</div>
	);
}
