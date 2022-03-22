import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
// material
import {
  Box,
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
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import dateformat from 'dateformat';
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
  { id: 'service', label: 'የአገልግሎቱ አይነት', alignRight: false },
  { id: 'measurement', label: 'መለኪያ', alignRight: false },
  { id: 'time', label: 'ጊዜ', alignRight: false },
  { id: 'belowStandard', label: 'ከስታንዳረድ በታች የተሰሩ', alignRight: false },
  { id: 'WithinStandard', label: 'በስታንዳረድ የተሰሩ', alignRight: false },
  { id: 'AboveStandard', label: 'ከስታንዳረድ በላይ የተሰሩ', alignRight: false },
  { id: 'Standard', label: 'Standard(%)', alignRight: false },
  { id: 'Actual1', label: 'ጥራት(%)', alignRight: false },
  { id: 'standardAmh', label: 'Stand.level', alignRight: false },
  { id: 'Actual', label: 'እርካታ(%)', alignRight: false },
  { id: 'price', label: 'ዋጋ', alignRight: false },
  { id: 'meremera', label: 'ምርመራ', alignRight: false },
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
export default function StandardList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('service');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [standardlist, Setstandardlist] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [value, setValue] = useState([null, null]);
  useEffect(() => {
    axios
      .get(
        `${API_URL}/Standard/UserStandard/${users ? users.user[0].username : null}/${dateformat(
          value[0],
          'dd-mm-yy'
        )}/${dateformat(value[1], 'dd-mm-yy')}`
      )
      .then((Response) => {
        Setstandardlist(Response.data);
      });
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = standardlist.map((n) => n.service);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - standardlist.length) : 0;

  const filteredUsers = applySortFilter(standardlist, getComparator(order, orderBy), filterName);

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
            <Typography variant="h4" gutterBottom>
              ስታንዳርድ
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
                table="StandardList"
                filename="የባለሙያ ስታንታርድ"
                sheet="የባለሙያ ስታንታርድ"
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
                <Table id="StandardList" stickyheader="true" aria-label="sticky table">
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={standardlist.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { service } = row;
                        const isItemSelected = selected.indexOf(service) !== -1;

                        return (
                          <TableRow
                            style={{ backgroundColor: '#C7E4F9' }}
                            hover
                            key={service}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, service)}
                              />
                            </TableCell>
                            <TableCell align="left">{row.service}</TableCell>
                            <TableCell align="left">{row.measurement}</TableCell>
                            <TableCell align="left">{row.time}</TableCell>
                            <TableCell align="left">{row.belowStandard}</TableCell>
                            <TableCell align="left">{row.WithinStandard}</TableCell>
                            <TableCell align="left">{row.AboveStandard}</TableCell>
                            <TableCell align="left">{row.Standard}</TableCell>
                            <TableCell align="left">100</TableCell>
                            <TableCell align="left">{row.standardAmh}</TableCell>
                            <TableCell align="left">{row.Actual}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left" />
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
              rowsPerPageOptions={[5, 10, 100]}
              component="div"
              count={standardlist.length}
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
