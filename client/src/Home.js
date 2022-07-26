import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <main className="container">
      <body style="background-color:#f0f0f0"></body>
      <h1>Get Connected Community Resource Center (GCRC)</h1>
      {user?.isAdmin && (
        <p>
          <Link to="/detail/new" className="btn btn-primary">
            New Item
          </Link>
        </p>
      )}
    </main>
  );
}

export default Home;
