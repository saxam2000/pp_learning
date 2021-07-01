import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="navbar-brand" >Navbar</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/">
        <li className="nav-item" key="home">
          <div className="nav-link active" aria-current="page">Home</div>
        </li>
          </Link>
          <Link to="./movies">
              
        <li className="nav-item" key="movies">
          <div className="nav-link">Movies</div>
        </li>
          </Link>
   
<Link to="./about">

        <li className="nav-item" key="about">
          <div className="nav-link " tabIndex="-1" aria-disabled="true"> About</div>
        </li>
</Link>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
        {/* </div> */}
</nav>
        </div>
        </>
    )
}
