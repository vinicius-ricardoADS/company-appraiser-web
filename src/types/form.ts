export interface FormProps {
    email: string;
    emailRegister: string;
    nameRegister: string;
    passwordRegister: string;
    password: string;
    ckPassword: string;
    date_birth: string;
    cpfRegister: string;
    selected: string;
}

export interface FormPropsProduct {
    model: string;
    description: string;
    discount_value: string;
    company_id: string;
}

export interface FormErrorsProps {
    invalidEmail: boolean;
    invalidEmailRegister: boolean;
    invalidFormatEmail: boolean;
    invalidPassword: boolean;
    invalidPasswordRegister: boolean;
    invalidDateRegister: boolean;
    invalidCpfRegister: boolean;
    invalidNameRegister: boolean;
    invalidRelationship: boolean;
}

export interface FormErrorsProductsProps {
    invalidModel: boolean;
    invalidDescription: boolean;
    invalidDiscountValue: boolean;
    invalidCompany: boolean;
    invalidImage: boolean;
}

export interface SetFormProps {
    email: string;
    emailRegister: string;
    nameRegister: string;
    passwordRegister: string;
    password: string;
    ckPassword: string;
    date_birth: string;
    cpfRegister: string;
    selected: string;
}

export interface PropsFormLoginOrRegister {
    isRegister: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    form: FormProps;
    errors: FormErrorsProps;
    classes?: CSSModuleClasses;
    setForm: React.Dispatch<React.SetStateAction<SetFormProps>>
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
}