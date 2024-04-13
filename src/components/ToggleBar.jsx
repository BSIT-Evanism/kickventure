import React, { useEffect, useRef } from 'react'
import { toggle, counter, cartItems } from '../cartStore'
import { useStore } from '@nanostores/react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import ItemControl from './ItemControl'

const fetcher = (args) => fetch(args).then(res => res.json())

function ToggleBar() {
    const $toggle = useStore(toggle)
    const $count = useStore(counter)
    const $cartItems = useStore(cartItems)
    const { data, isLoading, error } = useSWR("https://ecommerce.forkbun.evansolanoy.studio/api/collections/Products/records", fetcher)

    const cartAnim = {
        width: $toggle ? "300px" : 0,
        height: $toggle ? "400px" : 0,
        margin: $toggle ? "16px" : 0,
        padding: $toggle ? "16px" : 0
    }

    const cartStyle = `
        bg-white
        rounded-2xl
    `

    const indicatorValue = $cartItems.reduce((total, item) => total + item.count, 0)

    if (data) return (
        <>
            {console.log(data)}
            <Toaster position='top-right' />
            <motion.div animate={cartAnim} transition={{ duration: 1, type: "tween", ease: "circOut" }} className={cartStyle} >
                {$cartItems.length !== 0 && (<div className="indicator-item badge badge-secondary absolute -top-2 -right-2">{indicatorValue}</div>)}
                <div className={`${$toggle ? "block" : "hidden"} overflow-y-scroll h-full`}>total items:
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
                </div>
            </motion.div>
        </>

    )
}

export default ToggleBar