import React from 'react';

export default function Counter(props) {
	return (
		<div className='counter'>
			Rolls: <span>{props.count}</span>
		</div>
	);
}
