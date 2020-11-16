import {getDefaultFunction} from '../common';

export const defaultParse = getDefaultFunction((value: string) => JSON.parse(value));
