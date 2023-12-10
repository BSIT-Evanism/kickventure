import React, { useEffect, useState } from 'react'
import PocketBase from 'pocketbase'
import useSWR from 'swr';

const pb = new PocketBase('https://psc2023.azurewebsites.net')

const fetchData = (url) => fetch(url).then((res) => res.json());

function AdminPage() {
    const [file, setFile] = useState(null)
    const [id, setId] = useState('')
    const [datas, setDatas] = useState({ 'product_name': '', 'price': 0, 'stocks': 0 })
    const [newData, setNewData] = useState({ 'product_name': '', 'price': 0, 'stocks': 0 })
    const { data, isLoading, error } = useSWR('https://psc2023.azurewebsites.net/api/collections/Products/records', fetchData)

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {
        const res = await pb.collection('Admin').getOne('act8pbyn5l2vomv')
        if (res.LoginStatus === true) {
            return
        } else {
            localStorage.setItem('isLogin', false)
            window.location.reload()
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log(datas)
        try {
            const record = await pb.collection('Products').update(id, datas)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleDialog = (id) => {
        document.getElementById(id).showModal()
        setId(id)
        console.log(id)
    }

    const handleAddProduct = async () => {
        try {
            const dats = {
                'product_name': newData.product_name,
                'price': newData.price,
                'stocks': newData.stocks,
                'picture': file
            }
            const record = await pb.collection('Products').create(dats)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () => {
        try {
            const record = await pb.collection('Admin').update('act8pbyn5l2vomv', { "LoginStatus": false })
            localStorage.setItem('isLogin', false)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div className='p-4'>
            <div className='w-full px-8 h-28 bg-fuchsia-300 rounded-2xl flex justify-between items-center' >
                <h1 className='text-4xl font-bold text-center text-white'>Admin Page</h1>
                <button onClick={() => document.getElementById('addproduct').showModal()} className='bg-white p-4 font-bold rounded-full uppercase text-black'>Add new product</button>
                <button onClick={() => handleLogout()} className='btn btn-error px-8'>Logout</button>
                <dialog id='addproduct' className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Add New Product?</h3>
                        <form onSubmit={handleAddProduct}>
                            <label className="block">
                                <span className="text-gray-700">Picture</span>
                                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                            </label>
                            {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
                            <label className="block">
                                <span className="text-gray-700">Product Name</span>
                                <input type="text" name="product_name" defaultValue='' onChange={(e) => setNewData((newdata) => ({ ...newdata, 'product_name': e.target.value }))} className="form-input mt-1 block w-full" placeholder="Enter product name" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Price</span>
                                <input type="number" name="price" defaultValue='' onChange={(e) => setNewData((newdata) => ({ ...newdata, 'price': e.target.value }))} className="form-input mt-1 block w-full" placeholder="Enter price" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Stocks</span>
                                <input type="number" name="stocks" defaultValue='' onChange={(e) => setNewData((newdata) => ({ ...newdata, 'stocks': e.target.value }))} className="form-input mt-1 block w-full" placeholder="Enter stocks" />
                            </label>
                            <button type="submit" className="btn btn-primary mt-4">Add New File</button>
                        </form>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
            </div>

            <div className='h-auto mt-10 bg-slate-200 rounded-xl p-4'>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stocks</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            data.items.map((item, i) => (
                                <tbody>
                                    {/* row 1 */}
                                    <tr key={i}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`https://psc2023.azurewebsites.net/api/files/Products/${item.id}/${item.picture}`} alt={item.id} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.product_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.price} pesos
                                        </td>
                                        <td>{item.stocks}</td>
                                        <th>
                                            <button onClick={() => handleDialog(item.id)} className="btn btn-ghost btn-xs">Edit</button>
                                            <dialog id={item.id} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <h3 className="font-bold text-lg">Update {item.product_name}?</h3>
                                                    <form onSubmit={handleUpdate}>
                                                        <label className="block">
                                                            <span className="text-gray-700">Product Name</span>
                                                            <input onChange={(e) => setDatas(datas => ({ ...datas, 'product_name': e.target.value }))} type="text" name="product_name" defaultValue={item.product_name} className="form-input mt-1 block w-full" placeholder="Enter product name" />
                                                        </label>
                                                        <label className="block">
                                                            <span className="text-gray-700">Price</span>
                                                            <input type="number" onChange={(e) => setDatas(datas => ({ ...datas, 'price': e.target.value }))} name="price" defaultValue={item.price} className="form-input mt-1 block w-full" placeholder="Enter price" />
                                                        </label>
                                                        <label className="block">
                                                            <span className="text-gray-700">Stocks</span>
                                                            <input type="number" name="stocks" onChange={(e) => setDatas(datas => ({ ...datas, 'stocks': e.target.value }))} defaultValue={item.stocks} className="form-input mt-1 block w-full" placeholder="Enter stocks" />
                                                        </label>
                                                        <button type="submit" className="btn btn-primary mt-4">Update</button>
                                                    </form>
                                                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                                </div>
                                            </dialog>
                                        </th>
                                    </tr>
                                </tbody>
                            ))}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stocks</th>
                                <th></th>
                            </tr>
                        </tfoot>

                    </table>
                </div>

            </div >
        </div >

    )
}

export default AdminPage