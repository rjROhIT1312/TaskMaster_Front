import React from 'react'
import { useNavigate, Link} from 'react-router-dom';

export default function Navbar() {
  const auth = localStorage.getItem('token');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

  return (
 <>
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {
              auth ? <Link className="navbar-brand"  to='/AllTask' >TaskMaster</Link> : 
              <Link className="navbar-brand" to='/'>TaskMaster</Link>
            }
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
          {
              auth ? <li className="nav-item"><Link className="nav-link" to='/AllTask'>Your Tasks</Link></li> : null
            }
            {
              auth ? <li className="nav-item"><Link className="nav-link" to='/Task'>Create Tasks</Link></li> : null
            }
            {
              auth ? <li className="nav-item"><Link className="nav-link" onClick={logout} to='./'>Logout</Link></li> : null
            }
          </ul>
        </div>
      </div>
    </nav>
  

</>
  )
}

