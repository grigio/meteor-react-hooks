import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../utils/useUser';
import { AppContext } from '../AppContext';
import useReactRouter from 'use-react-router'



export default function NavBar() {
  const { currentUser } = useContext(AppContext)
  const { history, location, match } = useReactRouter();
  return (
    <div>

      {['home', 'login','tasks'].map( path => {
        return (location.pathname === `/${path}`) ? <span key={path}>{path} </span> : <span key={path}><Link to={`/${path}`}>{path} </Link></span>
      })}

    </div>
  )
}