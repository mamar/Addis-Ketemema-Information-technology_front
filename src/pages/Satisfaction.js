import { add, filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
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
  TablePagination,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Box
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
// components
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import Select from '@mui/material/Select';
import { MHidden } from '../components/@material-extend';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/allRequest';
import SendRequest from './SendRequest';
import EmployeAuth from '../layouts/EmployeAuth';
import DashboardNavbar from '../layouts/dashboard/DashboardNavbar';
import { API_URL } from './Constant1';
import { AddSatisfaction } from '../components/authentication/Request';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'user_fullname', label: 'Assigned by', alignRight: false },
  { id: 'Position', label: 'Position', alignRight: false },
  { id: 'phone', label: 'phone', alignRight: false },
  { id: 'Gender', label: 'Gender', alignRight: false },
  { id: 'request_type', label: 'Request_type', alignRight: false },
  { id: 'problem_desc', label: 'Problem_desc', alignRight: false },
  { id: 'Date', label: 'Request Date', alignRight: false },
  { id: 'assignedDate', label: 'AssignedDate', alignRight: false },
  { id: 'finisheDate', label: 'FinishedDate', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false },
  { id: 'Satisfaction', label: 'Satisfaction', alignRight: false },
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
    return filter(array, (_user) => _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function Satisfaction() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('status');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requestList, SetRequestList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [satisfaction1, setsatisfaction] = useState([]);
  const hundleSatisfaction = (requestid) => {
    axios
      .patch(`${API_URL}/SendSatsfaction/${requestid}`, {
        satisfaction: satisfaction1
      })
      .then((response) => {
        if (response.Message === 'success') {
          alert('Satisfaction Send Successfully');
          window.location.reload();
          console.log(satisfaction1);
        }
        if (response.Message === 'error') {
          alert('Server error');
          console.log(response);
          console.log(satisfaction1);
          window.location.reload();
        }
      });
  };
  useEffect(() => {
    axios.get(`${API_URL}/GetRequestedTasks/${users.user[0].username}`).then((Response) => {
      SetRequestList(Response.data);
    });
  });
  const finishTask = (taskid) => {
    axios.put(`${API_URL}/finishTask/${taskid}`).then((response) => {
      if (response.data.Message === 'Error') {
        alert('Server Error');
        console.log(response);
      }
      if (response.data.Message === 'Success') {
        console.log(response);
        alert('Status Changed');
      }
    });
  };
  const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 500,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
  }));
  const request = [...Array(24)].map((_, index) => ({
    request_id: requestList.request_id,
    Position: requestList.Position,
    Gender: requestList.Gender,
    user_fullname: requestList.user_fullname,
    finsihedDate: requestList.finsihedDate,
    satisfaction: requestList.satisfaction,
    Phone: requestList.Phone,
    request_type: requestList.request_type,
    problem_desc: requestList.problem_desc,
    Date: requestList.Date,
    assignedDate: requestList.assignedDate,
    status: requestList.status
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requestList.map((n) => n.status);
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

  return (
    <Page title="Satisfaction">
      <EmployeAuth>
        <DashboardNavbar />
      </EmployeAuth>
      <MHidden width="mdDown">
        <SectionStyle>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pleas use the Search bar to search status
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/SendRequest"
            startIcon={<Icon icon={plusFill} />}
          >
            Send Request
          </Button>
          <TextField align="left" onChange={(e) => setsatisfaction(e.target.value)} />
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
                  rowCount={requestList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { status } = row;
                      const isItemSelected = selected.indexOf(status) !== -1;
                      return (
                        <TableRow
                          hover
                          key={status}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, status)}
                            />
                          </TableCell>
                          <TableCell align="left">{row.user_fullname}</TableCell>
                          <TableCell align="left">{row.Position}</TableCell>
                          <TableCell align="left">{row.Phone}</TableCell>
                          <TableCell align="left">{row.Gender}</TableCell>
                          <TableCell align="left">{row.request_type}</TableCell>
                          <TableCell align="left">{row.problem_desc}</TableCell>
                          <TableCell align="left">{row.Date}</TableCell>
                          <TableCell align="left">{row.assignedDate}</TableCell>
                          <TableCell align="left">{row.finsihedDate}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <br />
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
                                onclick={hundleSatisfaction(row.request_id)}
                              >
                                <ListItemIcon>
                                  <Icon icon={trash2Outline} width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Satisfaction"
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
