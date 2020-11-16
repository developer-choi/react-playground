import {getDefaultFunctionWhenError} from '../common';

export const defaultParse = getDefaultFunctionWhenError((value: string) => JSON.parse(value));
