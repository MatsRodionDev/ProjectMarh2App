import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import userApi from '../../services/userApi';
import { Table, Spinner, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRow from './components/UserRow';
import PaginationComponent from './components/PaginationComponent';
import './styles/UserTable.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [roles, setRoles] = useState([]);
    const pageSize = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const response = await userApi.getAllUsers(currentPage, pageSize);
            setUsers(response.users);
            setTotalUsers(response.total);
            setLoading(false);
        };

        const fetchRoles = async () => {
            const roleResponse = await userApi.getRoles();
            setRoles(roleResponse);
        };

        fetchUsers();
        fetchRoles();
    }, [currentPage]);

    const updateUserRole = async (userId, newRole) => {
        try {
            await userApi.updateUserRole(userId, newRole);
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, Role: { ...user.Role, name: newRole } } : user
                )
            );
            toast.success('User role updated successfully!');
        } catch (error) {
            console.error('Failed to update role', error);
            toast.error('Failed to update user role.');
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'First Name', accessor: 'firstName' },
            { Header: 'Last Name', accessor: 'lastName' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Role', accessor: 'Role.name' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = useTable(
        {
            columns,
            data: users,
            manualPagination: true,
            pageCount: Math.ceil(totalUsers / pageSize),
        },
        usePagination
    );

    return (
        <div className="container mt-4">
            <Row className="mb-3">
                <Col>
                    <h2 className="user-table-title">User Management</h2>
                </Col>
            </Row>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <Table striped bordered hover responsive {...getTableProps()} className="user-table">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return <UserRow key={row.id} row={row} roles={roles} updateUserRole={updateUserRole} />;
                            })}
                        </tbody>
                    </Table>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalUsers={totalUsers}
                        pageSize={pageSize}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default UserTable;
