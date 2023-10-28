export type Token = {
	value: string
	type: TokenType
}

export type TokenType = 'number' | 'operand' | 'eqsign'
