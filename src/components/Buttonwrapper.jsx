import React from 'react'
import { toggleCount } from '../cartStore'

function Buttonwrapper({ children }) {

    return (
        <div onClick={toggleCount}>{children}</div>
    )
}

export default Buttonwrapper