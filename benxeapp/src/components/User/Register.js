import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { endpoints } from "../../configs/API";
import { Button, TextField, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';

const StyledInput = styled(TextField)({
    marginBottom: '20px',
    backgroundColor: '#F2CED5',
});

const AvatarPreview = styled('img')({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'block',
    margin: '16px auto',
});

const Register = () => {
    const [user, setUser] = useState({
        Loai_NguoiDung: 3  
    });
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const fields = [
        { label: "Họ và tên lót", name: "first_name" },
        { label: "Tên", name: "last_name" },
        { label: "Tên đăng nhập", name: "username" },
        { label: "Email", name: "email" },
        { label: "Mật khẩu", name: "password", type: "password" },
        { label: "Xác nhận mật khẩu", name: "confirm_password", type: "password" },
    ];

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles);
            console.log('Rejected files:', rejectedFiles);

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(file => {
                    console.error(`File ${file.file.name} bị từ chối vì: ${file.errors.map(e => e.message).join(', ')}`);
                });
                return;
            }

            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                console.log('File type:', file.type);
                setAvatar(file);
                setAvatarUrl(URL.createObjectURL(file));
            }
        },
    });

    const handleRegister = async () => {
        if (user.password !== user.confirm_password) {
            setErr(true);
            return;
        }

        setErr(false);
        setLoading(true);

        const formData = new FormData();
        for (let key in user) {
            if (key !== 'confirm_password') {
                formData.append(key, user[key]);
            }
        }

        if (avatar) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validImageTypes.includes(avatar.type)) {
                formData.append('avatar', avatar);
            } else {
                console.error('Invalid file type:', avatar.type);
            }
        }

        try {
            const res = await API.post(endpoints['Register'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                setSuccessMessage('Đăng ký thành công!');
                setTimeout(() => navigate("/login"), 3000); 
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                ĐĂNG KÝ TÀI KHOẢN
            </Typography>
            {fields.map((field) => (
                <StyledInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    value={user[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                />
            ))}

            {err && <Alert severity="error">Mật khẩu không khớp!</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <div
                {...getRootProps()}
                style={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px',
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="body1">Kéo thả hoặc nhấp để chọn ảnh đại diện</Typography>
            </div>
            {avatarUrl && <AvatarPreview src={avatarUrl} alt="Avatar" />}
            
            <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={loading}
                style={{ backgroundColor: "#BF6B7B" }}
            >
                {loading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ'}
            </Button>
        </div>
    );
};

export default Register;
