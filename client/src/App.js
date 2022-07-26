import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import { AuthContextProvider, AuthProtected } from './AuthContext';
import Header from './Header';
import Home from './Home';
import Detail from './Detail';
import Login from './Login';
import ItemForm from './Itemform';
import PasswordRoutes from './Passwords/PasswordRoutes';
import Register from './Register';
import UserRoutes from './Users/UserRoutes';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/detail/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <ItemForm />
              </AuthProtected>
            }
          />
          <Route
            path="/detail/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <ItemForm />
              </AuthProtected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/passwords/*" element={<PasswordRoutes />} />
          {process.env.REACT_APP_FEATURE_REGISTRATION === 'true' && <Route path="/register" element={<Register />} />}
          <Route
            path="/account/*"
            element={
              <AuthProtected>
                <UserRoutes />
              </AuthProtected>
            }
          />
          <Route path="/detail/:id" element={<Detail />} />{' '}
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
