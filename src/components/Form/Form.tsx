import classes from './Form.module.css';
import { CheckIcon } from 'lucide-react';

import React, {useState} from 'react';
import { FormErrorsProps, FormProps, SetFormProps } from '../../utils/form';
import FormRegister from './FormRegister/FormRegister';
import FormLogin from './FormLogin/FormLogin';

type PropsFormLoginOrRegister = {
    isRegister: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    form: FormProps;
    errors: FormErrorsProps;
    setForm: React.Dispatch<React.SetStateAction<SetFormProps>>
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormLoginOrRegister = (
    { isRegister, 
        onSubmit, 
        onChange, 
        form, 
        errors,
        setForm,
        setIsRegister,
        setRecoverPassword
    }: PropsFormLoginOrRegister) => {
    return (
        <>
            {isRegister ? (
                <FormRegister
                    onSubmit={onSubmit}
                    onChange={onChange}
                    classes={classes}
                    errors={errors}
                    form={form}
                    setForm={setForm}
                    setIsRegister={setIsRegister}
                />
            ) : (
                <FormLogin
                    onSubmit={onSubmit}
                    onChange={onChange}
                    classes={classes}
                    errors={errors}
                    setIsRegister={setIsRegister}
                    setRecoverPassword={setRecoverPassword}
                    form={form} 
                />
            )}
        </>
    )
}

const Form = () => {

    const [modal, setModal] = useState('none');

    const [recoverPassword, setRecoverPassword] = useState(false);

    const [form, setForm] = useState<FormProps>({
        email: '',
        emailRegister: '',
        nameRegister: '',
        passwordRegister: '',
        password: '',
        ckPassword: '',
        date_birth: '',
        profession: '',
        country: '',
        city: '',
        selected: 'Relacionamento'
    });

    const [isRegister, setIsRegister] = useState(false);

    const [errors, setErrors] = useState<FormErrorsProps>({
        invalidEmail: false,
        invalidEmailRegister: false,
        invalidFormatEmail: false,
        invalidPassword: false,
        invalidPasswordRegister: false,
        invalidDateRegister: false,
        invalidProfession: false,
        invalidCountry: false,
        invalidCity: false,
        invalidNameRegister: false,
        invalidRelationship: false,
    })

    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (type === 'text') {
            if (name === 'emailRegister') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidFormatEmail: false,
                    invalidEmailRegister: false,
                }));
            }

            if (name === 'email') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidFormatEmail: false,
                    invalidEmail: false,
                }));
            }
            
            if (name === 'profession') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidProfession: false,
                }));
            }
            
            if (name === 'country') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidCountry: false,
                }));
            }

            if (name === 'city') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidCity: false,
                }));
            }

            if (name === 'nameRegister') {
                setErrors((prevFormErros) => ({
                    ...prevFormErros,
                    invalidNameRegister: false,
                }));
            }
        }

        if (type === 'password') {
            setErrors((prevFormErros) => ({
                ...prevFormErros,
                invalidPassword: false,
                invalidPasswordRegister: false
            }))
        }

        if (type === 'date') {
            setErrors((prevFormErros) => ({
                ...prevFormErros,
                invalidDateRegister: false
            }))
        }

        if (form.selected !== 'Relacionamento') {
            setErrors((prevFormErros) => ({
                ...prevFormErros,
                invalidRelationship: false,
            }))
        }

        setForm((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));
    }

    const validateFormatEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(form.email)) {
            return true;
        } else {
            return false;
        }
    }

    const validateFormatEmailRegister = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(form.emailRegister)) {
            return true;
        } else {
            return false;
        }
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegister) {
            if (form.emailRegister.trim() === '' && form.passwordRegister.trim() === '' && form.date_birth.trim() === ''
            && form.profession.trim() === '' && form.country.trim() === '' && form.city.trim() === '' &&
                form.selected === 'Relacionamento' && form.nameRegister.trim() === '') {
                setErrors({
                    invalidEmail: false,
                    invalidEmailRegister: true,
                    invalidPassword: false,
                    invalidFormatEmail: false,
                    invalidPasswordRegister: true,
                    invalidDateRegister: true,
                    invalidProfession: true,
                    invalidCountry: true,
                    invalidCity: true,
                    invalidRelationship: true,
                    invalidNameRegister: true,
                });
                return;
            }

            if (validateFormatEmailRegister()) {
                setErrors((prevState) => ({
                    ...prevState,
                    invalidEmailRegister: true,
                }));
                return;
            }

            console.log(form);
        }
        
        if (form.email.trim() === '' && form.password.trim() === '') {
            setErrors((prevState) => ({
                ...prevState,
                invalidEmail: true,
                invalidPassowrd: true,
            }));
            return;
        }

        if (validateFormatEmail()) {
            setErrors((prevState) => ({
                ...prevState,
                invalidFormatEmail: true,
            }));
            return;
        }

        console.log(form);
    }

    return (
        <>
            <div id="myModal" className={classes.modal} style={{ display: modal }}>
                <div className={classes['modal-content']}>
                    <span onClick={() => setModal('none')} className={classes.close} id="closeModalBtn">&times;</span>
                    <div className={classes['flex-modal']}>
                        <div className={classes.check}>
                            <CheckIcon color='white' />
                        </div>
                        <p className={classes['check-message']} style={{ color: '#ED6D25'}}>Cadastrado com sucesso</p>
                    </div>
                </div>
            </div>
            {recoverPassword ? (
                <div className={classes['container-form']}>
                    <div className={classes['brand-form']}>
                            <h3 className={classes.title}>Recupere sua senha</h3>
                    </div>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <div className={classes['input-container']}>
                                <div className={classes['label-float']}>
                                    <input onChange={handleChange} name='email'
                                        value={form.email} className={errors.invalidEmail ? classes['invalid-input'] : classes.input} 
                                        type="text" placeholder="E-mail cadastrado"/>
                                </div>
                                {errors.invalidEmail &&
                                    <p className={classes.errors}>Campo de email não pode estar vazio</p>
                                }
                                {errors.invalidFormatEmail &&
                                    <p className={classes.errors}>Campo de email não é válido</p>
                                }
                            </div>
                            <div className={classes['flex-button']}>
                                <button className={classes['btn-signin']}>
                                    <span className={classes['signin-description']}>
                                        Enviar código
                                    </span> 
                                </button>
                                <a className={classes['anchor-password']} href='#'>Lembrou sua senha ?</a>
                                <button className={classes['btn-signup']} onClick={() => setRecoverPassword(false)}>
                                    <span className={classes['signup-description']}>
                                        Entrar com suas credênciais
                                    </span>
                                </button>
                            </div>
                    </form>
                </div>
            ): (
                <FormLoginOrRegister 
                    isRegister={isRegister}
                    errors={errors}
                    form={form}
                    onChange={handleChange}
                    onSubmit={submitHandler}
                    setForm={setForm}
                    setIsRegister={setIsRegister}
                    setRecoverPassword={setRecoverPassword}
                     
                />
            )}
            
        </>
    )
};

export default Form;