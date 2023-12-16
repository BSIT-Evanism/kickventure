import React, { useEffect, useRef } from 'react'
import { toggle, counter } from '../cartStore'
import { useStore } from '@nanostores/react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
function ToggleBar() {
    const $toggle = useStore(toggle)
    const $count = useStore(counter)

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


    return (
        <>
            <Toaster position='top-right' />
            <motion.div animate={cartAnim} transition={{ duration: 1.5, type: "spring" }} className={cartStyle} >
                {$count !== 0 && (<div className="indicator-item badge badge-secondary absolute -top-2 -right-2">{$count}</div>)}
                <div className={`${$toggle ? "block" : "hidden"}`}>total count: {$count}</div>
            </motion.div>
        </>

    )
}

export default ToggleBar