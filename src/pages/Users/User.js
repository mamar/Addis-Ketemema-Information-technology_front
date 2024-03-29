import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
// material
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import axios from 'axios';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user';
import { API_URL } from '../Constant1';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userfullname', label: 'ሙሉስም', alignRight: false },
  { id: 'Username', label: 'መለያ ኮድ', alignRight: false },
  { id: 'gender', label: 'ፆታ', alignRight: false },
  { id: 'Age', label: 'እድሜ', alignRight: false },
  { id: 'Position', label: 'የስራ ሂደት', alignRight: false },
  { id: 'Roles', label: 'ሚና', alignRight: false },
  { id: 'officename', label: 'የፅ/ቤተ ስም', alignRight: false },
  { id: 'division', label: 'የስራ ሂደት', alignRight: false },
  { id: 'floorno', label: 'አድራሻ', alignRight: false },
  { id: 'officeno', label: 'ቢሮ ቁጥር', alignRight: false },

  { id: 'status1', label: 'status', alignRight: false },
  { id: '' },
  { id: '' },
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
  const blockuser = (userid) => {
    axios.put(`${API_URL}/user/blockuser/${userid}`).then((response) => {
      if (response.data.Message === 'blocked') {
        alert('user Blocked ');
        window.location.reload();
      }
      if (response.data.Message === 'allready blocked') {
        alert('Warning allready blocked');
        window.location.reload();
      }
    });
  };
  const unblockuser = (userid) => {
    axios.put(`${API_URL}/user/unblockuser/${userid}`).then((response) => {
      if (response.data.Message === 'ublocked') {
        alert('user Unblocked ');
        window.location.reload();
      }
      if (response.data.Message === 'repition') {
        alert('Warning allready unblocked');
        window.location.reload();
      }
    });
  };
  const Deletuser = (userid) => {
    axios.delete(`${API_URL}/user/Deleteusers/${userid}`).then(() => {
      alert('Deleted Successfully');
      window.location.reload();
    });
  };
  useEffect(() => {
    axios.get(`${API_URL}/user/Getusers`).then((Response) => {
      if (Response.data === 'error') {
        alert('Server Error');
      } else {
        SetuserList(Response.data);
      }
    });
  }, []);

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
  const users1 = JSON.parse(localStorage.getItem('userinfo'));
  if (!users1) {
    return <Navigate to="/login" />;
  }
  if (users1) {
    if (users1.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    return (
      <Page title="Users">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom style={{ backgroundColor: '#CD92EA' }}>
              የስራተኞችና የባለሙያዎች ሙሉ መረጃ
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/Register"
              startIcon={<Icon icon={plusFill} />}
            >
              Add New User
            </Button>
            <ReactHTMLTableToExcel
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              table="users"
              filename="የባለሙያዎችና የሰራተኞች ሙሉ መረጃ"
              sheet="የባለሙያዎችና የሰራተኞች ሙሉ መረጃ"
              buttonText="Export excel"
            />
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table id="users" stickyheader="true" aria-label="sticky table">
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
                        const isItemSelected = selected.indexOf(row.userid) !== -1;

                        return (
                          <TableRow
                            style={{ backgroundColor: '#C7E4F9' }}
                            hover
                            key={row.userid}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row.userid)}
                              />
                            </TableCell>
                            <TableCell align="left">{row.user_fullname}</TableCell>
                            <TableCell align="left">{row.username}</TableCell>
                            <TableCell align="left">{row.Gender}</TableCell>
                            <TableCell align="left">{row.Age}</TableCell>
                            <TableCell align="left">{row.Position}</TableCell>
                            <TableCell align="left">{row.ROLES}</TableCell>
                            <TableCell align="left">{row.office_name}</TableCell>
                            <TableCell align="left">{row.division}</TableCell>
                            <TableCell align="left">{row.floor_no}</TableCell>
                            <TableCell align="left">{row.office_no}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">
                              <LoadingButton
                                fullWidth
                                size="small"
                                type="submit"
                                variant="contained"
                                onClick={() => Deletuser(row.userid)}
                                style={{ backgroundColor: 'red' }}
                              >
                                Delete
                              </LoadingButton>
                            </TableCell>
                            <TableCell align="left">
                              {row.status === 'unblock' ? (
                                <LoadingButton
                                  fullWidth
                                  size="small"
                                  type="submit"
                                  variant="contained"
                                  onClick={() => blockuser(row.userid)}
                                  style={{ backgroundColor: '#75077E' }}
                                >
                                  Block
                                </LoadingButton>
                              ) : (
                                <LoadingButton
                                  fullWidth
                                  size="small"
                                  type="submit"
                                  variant="contained"
                                  onClick={() => unblockuser(row.userid)}
                                  style={{ backgroundColor: '#08890E' }}
                                >
                                  Unblock
                                </LoadingButton>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              <LoadingButton
                                fullWidth
                                size="small"
                                type="submit"
                                variant="contained"
                                component={RouterLink}
                                to={`/dashboard/UserUpdate/${row.userid}`}
                                style={{ backgroundColor: '#75077E' }}
                              >
                                Edit
                              </LoadingButton>
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
}
