import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import Cookies from 'js-cookie';
import axios from 'axios';

import classes from './CardProducts.module.css';

const CardProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const token = Cookies.get('token');

    useEffect(() => {
        axios.get('http://localhost:3333/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setProducts(res.data));
    }, [token]);

    console.log(products);

    return (
        <> 
            <div className={classes.product}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} >
                            <a className="anchorPost">
                                <div className={classes.card} style={{margin: '35px'}}>
                                    <div className={classes['block-card']}>
                                        <img className={classes['img-card']} src={product.imageUrl} alt="" />
                                        <div>
                                            <h2 className={classes['title-card']}>{product.model}</h2>
                                            <p className={classes['expand']}>{product.description}</p>
                                            <button className={classes['expand-button']}>Avaliar</button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    products.map((product) => (
                        <div key={product.id} style={{margin: '35px'}}>
                            <a className="anchorPost">
                                <div className={classes.card}>
                                    <div className={classes['block-card']}>
                                        <img className={classes['img-card']} src={product.imageUrl} alt="" />
                                        <div>
                                            <h2 className={classes['title-card']}>{product.model}</h2>
                                            <p className={classes['expand']}>{product.description}</p>
                                            <button className={classes['expand-button']}>Expand...</button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))
                )}
            </div>
        </>
    )
};

export default CardProducts;