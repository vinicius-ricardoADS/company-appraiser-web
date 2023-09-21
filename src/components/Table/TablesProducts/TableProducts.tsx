import { useState, useEffect } from 'react';
import { Product } from '../../../types/Product';
import Cookies from 'js-cookie';
import { Trash2, PlusSquare } from 'lucide-react';
import axios from 'axios';
import classes from './TableProducts.module.css';
import swal from '../../../lib/swal';
import { useNavigate } from 'react-router-dom';

const TableProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const navigate = useNavigate();

    const token = Cookies.get('token');

    useEffect(() => {
        axios.get('http://localhost:3333/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setProducts(res.data));
    }, [token]);

    return (
        <>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Modelo</th>
                        <th className={classes.th}>Empresa</th>
                        <th className={classes.th} colSpan={2}>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.model}</td>
                                <td>{product.company}</td>
                                <td>
                                    <Trash2
                                        color='red'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await axios.delete(`http://localhost:3333/products/${product.id}`, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            });
                                            swal.fire({
                                                title: 'Sucesso!',
                                                icon: 'success',
                                                text: 'Produto removido',
                                                timer: 2000,
                                                showConfirmButton: false,
                                            });
                                            await axios.get('http://localhost:3333/products', {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            })
                                            .then((res) => setProducts(res.data));
                                        }}
                                    />
                                </td>
                                <td>
                                    <PlusSquare
                                        color='blue'
                                        onClick={() => {
                                            navigate(`/products/details/${product.id}`)
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

export default TableProducts;