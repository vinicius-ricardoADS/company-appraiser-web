import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Product } from "../../../types/Product";
import axios from "axios";
import Cookies from "js-cookie";

import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import classes from './Register.module.css';
import FormRegisterEvaluation from "../../../components/Form/FormRegisterEvaluation/FormRegisterEvaluation";

const RegisterEvaluation = () => {

    const { id } = useParams<{ id: string}>();

    const token = Cookies.get('token');

    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3333/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token!}`
                }
            }).then((res) => setProduct(res.data));
        }
    }, [token, id]);

    return (
        <>
            <Header />
            <div className={classes['card-detail']}>
                <div className={classes.card} style={{margin: '35px'}}>
                    <div className={classes['block-card-detail']}>
                        <img className={classes['img-card-detail']} src={product?.imageUrl} alt="" />
                        <div>
                            <h2 className={classes['title-card-detail']}>{product?.model}</h2>
                            <p className={classes['expand-detail']}>{product?.description}</p>
                        </div>
                    </div>
                </div>
                <FormRegisterEvaluation />
            </div>
            <Footer />
        </>
    );
};

export default RegisterEvaluation;