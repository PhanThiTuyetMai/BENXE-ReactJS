import './App.css';
import React, {useEffect, useReducer, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyContext from './configs/MyContext';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import NhanVien from './NhanVien';

const initialState = { user: null };
const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userRole, setUserRole] = useState(null);
  const {user} = state;

  useEffect(() => {
    if(user) {
      setUserRole(user.Loai_NguoiDung)
    } else {
      setUserRole(null);
    }
  }, [user])

  return (
    <Router>
      <MyContext.Provider value={[state, dispatch]}>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path="/login" element={<Login />} />
              {userRole === "1" && (
                <>
                  <Route path='/nhanvien' element={<NhanVien/>} />
                </>
              )}
          </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;