const operands = ['+', '-', '/', '*']

type TokenType = 'number' | 'operand' | 'eqsign'

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

export type Token = {
	value: string
	type: TokenType
}
