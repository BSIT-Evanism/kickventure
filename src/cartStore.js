import { atom } from 'nanostores';

export const counter = atom(0);
export const toggle = atom(false);

export function toggleCount() {
    toggle.set(!toggle.get())
    console.log('toggle', toggle.get())
}

export function addNumber() {
    counter.set(counter.get() + 1);
    console.log('adding number', counter.get())
}