import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
// components
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import USERLIST from '../_mocks_/user';
import Register from './Register';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user_fullname', label: 'user_fullname', alignRight: false },
  { id: 'Username', label: 'Username', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'Age', label: 'Age', alignRight: false },
  { id: 'Position', label: 'Position', alignRight: false },
  { id: 'Roles', label: 'Roles', alignRight: false },
  { id: 'office_name', label: 'office_name', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.user_fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('user_fullname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userlist, SetuserList] = useState([]);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const Deletuser = (userid) => {
    axios.delete(`http://127.0.0.1:8080/Deleteusers/${userid}`).then((response) => {
      alert('Deleted Successfully');
    });
  };
  useEffect(() => {
    axios.get('http://127.0.0.1:8080/Getusers').then((Response) => {
      SetuserList(Response.data);
    });
  });
  const users = [...Array(24)].map((_, index) => ({
    office_name: userlist.office_name,
    userid: userlist.userid,
    user_fullname: userlist.user_fullname,
    username: userlist.username,
    age: userlist.age,
    Gender: userlist.age,
    Position: userlist.Position,
    ROLES: userlist.ROLES
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userlist.map((n) => n.user_fullname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userlist.length) : 0;

  const filteredUsers = applySortFilter(userlist, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Users">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/Register"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userlist.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { userfullname, username, Gender, age, Position, ROLES } = row;
                      const isItemSelected = selected.indexOf(userfullname) !== -1;

                      return (
                        <TableRow
                          hover
                          key={userfullname}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, userfullname)}
                            />
                          </TableCell>
                          <TableCell align="left">{row.user_fullname}</TableCell>
                          <TableCell align="left">{row.username}</TableCell>
                          <TableCell align="left">{row.Gender}</TableCell>
                          <TableCell align="left">{row.aGe}</TableCell>
                          <TableCell align="left">{row.Position}</TableCell>
                          <TableCell align="left">{row.ROLES}</TableCell>
                          <TableCell align="left">{row.office_name}</TableCell>
                          <TableCell align="right">
                            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                              <Icon icon={moreVerticalFill} width={20} height={20} />
                            </IconButton>

                            <Menu
                              open={isOpen}
                              anchorEl={ref.current}
                              onClose={() => setIsOpen(false)}
                              PaperProps={{
                                sx: { width: 200, maxWidth: '100%' }
                              }}
                              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                              <MenuItem
                                sx={{ color: 'text.secondary' }}
                                onClick={() => Deletuser(row.userid)}
                              >
                                <ListItemIcon>
                                  <Icon icon={trash2Outline} width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Delete"
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </MenuItem>

                              <MenuItem
                                component={RouterLink}
                                to="#"
                                sx={{ color: 'text.secondary' }}
                              >
                                <ListItemIcon>
                                  <Icon icon={editFill} width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Edit"
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userlist.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
