import Logo from "@/assets/Logo.png"
import { Link } from 'react-router-dom';
import {useContext} from 'react'
import { UserContext } from "@/services/userContext";

const NavbarCalendar = () => {
  const userContext = useContext(UserContext)
  const handleLogout = () => {
    userContext.setUser(null)
  }

  const flexBetween = "flex items-center justify-between";
  const navbarBackground = "bg-primary-100 drop-shadow";
  return (
    <nav>
      <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            {/* Create our own logo & Replace this logo */}
            <img alt="logo" src={Logo} />
            {/* RIGHT SIDE */}
            <div className={`${flexBetween} w-full`}>
              <div className={`${flexBetween} gap-8 text-sm`}>
                <button></button>
              </div>
              <div className={`${flexBetween} gap-8`}>
                {/* Route back to the landing page */}
                <Link to="/">
                  <button onClick={handleLogout} className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white">
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCalendar;
