import { FormErrorsProps, FormProps } from "../../../utils/form";

type FormLoginProps = {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    form: FormProps;
    classes: CSSModuleClasses;
    errors: FormErrorsProps;
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setRecoverPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormLogin = ({
    onSubmit,
    onChange,
    form,
    classes,
    errors,
    setIsRegister,
    setRecoverPassword
} : FormLoginProps) => {
    return (
        <>
            <div className={classes['container-form']}>
                <div className={classes['brand-form']}>
                    <h3 className={classes.title}>Acesse o Avaliador</h3>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <div className={classes['input-container']}>
                        <div className={classes['label-float']}>
                            <input onChange={onChange} name='email'
                                value={form.email} className={errors.invalidEmail ? classes['invalid-input'] : classes.input} 
                                type="text" placeholder="E-mail"/>
                        </div>
                        {errors.invalidEmail &&
                            <p className={classes.errors}>Campo de email não pode estar vazio</p>
                        }
                        {errors.invalidFormatEmail &&
                            <p className={classes.errors}>Campo de email não é válido</p>
                        }
                    </div>
                    <div className={classes['input-container']}>
                        <div className={classes['label-float']}>
                            <input onChange={onChange} name='password' 
                                value={form.password} className={errors.invalidPassword ? classes['invalid-input'] : classes.input}
                                type="password" placeholder="Senha"/>
                        </div>
                        {errors.invalidPassword &&
                            <p className={classes.errors}>Campo de senha não pode estar vazio</p>
                        }
                    </div>
                    <div className={classes['password-flex']}>
                        <label htmlFor="ckbox" className={classes.checkbox}>
                            Lembrar minha senha
                            <input onChange={onChange} type="checkbox" name="ckPassword" 
                                id="ckbox" value={form.ckPassword} />
                            <span className={classes.checkmarkPassword}></span>
                        </label>
                    </div>
                    <div className={classes['flex-button']}>
                        <button className={classes['btn-signin']}>
                            <span className={classes['signin-description']}>
                                Entrar na conta
                            </span>
                        </button>
                        <button className={classes['btn-signup']} onClick={() => setIsRegister(true)}>
                            <span className={classes['signup-description']}>
                                Criar uma conta
                            </span>
                        </button>
                        <a onClick={(event) => {
                            event.preventDefault(); setRecoverPassword(true)
                        }} className={classes['anchor-password']} href='/'>Esqueci minha senha</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormLogin;