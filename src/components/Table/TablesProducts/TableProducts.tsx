import { useState, useEffect } from 'react';
import { Product } from '../../../types/Product';
import Cookies from 'js-cookie';
import axios from 'axios';
import classes from './TableProducts.module.css';

const TableProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const token = Cookies.get('token');

    useEffect(() => {
        axios.get('http://localhost:3333/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setProducts(res.data));
    }, [products, token]);

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
                                <td>{product.company_name}</td>
                                <td>
                                    <button>Editar</button>
                                    <button>Remover</button>
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