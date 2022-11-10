import React from 'react';
import Die from './Die';
import Counter from './Counter';
import './dice.css';
import { nanoid } from 'nanoid';

export default function Dice() {
	const [isGameOver, setGameOver] = React.useState(false);
	const [dice, setDice] = React.useState(generateDice());
	const [counter, setCounter] = React.useState(1);
	const [rollsToBeat, setRollsToBeat] = React.useState(
		localStorage.getItem('toBeat') || null
	);

	React.useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld === true);

		if (!allHeld) {
			return;
		}

		const value = dice[0].value;
		const valuesMatch = dice.every((die) => die.value === value);

		if (!valuesMatch) {
			return;
		}

		setRollsToBeat((oldState) => {
			if (!oldState) {
				return counter;
			} else if (oldState < counter) {
				return oldState;
			} else {
				return counter;
			}
		});

		setGameOver(true);
	}, [dice]);

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
		setCounter((oldCount) => oldCount + 1);
		setDice((oldState) => {
			const newState = oldState.map((die) => {
				if (die.isHeld === true) {
					return die;
				} else {
					return { ...die, value: Math.floor(Math.random() * 6 + 1) };
				}
			});

			return newState;
		});
	}

	function holdDice(id) {
		setDice((oldState) => {
			const updatedArr = [];

			for (const die of oldState) {
				if (die.id === id) {
					updatedArr.push({ ...die, isHeld: !die.isHeld });
				} else {
					updatedArr.push(die);
				}
			}

			return updatedArr;
		});
	}

	function startAgain() {
		localStorage.setItem('toBeat', rollsToBeat);
		setGameOver(false);
		setCounter(1);

		setDice(generateDice());
	}

	const diceEls = dice.map((die) => (
		<Die key={die.id} die={die} holdDie={() => holdDice(die.id)} />
	));

	function newRecordToBeat() {
		if (!rollsToBeat || rollsToBeat < counter) {
			return false;
		} else {
			return true;
		}
	}

	const wonEl = (
		<div>
			<h1>You won!</h1>
			{newRecordToBeat() && <p className='game-info'>New score to beat!</p>}
			<p className='game-info'>
				It took you <span>{counter}</span> rolls to achieve the goal.
			</p>
			<button className='btn' onClick={startAgain}>
				Play again
			</button>
		</div>
	);

	const gameEl = (
		<div className='game-container'>
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
			<Counter count={counter} toBeat={rollsToBeat} />
		</div>
	);

	return <main>{isGameOver ? wonEl : gameEl}</main>;
}
