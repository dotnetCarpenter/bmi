import { toBmi, toKgRange } from "./bmi.js";

console.log(
	toBmi(81, 1.8),
	toKgRange(1.8, toBmi(1.8))
)
