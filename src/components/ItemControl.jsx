import React from 'react'
import { useStore } from '@nanostores/react'
import { removeSingleItem, addItem } from '../cartStore'

function ItemControl({ itemId }) {

    const handleSubtract = () => {
        removeSingleItem(itemId)
    }

    const handleAdd = () => {
        addItem(itemId)
    }

    return (
        <div className='flex gap-2 w-full'>
            <div onClick={handleAdd} className='btn btn-success w-1/2 p-2'>+</div>
            <div onClick={handleSubtract} className='btn btn-warning w-1/2 p-2'>-</div>
        </div>
    )
}

export default ItemControl