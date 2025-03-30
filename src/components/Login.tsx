// components/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../utils/api';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const token = await loginUser(values.email, values.password);
        login(token);
        navigate('/users');
        toast.success('Login successful');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Login failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      p: 3,
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 4,
        boxShadow: 24,
      }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Welcome Back
        </Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}