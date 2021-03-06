// @flow
import { value, symbol, indent, punctuator } from './lexemes';
import type { Token } from './lexemes';

const CHAR_NEW_LINE = '\n';
const CHAR_TAB = '\t';
const CHAR_SPACE = ' ';
const CHAR_DOUBLE_QUOTE = '"';
const CHAR_LEFT_PAREN = '(';
const CHAR_RIGHT_PAREN = ')';
const CHAR_LEFT_SQUARE_PAREN = '[';
const CHAR_RIGHT_SQUARE_PAREN = ']';

// const CHAR_BACKSLASH = '\\';
const delimiterChars = new Set([
  CHAR_SPACE,
  CHAR_TAB,
]);

const indentChars = new Set([
  CHAR_SPACE,
  CHAR_TAB,
]);

const punctuatorChars = new Set([
  CHAR_SPACE,
  CHAR_TAB,
  CHAR_NEW_LINE,
  CHAR_DOUBLE_QUOTE,
  CHAR_LEFT_PAREN,
  CHAR_RIGHT_PAREN,
  CHAR_LEFT_SQUARE_PAREN,
  CHAR_RIGHT_SQUARE_PAREN,
]);

const lex = (code: string): any[] => {
  let line = 0;
  let column = 0;
  let position = 0;

  const current = () => code[position];
  const next = () => {
    if (current() === CHAR_NEW_LINE) {
      line += 1;
      column = 0;
    } else {
      column += 1;
    }

    position += 1;
  };
  const isEOF = () => position >= code.length;

  const newError = (message: string) =>
    new Error(`${message} at line ${line}, column ${column}`);

  const readString = (input: Token[]): Token[] => {
    let buffer = '';

    while (!isEOF()) {
      if (current() === CHAR_DOUBLE_QUOTE) {
        next();
        return [...input, value(buffer)];
      }
      buffer += current();
      next();
    }

    throw newError('Unclosed string literal');
  };

  const readSymbol = (input: Token[]): Token[] => {
    let buffer = '';

    while (!isEOF()) {
      if (punctuatorChars.has(current())) {
        break;
      }
      buffer += current();
      next();
    }

    return [...input, symbol(buffer)]
  };

  const readIndent = (input: Token[]): Token[] => {
    let size = 0;

    while (!isEOF()) {
      if (indentChars.has(current())) {
        size += 1;
        next();
      } else {
        break;
      }
    }

    return size > 0 ? [...input, indent(size)] : input;
  };

  const readPunctuator = (input: Token[]): Token[] => {
    const char = current();
    next();
    switch (char) {
      case CHAR_NEW_LINE:
        return [...input, punctuator('NewLine')];
      default:
        return input;
    }
  };

  const readLine = (input: Token[]): Token[] => {
    let output = readIndent(input);

    while (!isEOF()) {
      if (current() === CHAR_NEW_LINE) {
        next();
        return [...output, punctuator('NewLine')];
      } else if (current() === CHAR_DOUBLE_QUOTE) {
        next();
        output = readString(output);
      } else if (punctuatorChars.has(current())) {
        output = readPunctuator(output);
      } else {
        output = readSymbol(output);
      }
    }

    return output;
  };

  const readProgram = (): Token[] => {
    let output: Token[] = [];

    while (!isEOF()) {
      output = readLine(output);
    }

    return output;
  };

  return readProgram();
};

export default lex;
