import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="text-lg px-6 py-8">
      <div className="container mx-auto flex justify-between items-center list-none w-full">
        
        <div className="flex">
          <Link to={'/'} className="text-yellow-400 text-2xl font-semibold">
            <span className="text-yellow-400">Anim</span>
            <span className="text-red-500">Hey!</span>
          </Link>
        </div>

        <ul className="flex items-center">
          <li className="mr-5 hover:text-yellow-300">
            <Link to="/">Genres</Link>
          </li>
          <li className="mr-5 hover:text-yellow-300">
            <Link to="/secondpage">Trending</Link>
          </li>
          <li className="mr-5 hover:text-yellow-300">
            <Link to="/secondpage">Popular</Link>
          </li>
          <li className="mr-5 hover:text-yellow-300">
            <Link to="/secondpage">Upcoming</Link>
          </li>
          
        </ul>

      </div>
    </nav>
  );
}
