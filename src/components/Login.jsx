import React, {useState} from 'react'
import { Input, Button } from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import  authService  from '../supabase/auth'
import { login as authLogin}  from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
    const { control, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")


    // const login = async (data) => {
    //     setError("")
    //     try {
    //         console.log(data);

    //         const session = await authService.login(data);
    //         console.log(session);
            

    //         if (session) {
    //             const userData = await authService.getAccount()

    //             dispatch(login(userData))
    //             console.log(userData)
                
    //         }   
    //         navigate('/')
            
    //     } catch (error) {
    //         setError(error.message)
    //     }
    // }

    const login = async (data) => {
        setError("");

        try {
            console.log(data);
            
            const session = await authService.login({...data});
            console.log(session);
            

            if (session) {
                const userData = await authService.getAccount();

                dispatch(authLogin(userData))
                console.log(userData)
                
            }
            navigate("/");
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(login)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <Input
                                    type="email"
                                    control={control}
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <Input
                                    type="password"
                                    control={control}
                                    name="password"
                                    label="Password"
                                    placeholder="Password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                login
                                </Button>

                        </div>

                        <div>
                            <p className="text-sm text-center text-gray-900">
                                Don't have a account?{' '}
                                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    SignUp
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}


export default Login;