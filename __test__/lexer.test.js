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

test('Multiple lines, indents, ignore empty lines', () => {
  expect(lex(`
  "foo" "bar"
    "baz" "bass"
  "qwerty"
  `)).toEqual([
    { type: 'Punctuator', value: 'NewLine' },
    { type: 'Indent', value: 2 },
    { type: 'Value', value: 'foo' },
    { type: 'Value', value: 'bar' },
    { type: 'Punctuator', value: 'NewLine' },
    { type: 'Indent', value: 4 },
    { type: 'Value', value: 'baz' },
    { type: 'Value', value: 'bass' },
    { type: 'Punctuator', value: 'NewLine' },
    { type: 'Indent', value: 2 },
    { type: 'Value', value: 'qwerty' },
    { type: 'Punctuator', value: 'NewLine' },
    { type: 'Indent', value: 2 },
  ]);
});
