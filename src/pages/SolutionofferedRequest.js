import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { styled } from '@mui/material/styles';
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
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/allRequest';
import { API_URL } from './Constant1';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'office_name', label: 'የፅ/ቤቱ ስም', alignRight: false },
  { id: 'user_fullname', label: 'ጠያቂዉ', alignRight: false },
  { id: 'division', label: 'ስራ ሂደት', alignRight: false },
  { id: 'floor_no', label: 'አድራሻ', alignRight: false },
  { id: 'office_no', label: 'ቢሮ ቁፅር', alignRight: false },
  { id: 'phone', label: 'ስልክ ቁጥር', alignRight: false },
  { id: 'request_type', label: 'የአገልግሎቱ አይነት', alignRight: false },
  { id: 'problem_desc', label: 'ስላጋጠመዉ አጭር መግለጫ', alignRight: false },
  { id: 'Date', label: 'የተጠየቀበት ቀን', alignRight: false },
  { id: 'assignedDate', label: 'የተጀመረበት ቀን', alignRight: false },
  { id: 'finishedDate', label: 'ያለቀበት ቀን', alignRight: false },
  { id: 'satisfaction', label: 'እርካታ', alignRight: false },
  { id: 'comment', label: 'አስተያየት', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: '' }
];
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));
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
export default function SolutionofferedRequest() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('user_fullname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requestList, SetRequestList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));

  // Delete
  // eslint-disable-next-line camelcase
  const deleteoffice = (office_id) => {
    // eslint-disable-next-line camelcase
    axios.delete(`${API_URL}/DeleteOffice/${office_id}`).then((response) => {
      alert('Deleted Successfully');
    });
  };
  useEffect(() => {
    axios.get(`${API_URL}/finishedTasksbyUser/${users.user[0].username}`).then((Response) => {
      SetRequestList(Response.data);
    });
  }, []);
  const request = [...Array(24)].map((_, index) => ({
    request_id: requestList.request_id,
    requesterusername: requestList.requesterusername,
    office_name: requestList.office_name,
    user_fullname: requestList.user_fullname,
    division: requestList.division,
    floor_no: requestList.floor_no,
    office_no: requestList.office_no,
    phone: requestList.phone,
    request_type: requestList.request_type,
    problem_desc: requestList.problem_desc,
    Date: requestList.Date,
    assignedDate: requestList.assignedDate,
    finishedDate: requestList.finishedDate,
    satisfaction: requestList.satisfaction,
    comment: requestList.comment,
    status: requestList.status
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requestList.map((n) => n.user_fullname);
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
      <Page title="መፍትሄ የተሰጣቸዉ ስራዎች">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              ያለቁ ስራዎች
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
                table="solutionoffered"
                filename="ያለቁ ስራዎች"
                sheet="ያለቁ ስራዎች"
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
                <Table id="solutionoffered" stickyheader="true" aria-label="sticky table">
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
                        const { fullname } = row;
                        const isItemSelected = selected.indexOf(fullname) !== -1;

                        return (
                          <TableRow
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
                                onChange={(event) => handleClick(event, fullname)}
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
                            <TableCell align="left">{row.assignedDate}</TableCell>
                            <TableCell align="left">{row.finishedDate}</TableCell>
                            <TableCell align="left">{row.satisfaction}</TableCell>
                            <TableCell align="left">{row.comment}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu />
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
