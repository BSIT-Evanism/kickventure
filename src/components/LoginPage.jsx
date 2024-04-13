import React, { useEffect } from 'react'
import PocketBase from 'pocketbase'
import toast, { Toaster } from 'react-hot-toast';

const pb = new PocketBase('https://ecommerce.forkbun.evansolanoy.studio')

function LoginPage() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLogin, setIsLogin] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '') {
            toast.error('Please enter your email')
        } else if (password === '') {
            toast.error('Please enter your password')
        } else {
            try {
                toast.loading('Loading...')
                const res = await pb.collection('Admin').getOne('act8pbyn5l2vomv')
                console.log(res)
                if (email === res.email && password === res.password) {
                    toast.dismiss()
                    toast.success('Login Success')

                    localStorage.setItem('isLogin', true)
                    setIsLogin(true)
                    const record = await pb.collection('Admin').update('act8pbyn5l2vomv', { "LoginStatus": true })
                    window.location.reload()
                } else {
                    toast.dismiss()
                    toast.error('Email or Password is incorrect')
                }
            } catch (err) {
                console.log(err)
                toast.dismiss()
                toast.error('Something went wrong' + err)
            }
        }
    }

    return (
        <div className="hero min-h-screen bg-lime-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Welcome Back! user {email === '' ? 'Admin' : email}</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-fuchsia-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage