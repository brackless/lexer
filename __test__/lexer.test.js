// @flow
import lex from '../src';

test('Empty program', () => {
  expect(lex('')).toEqual([]);
});

test('String literal', () => {
  expect(lex('"foo bar"')).toEqual([{ type: 'Value', value: 'foo bar' }]);
});

test('Unclosed string literal', () => {
  expect(() => lex('"foo bar')).toThrow('Unclosed string literal at line 0, column 8');
});
