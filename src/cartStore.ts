import { atom } from 'nanostores';

export const counter = atom(0);
export const toggle = atom(false);
export const cartItems = atom([]);

export function toggleCount() {
    toggle.set(!toggle.get())
    console.log('toggle', toggle.get())
}

export function addNumber(): void {
    counter.set(counter.get() + 1);
    console.log('adding number', counter.get())
}

export function subtractNumber(): void {
    counter.set(0);
    console.log('subtracting number', counter.get())
}

export function addItem(item: string): void {
    if (cartItems.get().map(i => i.name).includes(item)) {
        const cartTemp = cartItems.get().filter(i => i.name === item)
        console.log(cartTemp)
        const filteredItems = [...cartItems.get().filter(i => i.name !== item), { name: item, count: cartTemp[0].count + 1 }]
        cartItems.set(filteredItems)
        console.log(cartItems.get())
    } else {
        cartItems.set([...cartItems.get(), { name: item, count: 1 }])
    }
    console.log(cartItems.get())
}

export function removeAllItems(item: string): void {
    const cartTemp = cartItems.get().filter(i => i.name !== item)
    cartItems.set(cartTemp)
    console.log(cartItems.get())
}

export function removeSingleItem(item: string): void {
    const cartTemp = cartItems.get().filter(i => i.name === item)
    if (cartTemp[0].count === 1) {
        const cartTemp = cartItems.get().filter(i => i.name !== item)
        cartItems.set(cartTemp)
        console.log(cartItems.get())
    } else {
        const filteredItems = [...cartItems.get().filter(i => i.name !== item), { name: item, count: cartTemp[0].count - 1 }]
        cartItems.set(filteredItems)
    }
    console.log(cartItems.get())
}
