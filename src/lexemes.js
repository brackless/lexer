// @flow
export type Token = {|
  type: 'Value' | 'Indent' | 'Punctuator',
  value: any,
|};

export type PunctuatorValue = 'NewLine';

export const value = (value: any): Token => ({ type: 'Value', value });

export const indent = (size: number): Token => ({ type: 'Indent', value: size });

export const punctuator = (type: PunctuatorValue): Token => ({ type: 'Punctuator', value: type });

export default { value, indent, punctuator };
