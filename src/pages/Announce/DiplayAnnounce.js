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
import { Link as RouterLink, Navigate } from 'react-router-dom';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/allRequest';
import { API_URL } from '../Constant1';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'anouncid', label: 'anouncid', alignRight: false },
  { id: 'AnnounceName', label: 'ማሳሰቢያ', alignRight: false },
  { id: 'AnnounceDate', label: 'የተፃፈበት ቀን', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
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
      (_user) => _user.anounceName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function DisplayAnnounce() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('announceName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [AnnounceList, setAnnounceList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  useEffect(() => {
    axios.get(`${API_URL}/Announce/DisplayAnnounce`).then((Response) => {
      setAnnounceList(Response.data);
    });
  }, []);
  const EndAnnounce = (anounceid) => {
    axios.put(`${API_URL}/Announce/EndAnnounce/${anounceid}`).then((Response) => {
      if (Response.data.Message === 'Esuccess') {
        alert('Announcement Ended Succesffully');
        window.location.reload();
      }
      if (Response.data.Message === 'Eerror') {
        alert('server error');
        window.location.reload();
      }
    });
  };
  const DeletAnounce = (anouncid) => {
    axios.delete(`${API_URL}/Announce/DeleteAnnounce/${anouncid}`).then((Response) => {
      if (Response.data.Message === 'Dsuccess') {
        alert('Announcement Delete Succesffully');
        window.location.reload();
      }
      if (Response.data.Message === 'Derror') {
        alert('server error');
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
      const newSelecteds = AnnounceList.map((n) => n.anounceName);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - AnnounceList.length) : 0;

  const filteredUsers = applySortFilter(AnnounceList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    if (users.user[0].ROLES === 'IT') {
      return <Navigate to="/dashboard/AssignedRequest" />;
    }

    return (
      <Page title=" የስታንዳረድ ዝርዝር">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom style={{ backgroundColor: '#CD92EA' }}>
              የማሳሰቢያ ዝርዝር
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/AddAnnouncement"
              startIcon={<Icon icon={plusFill} />}
            >
              ማሳሰቢያ ይጨምሩ
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
                <Table id="standardList" stickyheader="true" aria-label="sticky table">
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={AnnounceList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const isItemSelected = selected.indexOf(row.anounceName) !== -1;

                        return (
                          <TableRow
                            style={{ backgroundColor: '#C7E4F9' }}
                            hover
                            key={row.anouncid}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row.anounceName)}
                              />
                            </TableCell>
                            <TableCell align="left">{row.anouncid}</TableCell>
                            <TableCell align="left">{row.anounceName}</TableCell>
                            <TableCell align="left">{row.anounceDate}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">
                              <LoadingButton
                                fullWidth
                                size="small"
                                type="submit"
                                variant="contained"
                                onClick={() => DeletAnounce(row.anouncid)}
                                style={{ backgroundColor: 'red' }}
                              >
                                Delete
                              </LoadingButton>
                            </TableCell>
                            <TableCell align="left">
                              {row.status === 'New' ? (
                                <LoadingButton
                                  fullWidth
                                  size="small"
                                  type="submit"
                                  variant="contained"
                                  onClick={() => EndAnnounce(row.anouncid)}
                                  style={{ backgroundColor: '#75077E' }}
                                >
                                  End
                                </LoadingButton>
                              ) : null}
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
              count={AnnounceList.length}
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
