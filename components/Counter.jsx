import React from 'react';

export default function Counter(props) {
	return (
		<div className='counter'>
			<p>
				Rolls: <span>{props.count}</span>
			</p>
			{props.toBeat && (
				<p>
					To beat: <span>{props.toBeat}</span>
				</p>
			)}
		</div>
	);
}
