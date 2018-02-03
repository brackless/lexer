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

test('Multiple lines, indents', () => {
  expect(lex(`
  "foo" "bar"
    "baz" "bass"
  "qwerty"
  `)).toEqual([
    { type: 'Punctuator', kind: 'NewLine' },
    { type: 'Indent', size: 2 },
    { type: 'Value', value: 'foo' },
    { type: 'Value', value: 'bar' },
    { type: 'Punctuator', kind: 'NewLine' },
    { type: 'Indent', size: 4 },
    { type: 'Value', value: 'baz' },
    { type: 'Value', value: 'bass' },
    { type: 'Punctuator', kind: 'NewLine' },
    { type: 'Indent', size: 2 },
    { type: 'Value', value: 'qwerty' },
    { type: 'Punctuator', kind: 'NewLine' },
    { type: 'Indent', size: 2 },
  ]);
});

test('Read symbols', () => {
  expect(lex('foo')).toEqual([
    { type: 'Symbol', name: 'foo' },
  ]);

  expect(lex('foo bar')).toEqual([
    { type: 'Symbol', name: 'foo' },
    { type: 'Symbol', name: 'bar' },
  ]);
});
