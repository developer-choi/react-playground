import type {BaseSyntheticEvent} from 'react';

export function preventDetault(event: BaseSyntheticEvent) {
  event.preventDefault();
}
