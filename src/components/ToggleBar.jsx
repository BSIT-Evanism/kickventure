import React, { useEffect, useRef } from 'react'
import { toggle } from '../cartStore'
import { useStore } from '@nanostores/react'
import { animate } from 'motion'

function ToggleBar() {
    const $toggle = useStore(toggle)
    const ref = useRef(null)

    useEffect(() => {
        if ($toggle) {
            animate(ref.current, { width: "300px", height: "400px", margin: "16px" }, { duration: 1.5 })
        } else {
            animate(ref.current, { width: 0, height: 0, margin: 0 }, { duration: 1.5 })
        }
    }, [$toggle])

    return (
        <>
            <div ref={ref} className='bg-white rounded-2xl' />
        </>

    )
}

export default ToggleBar