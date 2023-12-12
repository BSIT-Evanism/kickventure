import { atom } from 'nanostores';

export const count = atom(0);
export const toggle = atom(false);

export function toggleCount() {
    toggle.set(!toggle.get())
    console.log('toggle', toggle.get())
}

export function addNumber(count) {
    count.set(count.get() + 1)
    console.log('adding number', count.get())
}