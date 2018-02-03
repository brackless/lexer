// @flow
import { value, indent, punctuator } from './lexemes';
import type { Token } from './lexemes';

const CHAR_NEW_LINE = '\n';
const CHAR_TAB = '\t';
const CHAR_SPACE = ' ';

const CHAR_DOUBLE_QUOTE = '"';
// const PUNCTUATOR_BACKSLASH = '\\';

const indentChars = new Set([
  CHAR_SPACE,
  CHAR_TAB,
]);
// const delimiters = new Set([
//   DELIMITER_NEW_LINE,
//   DELIMITER_TAB,
//   DELIMITER_SPACE,
// ]);

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
        return [...input, value(buffer)];
      }
      buffer += current();
      next();
    }

    throw newError('Unclosed string literal');
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

  const readLine = (input: Token[]): Token[] => {
    let output = readIndent(input);

    while (!isEOF()) {
      if (current() === CHAR_NEW_LINE) {
        next();
        return [...output, punctuator('NewLine')];
      }

      if (current() === CHAR_DOUBLE_QUOTE) {
        next();
        output = readString(output);
      }

      next();
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
