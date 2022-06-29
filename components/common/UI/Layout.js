import React from 'react';
import Link from 'next/link';

const Layout = (props) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">All routes</Link>
            </li>
            <li>
              <Link href="/add-new-route">Add new Route</Link>
            </li>
            <li>
              <Link href="/add-new-place">Add new Place</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;