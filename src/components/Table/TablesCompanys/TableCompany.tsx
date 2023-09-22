import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Trash2, PlusSquare, Pencil } from 'lucide-react';
import axios from 'axios';
import classes from './TableCompany.module.css';
import swal from '../../../lib/swal';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../types/Company';

const TableCompanys = () => {

    const [companys, setCompanys] = useState<Company[]>([]);

    const navigate = useNavigate();

    const token = Cookies.get('token');

    useEffect(() => {
        axios.get('http://localhost:3333/company', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setCompanys(res.data));
    }, [token]);

    return (
        <>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Modelo</th>
                        <th className={classes.th}>Empresa</th>
                        <th className={classes.th} colSpan={3}>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {companys.length > 0 ? (
                        companys.map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.segment}</td>
                                <td>
                                    <Pencil
                                        color='blue'
                                        onClick={() => {
                                            navigate(`/companys/register/${company.id}`)
                                        }} 
                                    />
                                </td>
                                <td>
                                    <Trash2
                                        color='red'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (company.products!.length > 0) {
                                                swal.fire({
                                                    title: 'Erro!',
                                                    icon: 'warning',
                                                    text: 'Empresa possui produtos',
                                                    timer: 3000,
                                                    showConfirmButton: false,
                                                });
                                            } else {
                                                await axios.delete(`http://localhost:3333/company/${company.id}`, {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                });
                                                
                                                swal.fire({
                                                    title: 'Sucesso!',
                                                    icon: 'success',
                                                    text: 'Empresa removida',
                                                    timer: 2000,
                                                    showConfirmButton: false,
                                                });

                                                await axios.get('http://localhost:3333/company', {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                })
                                                .then((res) => setCompanys(res.data));
                                            }
                                        }}
                                    />
                                </td>
                                <td>
                                    <PlusSquare
                                        color='blue'
                                        onClick={() => {
                                            navigate(`/companys/details/${company.id}`)
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

export default TableCompanys;