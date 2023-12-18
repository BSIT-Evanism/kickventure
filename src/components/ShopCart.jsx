import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cartItems } from '../cartStore';
import { useStore } from '@nanostores/react';
import useSWR from 'swr';
import ItemControl from './ItemControl';

const fetcher = (args) => fetch(args).then(res => res.json())

function ShopCart() {
  const $cartItems = useStore(cartItems)
  const { data, isLoading, error } = useSWR("https://psc2023.azurewebsites.net/api/collections/Products/records", fetcher)

  const [hover, setHover] = useState(false)

  return (
    <motion.div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='h-[80vh] z-[100] bg-orange-300 w-24 rounded-3xl hover:w-[50vw] hover:-translate-x-[20vw] transition-all duration-500 ease p-4'>
      <div className='w-full h-full px-8 py-10 bg-white rounded-3xl '>
        {hover && data ? (<div className={`overflow-y-scroll h-full`}>total items:
          {$cartItems.map((item, i) => {
            const itemDetails = data.items.filter((product) => product.id === item.name)
            console.log(itemDetails)
            return (
              <div className='border-2 p-4 rounded-2xl mb-2' key={i}>
                <h2 className="text-black flex flex-col gap-4">{itemDetails[0].product_name}<span>Total Items:{item.count}</span><span>Total Amount:{item.count * itemDetails[0].price}pesos</span></h2>
                <ItemControl itemId={item.name} />
              </div>
            )

          })}
          <a href="/checkout" className='btn btn-primary'>Checkout?</a>
        </div>) : $cartItems.length === 0 ? (<h1 className='text-4xl uppercase -translate-x-4  whitespace-break-spaces font-bold break-words'>No Items</h1>) : (<h1 className='text-4xl font-bold uppercase -translate-x-4 text-center whitespace-break-spaces break-words'>Check Out?</h1>)}
      </div>
    </motion.div>
  )
}

export default ShopCart;
