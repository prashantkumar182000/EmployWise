// components/EditUserModal.tsx
import { useState, useEffect } from 'react';
import { User } from './UsersList';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';
import { updateUser } from '../utils/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

interface EditUserModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: (updatedUser: User) => void;
}

export default function EditUserModal({ user, open, onClose, onSuccess }: EditUserModalProps) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await updateUser(user.id, values);
        toast.success('User updated successfully');
        onSuccess({
          ...user,
          ...values
        });
        onClose();
      } catch (error) {
        toast.error('Failed to update user');
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }, [user]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}