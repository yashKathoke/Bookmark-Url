// import './App.css'
import { Outlet } from 'react-router-dom'
import{Header, Footer} from './components/index'
import { useSelector } from 'react-redux'




function App() {

  const urls = useSelector((state) => state.post.urls);



    return (
      <>
        <div className='w-full h-full bg-blue-500'>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </>
    )
  
  
}

export default App
