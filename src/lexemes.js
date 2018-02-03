// @flow
export type ValueToken = {|
  type: 'Value',
  value: any,
|};

export type SymbolToken = {|
  type: 'Symbol',
  name: string,
|};

export type IndentToken = {|
  type: 'Indent',
  size: number,
|};

export type PunctuatorKind = 'NewLine';

export type PunctuatorToken = {|
  type: 'Punctuator',
  kind: PunctuatorKind,
|};


export type Token = ValueToken | SymbolToken | IndentToken | PunctuatorToken;

export const value = (value: any): ValueToken => ({ type: 'Value', value });

export const symbol = (name: string): SymbolToken => ({ type: 'Symbol', name });

export const indent = (size: number): IndentToken => ({ type: 'Indent', size });

export const punctuator = (kind: PunctuatorKind): PunctuatorToken => ({ type: 'Punctuator', kind });

export default { value, symbol, indent, punctuator };
