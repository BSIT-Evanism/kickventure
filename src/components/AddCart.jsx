import React from 'react'
import { addNumber, counter, subtractNumber } from '../cartStore'
import toast from 'react-hot-toast'
import { useStore } from '@nanostores/react'

function AddCart({ children, prodId }) {

    const $count = useStore(counter)

    const handleAdd = () => {
        toast.success('Successfully added to cart! ' + prodId)
        addNumber()
    }

    const handleSubtract = () => {
        toast.dismiss()
        toast.error('Successfully removed from cart! ' + prodId)
        subtractNumber()
    }

    return (
        <>
            <div onClick={handleAdd}>
                {children}
            </div>
            {$count !== 0 && (<div onClick={handleSubtract} className="p-8 w-fit hover:bg-slate-100 select-none cursor-pointer border-l-2 h-full font-bold uppercase">Remove {$count} products to Cart</div>)}
        </>
    )
}

export default AddCart