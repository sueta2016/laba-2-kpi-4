import { getTokenType, tokenizeInput, validateTokenSequence } from '..'

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

	it('should throw exception in case of number instead of digit', () => {
		const input = '11 + 2'
		const input2 = '01'
		expect(() => getTokenType(input)).toThrow('Invalid value in file')
		expect(() => getTokenType(input2)).toThrow('Invalid value in file')
	})

	it('should throw exception on non-allowed char in input', () => {
		const input = '1т'
		const input2 = 'месси'
		expect(() => getTokenType(input)).toThrow('Invalid value in file')
		expect(() => getTokenType(input2)).toThrow('Invalid value in file')
	})

	it('should throw exception on operand close to number', () => {
		const input = '1+'
		const input2 = '1='

		expect(() => getTokenType(input)).toThrow('Invalid value in file')
		expect(() => getTokenType(input2)).toThrow('Invalid value in file')
	})
})

describe('validateTokenSequence', () => {
	it('should return true (2 numbers)', () => {
		const input = '1 2'
		const tokenSequence = tokenizeInput(input)

		expect(validateTokenSequence(tokenSequence)).toBe(true)
	})

	it('should return true (operand after number)', () => {
		const input = '1 -'
		const tokenSequence = tokenizeInput(input)

		expect(validateTokenSequence(tokenSequence)).toBe(true)
	})

	it('should return true (operand between numbers)', () => {
		const input = '1 - 1'
		const tokenSequence = tokenizeInput(input)

		expect(validateTokenSequence(tokenSequence)).toBe(true)
	})

	it('should return true (operand between numbers and then equal)', () => {
		const input = '3 - 1 1 ='
		const tokenSequence = tokenizeInput(input)

		expect(validateTokenSequence(tokenSequence)).toBe(true)
	})

	it('should throw execption on operand at start', () => {
		const input = '* 1'
		const tokenSequence = tokenizeInput(input)
		expect(validateTokenSequence(tokenSequence)).toBe(false)
	})

	it('should throw execption on equal sign at start', () => {
		const input = '= - 1'
		const tokenSequence = tokenizeInput(input)
		expect(validateTokenSequence(tokenSequence)).toBe(false)
	})

	it('should throw execption on operand after operand', () => {
		const input = '1 + +'
		const tokenSequence = tokenizeInput(input)
		expect(validateTokenSequence(tokenSequence)).toBe(false)
	})

	it('should throw execption on equal sign after operand', () => {
		const input = '3 - 1 + ='
		const tokenSequence = tokenizeInput(input)
		expect(validateTokenSequence(tokenSequence)).toBe(false)
	})

	it('should throw execption on several operands in expression', () => {
		const input = '1 + 1 + 1 ='

		const tokenSequence = tokenizeInput(input)
		expect(validateTokenSequence(tokenSequence)).toBe(false)
	})
})
