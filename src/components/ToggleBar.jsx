import React, { useEffect, useRef } from 'react'
import { toggle, counter } from '../cartStore'
import { useStore } from '@nanostores/react'
import { animate } from 'motion'

function ToggleBar() {
    const $toggle = useStore(toggle)
    const $count = useStore(counter)
    const ref = useRef(null)

    useEffect(() => {
        if ($toggle) {
            animate(ref.current, { width: "300px", height: "400px", margin: "16px", padding: "16px" }, { duration: 0.5, easing: "ease", allowWebkitAcceleration: true })
        } else {
            animate(ref.current, { width: 0, height: 0, margin: 0, padding: 0 }, { duration: 0.5 })
        }
    }, [$toggle])

    return (
        <>
            <div ref={ref} className='bg-white rounded-2xl' >
                {$count !== 0 && (<div className="indicator-item badge badge-secondary absolute -top-2 -right-2">{$count}</div>)}
                total count: {$count}
            </div>
        </>

    )
}

export default ToggleBar