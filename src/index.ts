import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { calculate, tokenizeInput, validateTokenSequence } from './calculate'

const INPUT_FILE_PATH = path.join(__dirname, '/data/input')
const OUTPUT_FILE_PATH = path.join(__dirname, '/data/output')

function main() {
	const input = readFileSync(INPUT_FILE_PATH, 'utf-8').trim()

	const tokens = tokenizeInput(input)

	if (!validateTokenSequence(tokens)) throw new Error('Invalid input')

	const result = calculate(tokens)

	writeFileSync(OUTPUT_FILE_PATH, result.toString())
}

main()
