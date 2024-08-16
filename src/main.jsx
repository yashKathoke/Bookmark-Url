import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store, persistor} from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home, Login, Signup} from './Pages'
import Authprotect from './components/Authprotect.jsx'


import { PersistGate } from 'redux-persist/integration/react';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
            <Home />
        )
      },
      {
        path: '/login',
        element: (
        <Authprotect authentication={false}>
          <Login />
        </Authprotect>
        )

      },
      {
        path: '/signup',
        element: (
          <Authprotect authentication={false}>
          <Signup />
        </Authprotect>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(



  <React.StrictMode>
    <Provider store= {store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>

      </PersistGate>
    </Provider>
  </React.StrictMode>

)
