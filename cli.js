#!/usr/bin/env node

/* bmi
< 18 = underweight
18-25 = normal weight
26-30 = overweight
> 30 = severe over-weight
*/

import prompt from 'prompt'
import Table from 'cli-table'
import { toBmi, toKgRange } from "./bmi.js"

const numberPattern = /^\d+$/

main()

async function main () {
	prompt.start()

	let height = await askHeight()

	prompt.get({
		name: 'yesno',
		message: 'Do you want to know your BMI? [y/N]',
		validator: /y[es]?|n[o]?/,
		warning: 'Must respond yes or no',
		default: 'no',
	}, (err, result) => {
		if (err) errorHandler(err)

		if (result.yesno === 'yes' ||result.yesno === 'y') askWeight(height)
	})
}

function errorHandler (err, promiseReject) {
	if (promiseReject) promiseReject(err)
	else console.warn(err)

	process.exit(1)
}

function askHeight () {
	return new Promise((resolve, reject) => {
		let height = {
			name: 'height',
			required: true,
			description: 'What is your height in cm?',
			pattern: numberPattern,
			message: 'Height must be a number!'
		}

		prompt.get([height], (err, result) => {
			if (err) errorHandler(err, reject)

			let heightInM = result.height / 100
			let kgs = toKgRange(heightInM)
			let table = new Table({
				head: ['Kg', 'BMI', 'Description'],
			})

			table.push([
				`Below ${kgs[0].toFixed()}kg`,
				toBmi(kgs[0], heightInM).toFixed(),
				'Underweight'])

			table.push([
				`Between ${kgs[0].toFixed()}kg - ${kgs[1].toFixed()}kg`,
				`${toBmi(kgs[0], heightInM).toFixed()} - ${toBmi(kgs[1], heightInM).toFixed()}`,
				'Normal weight'])

			table.push([
				`Between ${kgs[2].toFixed()}kg - ${kgs[3].toFixed()}kg`,
				`${toBmi(kgs[2], heightInM).toFixed()} - ${toBmi(kgs[3], heightInM).toFixed()}`,
				'Overweight'])

			table.push([
				`Above ${kgs[3].toFixed()}kg`,
				toBmi(kgs[3], heightInM).toFixed(),
				'Obesity'])

			let print =
`\n Weight table for a person who is ${heightInM}m tall:
${table}`

			console.log(print)
			resolve(heightInM)
		})
	})
}

function askWeight (height) {
	let weight = {
		name: 'weight',
		message: 'What is your weight in kg?',
		required: true,
		pattern: numberPattern,
		warning: 'Weight must be a number!'
	}

	prompt.get([weight], (err, result) => {
		if (err) errorHandler(err)

		console.log(`Your BMI is ${toBmi(result.weight, height).toFixed()}`)
	})
}