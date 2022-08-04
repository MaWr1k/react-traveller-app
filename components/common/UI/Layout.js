import React from 'react';
import Link from 'next/link';

const Layout = ({children}) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/"><a>All routes</a></Link>
            </li>
            <li>
              <Link href="/add-new-route"><a> Add new Route</a></Link>
            </li>
            <li>
              <Link href="/add-new-place"><a>Add new Place</a></Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;