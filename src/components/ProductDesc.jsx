import React from 'react'
import useSWR from 'swr'

const fetchData = (url) => fetch(url).then(res => res.json())

function ProductDesc({ idName }) {
    const { data, error, isLoading } = useSWR(`https://psc2023.azurewebsites.net/api/collections/Products/records/${idName}`, fetchData)

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div>
            {JSON.stringify(data)}

            <div className='group shadow-xl hover:shadow-2xl hover:-translate-y-4 card w-screen bg-base-100 image-full flex transition-all duration-300 overflow-hidden'>
                <figure><img src={`https://psc2023.azurewebsites.net/api/files/Products/${data.id}/${data.picture}`} alt={data.id} style={{ viewTransitionName: `${data.id}` }} /></figure>
                <div className='w-auto h-auto card-body'>
                    <h1 className="card-title text-4xl" style={{ viewTransitionName: `${data.product_name}` }}>{data.product_name}</h1>
                    <p>{data.price} pesos</p>
                    <p>{data.stocks}</p>
                    <div className="card-actions translate-x-80 group-hover:translate-x-0 justify-end transition-all duration-300 ease">
                        <a href={`/shop/${data.id}`} className="bg-lime-200 px-4 py-8 font-bold uppercase text-black rounded-3xl" data-astro-prefetch>Check Details</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDesc