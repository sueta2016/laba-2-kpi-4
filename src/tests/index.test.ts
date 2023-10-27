import { getTokenType, tokenizeInput } from '..'

describe('tokenizeInput function', () => {
	it('should parse input into tokens', () => {
		// Arrange
		const input = '1 + 2 ='
		const expected = [
			{ value: '1', type: 'number' },
			{ value: '+', type: 'operand' },
			{ value: '2', type: 'number' },
			{ value: '=', type: 'eqsign' },
		]

		// Act
		const result = tokenizeInput(input)

		// Assert
		expect(result).toEqual(expected)
	})

	it('should throw exception on invalid char in input', () => {
		// Arrange
		const input1 = '1 + 2 messi'
		const input2 = '1n + 2 ='
		const input3 = 'm + 2'

		// Act
		expect(() => tokenizeInput(input1)).toThrow('Invalid value in file')
		expect(() => tokenizeInput(input2)).toThrow('Invalid value in file')
		expect(() => tokenizeInput(input3)).toThrow('Invalid value in file')
	})

	it('should returns empty array on empty input', () => {
		const input = ''

		expect(tokenizeInput(input)).toEqual([])
	})
})

describe('getTokenType', () => {
	it('should handle correct inputs', () => {
		expect(getTokenType('1')).toBe('number')
		expect(getTokenType('0')).toBe('number')
		expect(getTokenType('9')).toBe('number')
		expect(getTokenType('=')).toBe('eqsign')
		expect(getTokenType('+')).toBe('operand')
		expect(getTokenType('-')).toBe('operand')
		expect(getTokenType('/')).toBe('operand')
		expect(getTokenType('*')).toBe('operand')
	})

	it('should throw on incorrect inputs', () => {
		const incorrectInputs = ['11', '1т', 'месси', '1+', '1=', '00', '01']
		incorrectInputs.forEach((input) =>
			expect(() => getTokenType(input)).toThrow('Invalid value in file'),
		)
	})
})
