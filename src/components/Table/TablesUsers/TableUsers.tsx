import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import classes from './TableUsers.module.css';
import swal from '../../../lib/swal';
import { User } from '../../../types/User';

const TableUsers = () => {

    const [users, setUsers] = useState<User[]>([]);

    const token = Cookies.get('token');

    useEffect(() => {
        axios.get('http://localhost:3333/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setUsers(res.data));
    }, [token]);

    return (
        <>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Nome</th>
                        <th className={classes.th}>Email</th>
                        <th className={classes.th}>Papel</th>
                        <th className={classes.th}>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role?.toString() === 'ADMIN' ? 'Administrador' : 'Cliente'}</td>
                                <td>
                                    <Trash2
                                        color='red'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await axios.delete(`http://localhost:3333/users/${user.id}`, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            });
                                                
                                            swal.fire({
                                                title: 'Sucesso!',
                                                icon: 'success',
                                                text: 'Usuário removido',
                                                timer: 2000,
                                                showConfirmButton: false,
                                            });

                                            await axios.get('http://localhost:3333/users', {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            })
                                            .then((res) => setUsers(res.data));
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>
                                Nenhum item
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TableUsers;