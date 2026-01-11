
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {

    const [menutoggle, setMenutoggle] = useState(false)

    const Toggle = () => setMenutoggle(!menutoggle)
    const closeMenu = () => setMenutoggle(false)

    return (
        <div className="header">
            <div className="logo-nav">
                <Link to="/" className="logo-text" onClick={closeMenu}>
                    LIBRARY
                </Link>
            </div>

            <div className='nav-right'>
                <input className='search-input' type='text' placeholder='Search a Book' />

                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMenu}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to="/books">Books</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li className="option">
  <Link to="/borrow">Borrow Book</Link>
</li>
{/* <li className="option">
  <Link to="/return">Return Book</Link>
</li> */}
<li className="option">
  <Link to="/dashboard">My Dashboard</Link>
</li>
                </ul>
            </div>

            <div className="mobile-menu" onClick={Toggle}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    )
}

export default Header
