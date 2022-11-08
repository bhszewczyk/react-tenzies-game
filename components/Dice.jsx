import React from 'react';
import Die from './Die';
import './dice.css';

export default function Dice() {
	const dice = [];

	for (let i = 0; i < 10; i++) {
		const rolledDice = Math.floor(Math.random() * 6 + 1);

		const die = {
			id: i,
			value: rolledDice,
		};

		dice.push(die);
	}

	const diceEls = dice.map((dice) => <Die key={dice.id} dice={dice} />);

	return (
		<main>
			<header>
				<h1>Tenzies</h1>
				<p>
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
			</header>
			<div className='dice-container'>{diceEls}</div>
		</main>
	);
}
