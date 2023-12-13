import React from 'react'
import { addNumber } from '../cartStore'

function AddCart({ children }) {
    return (
        <div onClick={addNumber}>
            {children}
        </div>
    )
}

export default AddCart