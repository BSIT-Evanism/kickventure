import React, { useEffect, useState } from 'react'

function DataRender() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://sheet.best/api/sheets/ee28fff4-7721-4fd0-a134-fc4278f0c368')
            const data = await res.json()
            console.log(data)
            setData(data)
        }
        fetchData()
    }, [])
    return (
        <div className='grid grid-cols-3 gap-10'>
            {data.map((item, i) => (
                <a href={`/shop/${i}`}>
                    <div className='w-auto h-auto' key={i}>
                        <img className='w-[80%] h-[80%]' src={item.Image} alt={i} />
                        <h1>{item.Name}</h1>
                        <p>{item.Price}</p>
                        <p>{item.Stocks}</p>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default DataRender