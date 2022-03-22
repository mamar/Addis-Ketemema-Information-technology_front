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
import { UserListHead, UserListToolbar } from '../../components/_dashboard/allRequest';
import { API_URL } from '../Constant1';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'office_name', label: 'የፅ/ቤቱ ስም', alignRight: false },
  { id: 'user_fullname', label: 'የጠያቂዎ ስም', alignRight: false },
  { id: 'division', label: 'የስራ ሂደት', alignRight: false },
  { id: 'floor_no', label: 'አድራሻ', alignRight: false },
  { id: 'office_no', label: 'ቢሮ ቁጥር', alignRight: false },
  { id: 'phone', label: 'ስልክ ቁጥር', alignRight: false },
  { id: 'request_type', label: 'የጠያቂዉ ስም', alignRight: false },
  { id: 'problem_desc', label: 'ስለችግሩ መግለጫ', alignRight: false },
  { id: 'Date', label: 'የተጠየቀበት ቀን', alignRight: false },
  { id: 'Assignedby', label: 'Assigned by', alignRight: false },
  { id: 'assignedDate', label: 'የተጀመረበት ቀን', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: 'checkstandard', label: 'stand. ብዛት ', alignRight: false },
  { id: 'satisfaction', label: 'እርካታ ', alignRight: false },
  { id: 'Comment', label: 'አስተያት ', alignRight: false },
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
      (_user) => _user.office_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function AssignedRequest() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('office_name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requestList, SetRequestList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  useEffect(() => {
    axios
      .get(`${API_URL}/Request/GetProgressTask/${users ? users.user[0].username : null}`)
      .then((Response) => {
        SetRequestList(Response.data);
      });
  }, []);
  const finishTask = (taskid) => {
    axios.put(`${API_URL}/Request/finishTask/${taskid}`).then((response) => {
      if (response.data.Message === 'Error') {
        alert('Server Error');
        window.location.reload();
      }
      if (response.data.Message === 'Success') {
        alert('Status Changed');
        window.location.reload();
      }
    });
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requestList.map((n) => n.office_name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requestList.length) : 0;

  const filteredUsers = applySortFilter(requestList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    return (
      <Page title="የተጀመሩ ስራዎች">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom style={{ backgroundColor: '#CD92EA' }}>
              የተጀመሩ ስራዎች
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
            >
              <ReactHTMLTableToExcel
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
                table="Assigned"
                filename="የተጀመሩ ስራዎች"
                sheet="የተጀመሩ ስራዎች"
                buttonText="Export excel"
              />
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
                <Table id="Assigned" stickyheader="true" aria-label="sticky table">
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={requestList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const isItemSelected = selected.indexOf(row.request_id) !== -1;

                        return (
                          <TableRow
                            style={{ backgroundColor: '#C7E4F9' }}
                            hover
                            key={row.request_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row.request_id)}
                              />
                            </TableCell>
                            <TableCell align="left">{row.office_name}</TableCell>
                            <TableCell align="left">{row.user_fullname}</TableCell>
                            <TableCell align="left">{row.division}</TableCell>
                            <TableCell align="left">{row.floor_no}</TableCell>
                            <TableCell align="left">{row.office_no}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">{row.request_type}</TableCell>
                            <TableCell align="left">{row.problem_desc}</TableCell>
                            <TableCell align="left">{row.Date}</TableCell>
                            <TableCell align="left">{row.Assignedby}</TableCell>
                            <TableCell align="left">{row.assignedDate}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{row.checkstandard}</TableCell>
                            <TableCell align="left">{row.satisfaction}</TableCell>
                            <TableCell align="left">{row.comment}</TableCell>
                            <TableCell align="left">
                              {row.checkstandard >= 1 ? (
                                <LoadingButton
                                  fullWidth
                                  size="small"
                                  variant="contained"
                                  onClick={() => finishTask(row.request_id)}
                                  style={{ backgroundColor: 'red' }}
                                >
                                  ይጨርሱ
                                </LoadingButton>
                              ) : null}
                            </TableCell>
                            <TableCell align="left">
                              <LoadingButton
                                fullWidth
                                size="small"
                                type="submit"
                                variant="contained"
                                component={RouterLink}
                                to={`/dashboard/StandardForm/${row.request_id}`}
                                style={{ backgroundColor: '#75077E' }}
                              >
                                ሰታንዳርድ
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
              count={requestList.length}
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
