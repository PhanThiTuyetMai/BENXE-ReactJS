import React, { useContext } from "react";
import { Button } from "@mui/material"; // Thay thế Button của React Native bằng Button của Material-UI (hoặc một thư viện tương tự)
import MyContext from '../../configs/MyContext';
import { useNavigate } from "react-router-dom"; 

const Logout = () => {
    const [user, dispatch] = useContext(MyContext);
    const navigate = useNavigate(); 

    const logout = () => {
        dispatch({
            type: "logout"
        });
        navigate('/')
    };

    const goToLogin = () => {
        navigate('/login'); 
    };

    if (user === null) {
        return (
            <Button
                style={{ backgroundColor: "#BF6B7B", margin: 10 }} 
                onClick={goToLogin} 
            >
                Đăng nhập
            </Button>
        );
    }

    return (
        <Button
            style={{ backgroundColor: "#BF6B7B", margin: 10 }} // Thiết lập màu và margin
            onClick={logout} // Sử dụng onClick cho các sự kiện của nút
        >
            Đăng xuất
        </Button>
    );
};

export default Logout;
