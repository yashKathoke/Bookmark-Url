import { useEffect } from 'react'
import React from 'react'
import {Login as Logincomponent} from '../components/index'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'



function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(state => state.auth.status)

  useEffect(() => {
    if(status === true){
      navigate('/')
    }
    else if(status === false){
      navigate('/login')
    }
  }, [status])
  return (
    <div className='py-8'>
        <Logincomponent />
    </div>
  )
}

export default Login