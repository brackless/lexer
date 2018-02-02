// @flow
import lex from '../src';

test('Empty program', () => {
  expect(lex('')).toEqual([]);
});

test('String literal', () => {
  expect(lex('"foo bar"')).toEqual([{ type: 'Value', value: 'foo bar' }]);
});
