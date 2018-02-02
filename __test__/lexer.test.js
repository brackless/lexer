// @flow
import lex from '../src';

test('Empty file', () => {
  expect(lex('')).toEqual([]);
});
