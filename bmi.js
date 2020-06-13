/* bmi
< 18 = under-weight
18-25 = normal-weight
26-30 = over-weight
> 30 = severe over-weight
*/

export { toBmi, toKgRange }

function toBmi (kg, height) {
	return kg / height**2
}

function toKgRange (height) {
	// x / y**2 = z
	// x / y**2 * y**2  = z * y**2
	// x = z * y**2
	let bmis = [18, 25, 26, 30]
	return bmis.map(bmi => bmi * height**2)
}
