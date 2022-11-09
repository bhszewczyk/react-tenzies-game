import React from 'react';
import Die from './Die';
import './dice.css';
import { nanoid } from 'nanoid';

export default function Dice() {
	const [dice, setDice] = React.useState(generateDice());

	function generateDice() {
		const diceArr = [];
		for (let i = 0; i < 10; i++) {
			const rolledDice = Math.floor(Math.random() * 6 + 1);

			const die = {
				id: nanoid(),
				value: rolledDice,
				isHeld: false,
			};

			diceArr.push(die);
		}
		return diceArr;
	}

	function getNewRoll() {
		setDice(() => generateDice());
	}

	console.log(dice);

	function holdDice(id) {
		setDice((oldState) => {
			const updatedArr = [];
			const clickedDie = oldState.find((die) => die.id === id);
			console.log(clickedDie);

			for (const die of dice) {
				if (die.id === id) {
					updatedArr.push({ ...die, isHeld: !die.isHeld });
				} else {
					updatedArr.push(die);
				}
			}

			return updatedArr;
		});
	}

	const diceEls = dice.map((die) => (
		<Die key={die.id} die={die} holdDie={() => holdDice(die.id)} />
	));

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
