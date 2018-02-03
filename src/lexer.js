// @flow
import { value } from './lexemes';

const DELIMITER_NEW_LINE = '\n';

const PUNCTUATOR_DOUBLE_QUOTE = '"';
// const PUNCTUATOR_BACKSLASH = '\\';

const lex = (code: string): any[] => {
  let line = 0;
  let column = 0;
  let position = 0;

  const current = () => code[position];
  const next = () => {
    if (current() === DELIMITER_NEW_LINE) {
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

  const readString = () => {
    let buffer = '';

    while (!isEOF()) {
      const char = current();

      if (char === PUNCTUATOR_DOUBLE_QUOTE) {
        return buffer;
      }

      buffer += char;

      next();
    }

    throw newError('Unclosed string literal');
  };

  const result = [];

  while (!isEOF()) {
    const char = current();

    if (char === PUNCTUATOR_DOUBLE_QUOTE) {
      next();
      result.push(value(readString()));
    }

    next();
  }

  return result;
};

export default lex;
