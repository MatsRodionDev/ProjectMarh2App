import React from 'react';
import UserRoleSelect from './UserRoleSelect';

const UserRow = ({ row, roles, updateUserRole }) => {
    return (
        <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
                if (cell.column.id === 'Role.name') {
                    return (
                        <td {...cell.getCellProps()}>
                            <UserRoleSelect
                                user={row.original}
                                roles={roles}
                                updateUserRole={updateUserRole}
                            />
                        </td>
                    );
                }
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
            })}
        </tr>
    );
};

export default UserRow;
