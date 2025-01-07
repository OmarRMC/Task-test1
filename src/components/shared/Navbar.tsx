import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 px-3 border-b-2">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Task
        </span>
        <div
          className=" font-medium flex items-center gap-7"
          id="navbar-default"
        >
          <ul className=" flex  flex-row  gap-5  mt-0 md:border-0 bg-white ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `block py-2 px-3 rounded md:bg-transparent    ${isActive ? 'text-blue-700' : 'text-gray-900'} md:p-0`
                }}
              >
                Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className={({ isActive }) => {
                  return `block py-2 px-3   ${isActive ? 'text-blue-700' : 'text-gray-900'}  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                }}

              >
                Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tag"
                className={({ isActive }) => {
                  return `block py-2 px-3   ${isActive ? 'text-blue-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                }}
              >
                Tag
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
