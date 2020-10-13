import React, { Fragment } from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <Fragment>
      {/*<Navbar />*/}
      <div className="base-control">{children}</div>
    </Fragment>
  );
}

export default Layout;
