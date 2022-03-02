import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
  ListItemText
} from '@mui/material';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/allRequest';
import Officeform from '../components/authentication/office/Officeform';
import { API_URL } from './Constant1';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'officename', label: 'የፅ/ቤቱ ስም', alignRight: false },
  { id: 'floor_no', label: 'ቢሮ ቁጥር', alignRight: false },
  { id: 'phone', label: 'ስልክ ቁጥር', alignRight: false },
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
export default function Office() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('office_name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [officelist, setofficelist] = useState([]);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteoffice = (officeid) => {
    axios.delete(`${API_URL}/DeleteOffice/${officeid}`).then((response) => {
      alert('Deleted Successfully');
    });
  };
  useEffect(() => {
    axios.get(`${API_URL}/GetOffice`).then((Response) => {
      setofficelist(Response.data);
    });
  });
  const office = [...Array(24)].map((_, index) => ({
    office_id: officelist.office_id,
    office_name: officelist.office_name,
    floor_noo: officelist.floor_no,
    phone: officelist.phone
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = officelist.map((n) => n.office_name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - officelist.length) : 0;

  const filteredUsers = applySortFilter(officelist, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Office">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            ፅ/ቤት
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addoffice"
            startIcon={<Icon icon={plusFill} />}
          >
            ፅ/ቤት
          </Button>
          <ReactHTMLTableToExcel
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            table="office"
            filename="ፅ/ቤት"
            sheet="ፅ/ቤት"
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
              <Table id="office">
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={officelist.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { officename } = row;
                      const isItemSelected = selected.indexOf(officename) !== -1;

                      return (
                        <TableRow
                          hover
                          key={officename}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, officename)}
                            />
                          </TableCell>
                          <TableCell align="left">{row.office_name}</TableCell>
                          <TableCell align="left">{row.floor_no}</TableCell>
                          <TableCell align="left">{row.phone}</TableCell>

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
                                onClick={() => deleteoffice(row.office_id)}
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
            count={officelist.length}
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
