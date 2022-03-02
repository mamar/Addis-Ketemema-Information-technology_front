import { filter, result } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/allRequest';
import { API_URL } from './Constant1';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'office_name', label: 'ፅ/ቤት', alignRight: false },
  { id: 'user_fullname', label: 'የጠያቂዉ ሙሉ ስም', alignRight: false },
  { id: 'division', label: 'የስራ ሂደት', alignRight: false },
  { id: 'floor_no', label: 'አድራሻ', alignRight: false },
  { id: 'office_no', label: 'ቢሮ ቁጥር', alignRight: false },
  { id: 'phone', label: 'ስልክ ቁጥር', alignRight: false },
  { id: 'request_type', label: 'የአገልግሎቱ አይነት', alignRight: false },
  { id: 'problem_desc', label: 'የችግሩ መግለጫ', alignRight: false },
  { Date: 'Date', label: 'የተጠየቀበት ቀን', alignRight: false },
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
      (_user) => _user.fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function NewRequest() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('fullname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requestList, SetRequestList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios.get(`${API_URL}/GetNewRequest`).then((Response) => {
      SetRequestList(Response.data);
    });
  });
  const AssignTask = (taskid, username) => {
    axios.put(`${API_URL}/AssignTask/${taskid}/${username}`).then((response) => {
      if (response.data.Message === 'Error') {
        alert('Server Error');
      }
      if (response.data.Message === 'Success') {
        console.log(response);
        alert('You take the task Successfully');
      }
    });
  };

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
    Date: requestList.Date
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

  return (
    <Page title="Send Request">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            አዲስ የተጠየቁ አገልግሎቶች
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
              table="NewRequest"
              filename="አዲስ የተጠየቁ ስራዎች"
              sheet="አዲስ የተጠየቁ ስራዎች"
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
              <Table id="NewRequest">
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
                          key={fullname}
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
                                onClick={() => AssignTask(row.request_id, users.user[0].username)}
                              >
                                <ListItemIcon>
                                  <Icon icon={trash2Outline} width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Assign Task"
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
