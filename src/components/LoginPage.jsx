import React, { useEffect } from 'react'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://psc2023.azurewebsites.net')

function LoginPage() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLogin, setIsLogin] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '') {
            alert('Please enter your email')
        } else if (password === '') {
            alert('Please enter your password')
        } else {
            try {
                const res = await pb.collection('Admin').getOne('act8pbyn5l2vomv')
                console.log(res)
                if (email === res.email && password === res.password) {
                    localStorage.setItem('isLogin', true)
                    setIsLogin(true)
                    const record = await pb.collection('Admin').update('act8pbyn5l2vomv', { "LoginStatus": true })
                    window.location.reload()
                } else {
                    alert('Wrong email or password')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='w-screen h-screen bg-lime-100 flex justify-center items-center'>
            <div className=' w-[50vw] h-[60vh] bg-white'>
                <div className='w-full h-24 bg-gray-200 flex justify-center items-center'>
                    <h1 className='text-2xl font-bold'>Login</h1>
                </div>
                <form onSubmit={handleSubmit} className='w-full h-full bg-white flex flex-col justify-evenly items-center'>
                    <input
                        className='input input-bordered input-primary w-full max-w-xs'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='input input-bordered input-primary w-full max-w-xs'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='btn btn-primary w-full max-w-xs'

                        type='submit'
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage