import React, { useEffect, useState } from 'react'
import { cartItems } from '../cartStore';
import { useStore } from '@nanostores/react';
import useSWR from 'swr';
import ItemControl from './ItemControl';
import PocketBase from 'pocketbase'
import toast, { Toaster } from 'react-hot-toast';
import { navigate } from 'astro:transitions/client';

const pb = new PocketBase('https://psc2023.azurewebsites.net')

const fetcher = (args) => fetch(args).then(res => res.json())

function CheckoutView() {
    const $cartItems = useStore(cartItems)
    const [cartItem, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [file, setFile] = useState(null)
    const { data, isLoading, error } = useSWR("https://psc2023.azurewebsites.net/api/collections/Products/records", fetcher)

    const indicatorValue = $cartItems.reduce((total, item) => total + item.count, 0)

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleSendReceipt = async () => {
        try {
            toast.loading('Loading...')
            const dats = {
                'total': cartTotal,
                'itemlist': JSON.stringify(cartItem),
                'screenshot': file
            }
            const record = await pb.collection('Transactions').create(dats)
            toast.dismiss()
            toast.success('Product Added')
            navigate('/success')
        } catch (error) {
            toast.dismiss()
            toast.error('Something went wrong', error)
            console.log(error)
        }
    }

    useEffect(() => {

        if (data) {
            function handleCalculate() {
                const cartTotalValue = $cartItems.length !== 0 ? $cartItems.map((item, i) => {
                    const itemDetails = data?.items.filter((product) => product.id === item.name)
                    setCartItems((newData) => [...newData, { ...itemDetails[0], count: item.count }])
                    return item.count * itemDetails[0].price
                }).reduce((total, item) => total + item, 0) : 0
                console.log(cartTotalValue)
                setCartTotal(cartTotalValue)
            }
            handleCalculate()
        }
    }, [data])

    if (data) return (
        <>
            <Toaster />
            <div onClick={() => document.getElementById('checkout').showModal()} className='btn btn-outline btn-primary'>Confirm to buy {$cartItems.length !== 0 && (<div className="indicator-item badge badge-secondary ">{indicatorValue}</div>)} items?</div>
            <div className="grid grid-cols-2 gap-4">
                {$cartItems.length !== 0 ? $cartItems.map((item, i) => {
                    const itemDetails = data.items.filter((product) => product.id === item.name)
                    console.log(itemDetails)
                    return (
                        <div className='border-2 p-4 rounded-2xl mb-2' key={i}>
                            <h2 className="text-black flex flex-col gap-4">{itemDetails[0].product_name}<span>Total Items:{item.count}</span><span>Total Amount:{item.count * itemDetails[0].price}pesos</span></h2>
                        </div>
                    )

                }) : <h1>No items</h1>}
            </div>
            <dialog id="checkout" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="font-bold my-3 text-lg">{cartItem.map((items, i) => (
                        <div key={i} className='p-4'>
                            <img className='mask mask-squircle w-10 h-auto' src={`https://psc2023.azurewebsites.net/api/files/Products/${items.id}/${items.picture}`} alt={i} />
                            <p>{items.product_name}</p>
                        </div>
                    ))}
                        Total Amount: {cartTotal}
                    </div>
                    <img src="/gcash.jpg" className='mask mask-squircle' alt="gcash" />
                    <span className="text-gray-700 font-bold mr-6">Screenshot of Gcash receipt</span>
                    <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    {file && <img className='my-6' src={URL.createObjectURL(file)} alt={file.name} />}
                    {file && <button onClick={handleSendReceipt} className='my-6 btn btn-primary btn-outline'>Send Payment</button>}
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </>
    )
}

export default CheckoutView