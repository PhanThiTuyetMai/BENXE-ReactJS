import './App.css';
import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyContext from './configs/MyContext';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import NhanVien from './components/NhanVien/NhanVien';
import Logout from './components/User/Logout';
import NhanVienDetail from './components/NhanVien/DetailNV';
import ThemNV from './components/NhanVien/AddNhanVien';
import SuaNhanVien from './components/NhanVien/SuaNV';
import TuyenXe from './components/TuyenXe/TuyenXe';
import ThemTuyenXe from './components/TuyenXe/AddTuyenXe';
import SuaTuyenXe from './components/TuyenXe/SuaTuyenXe';
import ChuyenXe from './components/ChuyenXe/ChuyenXe';
import ChuyenXeDetail from './components/ChuyenXe/DetailChuyenXe';
import DatVe from './components/DatVe/DatVe';
import ThongKeDT from './components/ThongKe/ThongKe';
import Register from './components/User/Register';
import ThemCX from './components/ChuyenXe/AddChuyenXe';
import SuaChuyenXe from './components/ChuyenXe/SuaChuyenXe';

const initialState = { user: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    case 'logout':
      return { ...state, user: null }; 
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userRole, setUserRole] = useState(null);
  const { user } = state;

  useEffect(() => {
    if (user) {
      setUserRole(user.Loai_NguoiDung);
    } else {
      setUserRole(null);
    }
  }, [user]);

  return (
    <Router>
      <MyContext.Provider value={[state, dispatch]}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tuyenxe' element={<TuyenXe />} />
          <Route path='/add_tuyenxe' element={<ThemTuyenXe />} />
          <Route path='/sua_tuyenxe/:TuyenXeID' element={<SuaTuyenXe />} />
          <Route path='/chuyenxe/tuyen/:TuyenXeID' element={<ChuyenXe />} />
          <Route path='/add_chuyenxe/:TuyenXeID' element={<ThemCX />} />
          <Route path='/suachuyenxe/:ChuyenXeID' element={<SuaChuyenXe/>} />
          <Route path='/chuyenxe/detail/:ChuyenXeID' element={<ChuyenXeDetail />} />
          <Route path='/dat_ve/:ChuyenXeID' element={<DatVe />} />
          {userRole === 1 && (
            <>
              <Route path='/nhanvien' element={<NhanVien />} />
              <Route path='/add_nv' element={<ThemNV />} />
              <Route path='/detail_nv/:id' element={<NhanVienDetail />} />
              <Route path='/sua_nv/:idnv' element={<SuaNhanVien />} />
              <Route path='/thongkedoanhthu' element={<ThongKeDT />} />
            </>
          )}
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
