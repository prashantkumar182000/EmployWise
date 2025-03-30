// components/UserRow.tsx
import { useState } from 'react';
import { User } from './UsersList';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteUser } from '../utils/api';
import { toast } from 'react-toastify';

interface UserRowProps {
  user: User;
  onDelete: (userId: number) => void;
  onEdit: (user: User) => void;
}

export default function UserRow({ user, onDelete, onEdit }: UserRowProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser(user.id);
      onDelete(user.id);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton color="primary" onClick={() => onEdit(user)}>
          <Edit />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => setDeleteConfirmOpen(true)}>
          <Delete />
        </IconButton>
      </Tooltip>

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {user.first_name} {user.last_name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}