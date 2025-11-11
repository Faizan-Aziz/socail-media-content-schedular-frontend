import {useState} from 'react'
import './Home.css'
import Login from '../Login/Login.jsx'
import Register from '../Register/Register.jsx'

const Home = (props) =>  {

  const [Loginpage, setLoginPage] = useState(true)   // changed the state from the parent to the child

  const funcSetLogin = (val) =>{
    return setLoginPage(val)
  }
  
  return (
    <div className='home'>

       {
        Loginpage?<Login setLoginFunc={props.setLoginFunc} funcSetLogin={funcSetLogin}/>:<Register funcSetLogin={funcSetLogin}/> 
       }  

    </div>

  )
}

export default Home