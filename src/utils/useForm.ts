import { useState } from 'react';
import { FormProps } from '../types/form';

const useForm = () => {
    const [ form, setForm ] = useState<FormProps>({
        email: '',
        emailRegister: '',
        nameRegister: '',
        passwordRegister: '',
        password: '',
        cpfRegister: '',
        ckPassword: '',
        date_birth: '',
        selected: 'Relacionamento',
    });


    return { form, setForm };
};

export default useForm;