import React from 'react'
import LoginPage from './LoginPage'
import AdminPage from './AdminPage'

function LocalStorage() {
    const [isLogin, setIsLogin] = React.useState(false)

    React.useEffect(() => {
        if (localStorage.getItem('isLogin') === 'true') {
            setIsLogin(true)
        } else {
            localStorage.setItem('isLogin', false)
            setIsLogin(false)
        }
    }, [])

    return (
        <div>
            {isLogin ? (
                <AdminPage />
            ) : (
                <LoginPage />
            )}
        </div>
    )
}

export default LocalStorage