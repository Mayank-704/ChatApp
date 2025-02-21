import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom"

  function NavBar() {
    const {authUser, logout} = useAuthStore();

    return (
      <nav className=" h-10 w-[100vw] bg-amber-100  px-10 py-2">
        <ul className="flex justify-end gap-4">
          {authUser ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <button onClick={logout}><Link to="/login">Logout</Link></button>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </>
          )}
        </ul>
      </nav>
    );
  }

  export default NavBar;
