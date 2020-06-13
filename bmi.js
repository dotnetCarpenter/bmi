'use strict'

/* bmi
< 18 = under-weight
18-25 = normal-weight
26-30 = over-weight
> 30 = severe over-weight
*/

function toBmi (kg, height) {
	let bmi = kg / height**2
	return [kg / height**2, kg / height**2 * height**2, bmi * height**2]
}

function toKgRange (height, bmi) {
	// x / y**2 = z
	// x / y**2 * y**2  = z * y**2
	// x = z * y**2
	// kg / height ** 2 = bmi
	// kg / height ** 2 * height ** 2 = bmi * height ** 2
	// kg = bmi * height ** 2
	return bmi * height ** 2
}

console.log(
	toBmi(70, 1.8)/* .toFixed() */,
	toKgRange(1.8, toBmi(70, 1.8)[0])/* .toFixed() */
)
