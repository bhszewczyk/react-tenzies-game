import React from 'react';
import './die.css';

export default function Die(props) {
	return (
		<div
			className={props.die.isHeld ? 'held die' : 'die'}
			onClick={props.holdDie}
		>
			<span className={props.die.isHeld ? 'held' : ''}>{props.die.value}</span>
		</div>
	);
}
