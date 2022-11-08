import React from 'react';
import Die from './Die';
import './dice.css';

export default function Dice() {
	const [dice, setDice] = React.useState(generateDice());

	function generateDice() {
		const diceArr = [];
		for (let i = 0; i < 10; i++) {
			const rolledDice = Math.floor(Math.random() * 6 + 1);

			const die = {
				id: i,
				value: rolledDice,
			};

			diceArr.push(die);
		}
		return diceArr;
	}

	function getNewRoll() {
		setDice(() => generateDice());
	}

	const diceEls = dice.map((die) => <Die key={die.id} die={die} />);

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
			<button className='btn' onClick={getNewRoll}>
				Roll
			</button>
		</main>
	);
}
