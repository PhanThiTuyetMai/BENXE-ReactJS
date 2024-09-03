import axios from 'axios';

// Base URL for your API
export const BASE_URL = 'http://localhost:8000/'; // Replace with your API URL

// API endpoints
export const endpoints = {
    'nhanvien': '/NhanVien/',
    'khachhang': '/KhachHang/',
    'taixe': '/TaiXe/',
    'ghe': '/Ghe/',
    'xe': '/Xe/',
    've': '/VeXe/',
    'le': '/le/',
    'momo': '/payment/',
    'zalo': '/zalo/payment/',
    'chucvu': '/loainguoidung/',
    'chitietve': '/chitietve/',
    'them_NV': 'NhanVien/Them_NV/',
    'them_KH': 'KhachHang/Them_KH/',
    'them_KH_Di': 'KhachHangDi/Them_KH_Di/',
    'them_TX': 'TaiXe/Them_TX/',
    'them_Ve': 'VeXe/Them_VeXe/',
    'tuyenxe': '/TuyenXe/',
    'them_tuyenXe': '/TuyenXe/Them_TuyenXe/',
    'them_chuyenXe': 'ChuyenXe/Them_ChuyenXe/',
    'chuyenxe': '/ChuyenXe/',
    'Register': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current_user/',
    'list_user': '/users/list_user/',
    'comments': (chuyenxeID) => `/ChuyenXe/${chuyenxeID}/comments/`,
    'them_comment': (chuyenxeID) => `ChuyenXe/${chuyenxeID}/Them_comments/`,
    'them_chi_tiet_ve': (vexeID) => `VeXe/${vexeID}/Them_Chi_Tiet_Ve/`,
    'trang_thai_ghe': (gheID) => `/Ghe/${gheID}/CapNhat_TT/`,
};

// Function to create an authenticated API instance
export const authAPI = (accessToken) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${accessToken}` // Correct 'bearer' to 'Bearer'
        }
    });
};

// Default axios instance without authentication
export default axios.create({
    baseURL: BASE_URL
});
