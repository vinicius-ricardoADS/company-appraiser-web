import { useState } from 'react';
import { FormProps } from './form';

const useForm = () => {
    const [ form, setForm ] = useState<FormProps>({
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


    return form;
};

export default useForm;