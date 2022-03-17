import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import dateformat from 'dateformat';
import axios from 'axios';
// material
import {
  Card,
  Table,
  TextField,
  Box,
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
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu
} from '../../components/_dashboard/allRequest';
import { API_URL } from '../Constant1';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'userfullname', label: 'የባለሙያዉ ስም', alignRight: false },
  { id: 'Finished', label: 'ያለቁ ስራዎች', alignRight: false },
  { id: 'Assigned', label: 'ያላለቁ ስራዎች', alignRight: false },
  { id: 'ComputerFinishde', label: 'ኮምፒዩተር ያለቁ', alignRight: false },
  { id: 'ComputerProgress', label: 'ኮምፒዩተር የተጀመሩ', alignRight: false },
  { id: 'PrinterFinished', label: 'ፕሪነተር ያለቁ', alignRight: false },
  { id: 'PrinterProgress', label: 'ፕሪንተር የተጀመሩ', alignRight: false },
  { id: 'PhotoCopyFinished', label: 'ፎቶኮፒ ያለቁ', alignRight: false },
  { id: 'PhotoCopyProgress', label: 'ፎቶኮፒ የተጀመሩ', alignRight: false },
  { id: 'NetworkFinished', label: 'ኔትወርክ ያለቁ', alignRight: false },
  { id: 'NetworkProgress', label: 'ኔትወርክ የተጀመሩ', alignRight: false },
  { id: 'SoftwareFinished', label: 'ሶፍትዌር ያለቁ', alignRight: false },
  { id: 'SoftwareProgress', label: 'ሶፍትዌር የተጀመሩ', alignRight: false },
  { id: 'OtherFinished', label: 'ሌሎች ያለቁ', alignRight: false },
  { id: 'OtherProgress', label: 'ሌሎች ያላለቁ', alignRight: false },
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
export default function Performance() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('user_fullname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [performancelist, setperformancelist] = useState([]);
  const [value, setValue] = useState([null, null]);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = useRef(null);

  /* const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'አፈፃፀም',
    sheet: 'አፈፃፀም'
  }); */
  useEffect(() => {
    axios
      .get(
        `${API_URL}/Request/performance/${dateformat(value[0], 'dd-mm-yy')}/${dateformat(
          value[1],
          'dd-mm-yy'
        )}`
      )
      .then((Response) => {
        setperformancelist(Response.data);
      });
  }, []);
  const performance = [...Array(24)].map((_, index) => ({
    user_fullname: performancelist.user_fullname,
    Finished: performancelist.Finished,
    Assigned: performancelist.Assigned
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = performancelist.map((n) => n.user_fullname);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - performancelist.length) : 0;

  const filteredUsers = applySortFilter(performancelist, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const users = JSON.parse(localStorage.getItem('userinfo'));
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
      <Page title="አፈጻጸም">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              የባለሙያዎች አፈፃፀም
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/Performance"
              startIcon={<Icon icon={plusFill} />}
            >
              <ReactHTMLTableToExcel
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
                table="performance"
                filename="አፈፃፀም"
                sheet="አፈፃፀም"
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <MobileDateRangePicker
                  startText="From"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </Stack>
            </LocalizationProvider>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table id="performance">
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={performancelist.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { userfullname } = row;
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
                            <TableCell align="left">{row.Finished}</TableCell>
                            <TableCell align="left">{row.Assigned}</TableCell>
                            <TableCell align="left">{row.ComputerFinishde}</TableCell>
                            <TableCell align="left">{row.ComputerProgress}</TableCell>
                            <TableCell align="left">{row.PrinterFinished}</TableCell>
                            <TableCell align="left">{row.PrinterProgress}</TableCell>
                            <TableCell align="left">{row.PhotoCopyFinished}</TableCell>
                            <TableCell align="left">{row.PhotoCopyProgress}</TableCell>
                            <TableCell align="left">{row.NetworkFinished}</TableCell>
                            <TableCell align="left">{row.NetworkProgress}</TableCell>
                            <TableCell align="left">{row.SoftwareFinished}</TableCell>
                            <TableCell align="left">{row.SoftwareProgress}</TableCell>
                            <TableCell align="left">{row.OtherFinished}</TableCell>
                            <TableCell align="left">{row.OtherProgress}</TableCell>
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
              count={performancelist.length}
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
