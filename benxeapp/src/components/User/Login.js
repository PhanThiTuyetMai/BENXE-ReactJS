import React, { useState, useContext } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material'; 
import MyContext from '../../configs/MyContext';
import API, { authAPI, endpoints } from '../../configs/API';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, dispatch] = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const formData = new URLSearchParams(); // Use URLSearchParams for form data
      formData.append('username', username);
      formData.append('password', password);
      formData.append('client_id', 'bs7r97ArUviQw1i7szIJTWuuNUlnaqye1DYQbgbP');
      formData.append('client_secret', 'pU5wRaAJ9wH1dz9YrZTdQB3NNo0SAtdSxIx2hKhHCkGfskOpj0b6wN32qoNkWsWCt6JmO5uvzgFIaGvdlxv8IlHQc1svwr3OkuANk6OhLm0y0KtjkH2X3VQdtGdmmHWU');
      formData.append('grant_type', 'password');

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const res = await API.post(endpoints['login'], formData, config);

      localStorage.setItem('access_token', res.data.access_token);

      const authAxios = authAPI(res.data.access_token);

      const user = await authAxios.get(endpoints['current-user']);
      console.log(user.data);

      dispatch({
        type: 'login',
        payload: user.data,
      });

      navigate('/');

    } catch (ex) {
        console.error(ex);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h1 style={{ marginTop: '80px', marginBottom: '50px', textAlign: 'center' }}>ĐĂNG NHẬP</h1>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên đăng nhập..."
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: <i className="material-icons">account_circle</i>, 
          }}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mật khẩu..."
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: <i className="material-icons">visibility</i>, 
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '60px', width: '100%' }}
          onClick={login}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'ĐĂNG NHẬP'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
