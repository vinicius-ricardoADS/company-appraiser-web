import { useState, useEffect } from 'react';
import { FormErrorsProductsProps, FormPropsProduct } from '../../../types/form';
import { Company } from '../../../types/Company';
import axios from 'axios';
import Cookies from 'js-cookie';

import classes from './FormRegisterProduct.module.css';
import { Product } from '../../../types/Product';
import swal from '../../../lib/swal';
import { useNavigate } from 'react-router-dom';


const FormRegisterProduct = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState<FormPropsProduct>({
        model: '',
        description: '',
        discount_value: '',
        company_id: '',
    });

    const [image, setImge] = useState<File | undefined>(undefined);

    const [companys, setCompanys] = useState<Company[]>([]);

    const token = Cookies.get('token');

    const [errors, setErrors] = useState<FormErrorsProductsProps>({
        invalidModel: false,
        invalidDescription: false,
        invalidDiscountValue: false,
        invalidCompany: false,
        invalidImage: false,
    });

    const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
        setImge(selectedImage);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (type === 'text') {
            if (name === 'model') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidModel: false,
                }));
            }

            if (name === 'description') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidDescription: false,
                }));
            }
            
            if (name === 'discount_value') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidDiscountValue: false,
                }));
            }
        }

        if (form.company_id !== '') {
            setErrors((prevFormErros) => ({
                ...prevFormErros,
                invalidCompany: false,
            }))
        }

        setForm((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.model.trim() !== "" && form.description.trim() !== "" && form.discount_value.trim() !== ""
        && form.company_id.trim() !== "") {

            if (!image) {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidImage: false,
                }));
            }
            const formData = new FormData();
            formData.append('image', image!);

            const body: Product = {
                model: form.model,
                description: form.description,
                discount_value: +form.discount_value,
                company_id: form.company_id,
            }

            const response = await axios.post('http://localhost:3333/products', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                const responseImage = await axios.post('http://localhost:3333/upload', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (responseImage.status === 200) {
                    swal.fire({
                        title: 'Sucesso!',
                        icon: 'success',
                        text: 'Produto cadastrado',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    navigate('/products');
                }
            }

        } else {
            console.log('Erros ', form);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3333/company', {
            headers: {
                Authorization: `Bearer ${token!}`
            }
        }).then((res) => setCompanys(res.data));
    }, [token]);


    return (
        <div className={classes.flex}>
            <div className={classes.h2}>
                <h2>Produto</h2>
            </div>
            <form onSubmit={onSubmit} className={classes.form}>
                <div className={classes!['input-container']}>
                    <div className={classes!['label-float']}>
                        <input onChange={onChange} name='model'
                            value={form.model} className={errors.invalidModel ? classes!['invalid-input'] : classes!['input-register']} 
                            type="text" placeholder="Modelo"/>
                    </div>
                </div>
                <div className={classes!['input-container']}>
                    <div className={classes!['label-float']}>
                        <input onChange={onChange} name='description'
                            value={form.description} className={errors.invalidDescription ? classes!['invalid-input'] : classes!['input-register']} 
                            type="text" placeholder="Descrição"/>
                    </div>
                </div>
                <div className={classes!['input-container']}>
                    <div className={classes!['label-float']}>
                        <input onChange={onChange} name='discount_value'
                            value={form.discount_value} className={errors.invalidDiscountValue ? classes!['invalid-input'] : classes!['input-register']} 
                            type="number" placeholder="Valor de desconto"/>
                    </div>
                </div>
                <div className={classes!['input-container']}>
                    <select
                        className={classes.select}
                        value={form.company_id}
                        onChange={e => setForm((prevState) => ({
                            ...prevState, 
                            company_id: e.target.value,
                        }))}
                        name='company_id'
                    >
                        <option value="">Selecione uma opção</option>
                        {companys.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input onChange={onChangeImage} name='imageUrl' className={classes.file} type='file' />
                </div>
                <button className={classes['btn-save']}>
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default FormRegisterProduct;