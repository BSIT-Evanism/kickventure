import React, { useEffect, useRef } from 'react'
import { toggle, counter } from '../cartStore'
import { useStore } from '@nanostores/react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
function ToggleBar() {
    const $toggle = useStore(toggle)
    const $count = useStore(counter)

    // useEffect(() => {
    //     if ($toggle) {
    //         animate(ref.current, { width: "300px", height: "400px", margin: "16px", padding: "16px" }, { duration: 0.5, easing: "ease", allowWebkitAcceleration: true })
    //     } else {
    //         animate(ref.current, { width: 0, height: 0, margin: 0, padding: 0 }, { duration: 0.5 })
    //     }
    // }, [$toggle])

    return (
        <>
            <Toaster position='top-right' />
            <motion.div animate={{ width: $toggle ? "300px" : 0, height: $toggle ? "400px" : 0, margin: $toggle ? "16px" : 0, padding: $toggle ? "16px" : 0 }} transition={{ duration: 1.5, type: "spring" }} className='bg-white rounded-2xl' >
                {$count !== 0 && (<div className="indicator-item badge badge-secondary absolute -top-2 -right-2">{$count}</div>)}
                <div className={`${$toggle ? "block" : "hidden"}`}>total count: {$count}</div>
            </motion.div>
        </>

    )
}

export default ToggleBar