import React from 'react'
import { cartItems } from '../cartStore';
import { useStore } from '@nanostores/react';
import useSWR from 'swr';
import ItemControl from './ItemControl';

const fetcher = (args) => fetch(args).then(res => res.json())

function CheckoutView() {
    const $cartItems = useStore(cartItems)
    const { data, isLoading, error } = useSWR("https://psc2023.azurewebsites.net/api/collections/Products/records", fetcher)
    if (data) return (
        <div className="grid grid-cols-2">
            {$cartItems.length !== 0 ? $cartItems.map((item, i) => {
                const itemDetails = data.items.filter((product) => product.id === item.name)
                console.log(itemDetails)
                return (
                    <div className='border-2 p-4 rounded-2xl mb-2' key={i}>
                        <h2 className="text-black flex flex-col gap-4">{itemDetails[0].product_name}<span>Total Items:{item.count}</span><span>Total Amount:{item.count * itemDetails[0].price}pesos</span></h2>
                    </div>
                )

            }) : <h1>No items</h1>}
        </div>
    )
}

export default CheckoutView