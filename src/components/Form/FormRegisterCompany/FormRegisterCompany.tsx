import { useState, useEffect } from 'react';
import { FormErrorsCompanyProps, FormPropsCompany } from '../../../types/form';
import axios from 'axios';
import Cookies from 'js-cookie';

import classes from './FormRegisterCompany.module.css';
import swal from '../../../lib/swal';
import { useNavigate, useParams } from 'react-router-dom';
import { Company } from '../../../types/Company';


const FormRegisterCompany = () => {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string}>();

    const isEditing = !!id;

    const [form, setForm] = useState<FormPropsCompany>({
        name: '',
        segment: '',
    });

    const [company, setCompany] = useState<Company>();

    const token = Cookies.get('token');

    const [errors, setErrors] = useState<FormErrorsCompanyProps>({
        invalidName: false,
        invalidSegment: false,
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (type === 'text') {
            if (name === 'name') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidName: false,
                }));
            }

            if (name === 'segment') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidSegment: false,
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

        if (id) {

            const body: Company = {
                name: form.name === '' ? company?.name : form.name,
                segment: form.segment === '' ? company?.segment : form.segment,
            }

            const response = await axios.put(`http://localhost:3333/company/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Empresa editada',
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate('/companys')
            } else {
                swal.fire({
                    title: 'Erro!',
                    icon: 'warning',
                    text: 'Erro ao editar empresa',
                    timer: 2000,
                    showConfirmButton: false,
                });
                console.log(response);
            }
        } else {
            if (form.name.trim() !== "" && form.segment.trim() !== "") {

                const body: Company = {
                    name: form.name,
                    segment: form.segment,
                }
    
                const response = await axios.post('http://localhost:3333/company', body, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
                if (response.status === 200) {
                    swal.fire({
                        title: 'Sucesso!',
                        icon: 'success',
                        text: 'Empresa cadastrada',
                        timer: 2000,
                        showConfirmButton: false,
                    });
    
                    navigate('/companys');
                }
            } else {
                swal.fire({
                    title: 'Erro!',
                    icon: 'warning',
                    text: 'Erro ao cadastrar',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
    }

    useEffect(() => {

        if (id) {
            axios.get(`http://localhost:3333/company/${id}`, {
                headers: {
                    Authorization: `Bearer ${token!}`
                }
            }).then((res) => setCompany(res.data));
        }
    }, [token, id]);


    return (
        <div className={classes.flex}>
            <div className={classes.h2}>
                <h2>Empresa</h2>
            </div>
            <form onSubmit={onSubmit} className={classes.form}>
                <div className={classes!['input-container']}>
                    <div className={classes!['label-float']}>
                        <input onChange={onChange} name='name'
                            disabled={window.location.pathname === `/companys/details/${id}`}
                            defaultValue={isEditing ? company?.name : form.name} className={errors.invalidName ? classes!['invalid-input'] : classes!['input-register']} 
                            type="text" placeholder="Nome"/>
                    </div>
                </div>
                <div className={classes!['input-container']}>
                    <div className={classes!['label-float']}>
                        <input onChange={onChange} name='segment'
                            disabled={window.location.pathname === `/companys/details/${id}`}
                            defaultValue={isEditing ? company?.segment : form.segment} className={errors.invalidSegment ? classes!['invalid-input'] : classes!['input-register']} 
                            type="text" placeholder="Segmento"/>
                    </div>
                </div>
                {isEditing ? (
                    <button disabled={window.location.pathname === `/companys/details/${id}`} className={classes['btn-save']}>
                        Editar
                    </button>
                ) : (
                    <button className={classes['btn-save']}>
                        Enviar
                    </button>
                )}
            </form>
        </div>
    );
};

export default FormRegisterCompany;