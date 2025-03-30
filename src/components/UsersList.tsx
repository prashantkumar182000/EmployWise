// components/UsersList.tsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead, 
  TableRow, 
  Paper, 
  Pagination,
  CircularProgress
} from '@mui/material';
import { getUsers } from '../utils/api';
import UserRow from './UserRow';
import EditUserModal from './EditUserModal';
import { toast } from 'react-toastify';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(currentPage);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>User Management</Typography>
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'background.paper' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Avatar</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <img src={user.avatar} alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                      </TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <UserRow 
                          user={user} 
                          onDelete={handleDeleteUser}
                          onEdit={(user) => setEditUser(user)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                Page {currentPage} of {totalPages}
              </Typography>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </Paper>

      {editUser && (
  <EditUserModal
    user={editUser}
    open={!!editUser}
    onClose={() => setEditUser(null)}
    onSuccess={(updatedUser) => {
      // Update local state instead of refetching
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditUser(null);
    }}
  />
)}
    </Box>
  );
}