import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetchData = (url) => fetch(url).then(res => res.json())

function DataRender() {
    const [datas, setData] = useState([])
    const { data, error, isLoading } = useSWR('https://psc2023.azurewebsites.net/api/collections/Products/records', fetchData)
    if (isLoading) return <h1>Loading</h1>
    if (error) return <h1>Error</h1>
    return (
        <div className='grid grid-cols-3 gap-10'>
            {data.items.map((item, i) => (
                <div key={`${item.id}`} style={{ viewTransitionName: item.id }} className='group shadow-xl hover:shadow-2xl hover:-translate-y-4 card w-full bg-base-100 image-full transition-all duration-300 overflow-hidden'>
                    <figure><img className='group-hover:scale-125 transition-all duration-300' src={`https://psc2023.azurewebsites.net/api/files/Products/${item.id}/${item.picture}`} alt={i} /></figure>
                    <div className='w-auto h-auto card-body'>
                        <h1 className="card-title text-4xl" >{item.product_name}</h1>
                        <p>{item.price} pesos</p>
                        <p>{item.stocks}</p>
                        <div className="card-actions translate-x-80 group-hover:translate-x-0 justify-end transition-all duration-300 ease">
                            <a href={`/shop/${item.id}`} onClick={() => document.getElementById(item.id).showModal()} className="bg-lime-200 px-4 py-8 font-bold uppercase text-black rounded-3xl">Check Details</a>
                        </div>
                    </div>
                    {/* <dialog key={`${item.id + i}`} id={item.id} style={{ viewTransitionName: item.id }} className="modal h-auto">
                        <div className="modal-box pt-5">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <figure className='mt-8'><img src={`https://psc2023.azurewebsites.net/api/files/Products/${item.id}/${item.picture}`} alt={i} style={{ viewTransitionName: `${item.id}` }} /></figure>
                            <div className='w-auto h-auto card-body'>
                                <h1 className="card-title text-4xl" style={{ viewTransitionName: `${item.product_name}` }}>{item.product_name}</h1>
                                <p>{item.price} pesos</p>
                                <p>{item.stocks}</p>
                                <div className="card-actions translate-x-80 group-hover:translate-x-0 justify-end transition-all duration-300 ease">
                                    <button onClick={() => document.getElementById(item.id).showModal()} className="bg-lime-200 px-4 py-8 font-bold uppercase text-black rounded-3xl">Check Details</button>
                                </div>
                            </div>
                            <p className="py-4">Press ESC key or click on ✕ button to close</p>
                        </div>
                    </dialog> */}
                </div>
            ))}


        </div>
    )
}

export default DataRender