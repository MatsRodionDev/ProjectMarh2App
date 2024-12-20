import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import userApi from '../../services/userApi';
import { Table, Pagination, Spinner, Row, Col, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const response = await userApi.getAllUsers(currentPage, pageSize);
            console.log(response)
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
            toast.success('User role updated successfully!'); // Use toast for success
        } catch (error) {
            console.error('Failed to update role', error);
            toast.error('Failed to update user role.'); // Use toast for error
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'First Name', accessor: 'firstName' },
            { Header: 'Last Name', accessor: 'lastName' },
            { Header: 'Email', accessor: 'email' },
            { 
                Header: 'Role', 
                accessor: 'Role.name', 
                Cell: ({ row }) => {
                    const isAdmin = row.original.Role.name === 'Admin';
                    return (
                        <Form.Select
                            defaultValue={row.original.Role.name}
                            onChange={(e) => updateUserRole(row.original.id, e.target.value)}
                            disabled={isAdmin}
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </Form.Select>
                    );
                }
            },
        ],
        [roles]
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
                <Col className="text-center">
                    <h2>User Management</h2>
                </Col>
            </Row>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <Table striped bordered hover {...getTableProps()}>
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
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Pagination>
                                <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
                                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0} />
                                {Array.from({ length: Math.ceil(totalUsers / pageSize) }, (_, index) => (
                                    <Pagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalUsers / pageSize) - 1))} disabled={currentPage === Math.ceil(totalUsers / pageSize) - 1} />
                                <Pagination.Last onClick={() => setCurrentPage(Math.ceil(totalUsers / pageSize) - 1)} disabled={currentPage === Math.ceil(totalUsers / pageSize) - 1} />
                            </Pagination>
                        </Col>
                    </Row>
                </>
            )}
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
        </div>
    );
};

export default UserTable;