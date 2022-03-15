import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, Navigate } from 'react-router-dom';
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
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/allRequest';
import { API_URL } from '../Constant1';
import { StandardForm } from '../../components/authentication/standard';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'service', label: 'የአገልግሎቱ አይነት', alignRight: false },
  { id: 'measurement', label: 'መለኪያ', alignRight: false },
  { id: 'time', label: 'ጊዜ', alignRight: false },
  { id: 'price', label: 'ዋጋ', alignRight: false },
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
      (_user) => _user.service.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function ListOfStandard() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('service');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [standardList, SetstandardList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios.get(`${API_URL}/GetAllStandard`).then((Response) => {
      SetstandardList(Response.data);
    });
  });
  const finishTask = (taskid) => {
    axios.put(`${API_URL}/finishTask/${taskid}`).then((response) => {
      if (response.data.Message === 'Error') {
        alert('Server Error');
      }
      if (response.data.Message === 'Success') {
        console.log(response);
        alert('Status Changed');
      }
    });
  };
  const request = [...Array(24)].map((_, index) => ({
    service: standardList.service,
    standardid: standardList.standardid,
    measurement: standardList.measurement,
    time: standardList.time,
    price: standardList.price
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = standardList.map((n) => n.service);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - standardList.length) : 0;

  const filteredUsers = applySortFilter(standardList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    if (users.user[0].ROLES === 'IT') {
      return <Navigate to="/AssignedRequest" />;
    }

    return (
      <Page title=" የስታንዳረድ ዝርዝር">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              የስታንዳረድ ዝርዝር
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/AddStandard"
              startIcon={<Icon icon={plusFill} />}
            >
              ስታንዳረድ ይጨምሩ
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
                <Table id="standardList" SickyHeader aria-label="sticky table">
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={standardList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const isItemSelected = selected.indexOf(row.standardid) !== -1;

                        return (
                          <TableRow
                            hover
                            key={row.standardid}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row.standardid)}
                              />
                            </TableCell>
                            <TableCell align="left">{row.service}</TableCell>
                            <TableCell align="left">{row.measurement}</TableCell>
                            <TableCell align="left">{row.time}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
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
                                  onClick={() => finishTask(row.request_id)}
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
                                  sx={{ color: 'text.secondary' }}
                                  component={RouterLink}
                                  to={`/dashboard/UpdateStandard/${row.standardid}`}
                                >
                                  <ListItemIcon>
                                    <Icon icon={trash2Outline} width={24} height={24} />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="edit"
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
              count={standardList.length}
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
