import { Token, TokenType } from './types'

const operands = ['+', '-', '/', '*']

const singleNumberRegExp = /^[0-9]$/

export function getTokenType(value: string): TokenType {
	if (operands.includes(value)) return 'operand'
	else if (value === '=') return 'eqsign'
	else if (value.match(singleNumberRegExp)) return 'number'
	else throw new Error('Invalid value in file')
}

export function tokenizeInput(input: string): Token[] {
	if (!input) return []

	const tokens: Token[] = []

	const inputValues: string[] = input.split(' ')

	for (const value of inputValues) {
		const type = getTokenType(value)

		tokens.push({ value, type })
	}
	return tokens
}

const typesExpected: { [key: string]: TokenType[] } = {
	number: ['number', 'operand', 'eqsign'],
	operand: ['number'],
	eqsign: [],
}

export function validateTokenSequence(tokens: Token[]): boolean {
	/*
	 * According to the task this expression: "1 + 1 + 1 ="
	 * is considered to be invalid, since it has more than one operation
	 * The assignment is to handle ONLY single operation
	 **/
	const numOperands = tokens.filter((t) => t.type === 'operand').length

	if (numOperands > 1) return false

	let expected = ['number'] as TokenType[]
	for (const token of tokens) {
		if (!expected.includes(token.type)) return false
		expected = typesExpected[token.type]
	}
	return true
}

const operations: { [key: string]: (a: number, b: number) => number } = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'/': (a, b) => Math.floor(a / b),
	'*': (a, b) => a * b,
}

export function calculate(tokens: Token[]): number {
	let result = 0
	let operand = ''
	let numTmp = ''
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i]
		switch (token.type) {
			case 'number':
				numTmp += token.value
				if (tokens.length - 1 === i) result = Number(numTmp)
				break
			case 'operand':
				operand = token.value
				result += Number(numTmp)
				numTmp = ''
				break
			default:
				result = operations[operand](result, Number(numTmp))
				break
		}
	}
	// i
	return result
}
