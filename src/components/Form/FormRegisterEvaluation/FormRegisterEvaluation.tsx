import { useState } from 'react';
import { FormPropsErrorsEvaluation, FormPropsEvaluation } from '../../../types/form';
import axios from 'axios';
import Cookies from 'js-cookie';

import classes from './FormRegisterEvaluation.module.css';
import swal from '../../../lib/swal';
import { useParams } from 'react-router-dom';
import { Evaluation } from '../../../types/Evaluation';


const FormRegisterEvaluation = () => {

    const { id } = useParams<{ id: string}>();

    const [urlCoupon, setCoupon] = useState('');

    const [form, setForm] = useState<FormPropsEvaluation>({
        score: '',
        preferences: '',
        would_buy: '',
        product_id: id!
    });

    const token = Cookies.get('token');

    const [errors, setErrors] = useState<FormPropsErrorsEvaluation>({
        invalidScore: false,
        invalidPreferences: false,
        invalidWouldBuy: false,
        invalidProduct: false,
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (type === 'text') {

            if (name === 'preferences') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidPreferences: false,
                }));
            }

            if (name === 'score') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidScore: false,
                }));
            }

            if (name === 'would_buy') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidWouldBuy: false,
                }));
            }
        }

        setForm((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.would_buy.trim() !== '' && form.preferences.trim() !== "" && form.score.trim() !== "") {

            const body: Evaluation = {
                score: +form.score,
                preferences: form.preferences,
                would_buy: +form.would_buy,
                product_id: form.product_id
            }

            const response = await axios.post('http://localhost:3333/evaluations', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                setCoupon(response.data);

                swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    html: <h3>Link para dowload do cupom de desconto <a href={urlCoupon}>Clique aqui</a></h3>,
                    showConfirmButton: true,
                });
            }
        } else {
            swal.fire({
                title: 'Erro!',
                icon: 'warning',
                text: 'Erro ao enviar avaliação',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }

    return (
        <>
            {urlCoupon ? (
                <h3>Link para dowload do cupom de desconto <a href={urlCoupon}>Clique aqui</a></h3>
            ) : (
                null
            )}
            <div className={classes.flex}>
                <div className={classes.h2}>
                    <h2>Avaliação</h2>
                </div>
                <form onSubmit={onSubmit} className={classes.form}>
                    <div className={classes!['input-container']}>
                        <div className={classes!['label-float']}>
                            <input onChange={onChange} name='score'
                                defaultValue={form.score} min='0' max='10' className={errors.invalidScore ? classes!['invalid-input'] : classes!['input-register']} 
                                type="number" placeholder="Pontuação"/>
                        </div>
                    </div>
                    <div className={classes!['input-container']}>
                        <div className={classes!['label-float']}>
                            <input onChange={onChange} name='preferences'
                                defaultValue={form.preferences} className={errors.invalidPreferences ? classes!['invalid-input'] : classes!['input-register']} 
                                type="text" placeholder="Preferências"/>
                        </div>
                    </div>
                    <div className={classes!['input-container']}>
                        <div className={classes!['label-float']}>
                            <input onChange={onChange} name='would_buy'
                                defaultValue={form.would_buy} className={errors.invalidWouldBuy ? classes!['invalid-input'] : classes!['input-register']} 
                                type="number" placeholder="Quanto pagaria"/>
                        </div>
                    </div>
                    <button className={classes['btn-save']}>
                        Enviar
                    </button>
                </form>
            </div>
        </>
        
    );
};

export default FormRegisterEvaluation;