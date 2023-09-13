import { FormErrorsProps, FormProps, SetFormProps } from "../../../utils/form";

type FormRegisterProps = {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    form: FormProps;
    classes: CSSModuleClasses;
    errors: FormErrorsProps;
    setForm: React.Dispatch<React.SetStateAction<SetFormProps>>
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormRegister = ({
    onSubmit,
    onChange,
    form,
    classes,
    errors,
    setForm,
    setIsRegister,
} : FormRegisterProps) => {
    return (
        <>
            <div className={classes['container-form']}>
                <div className={classes['brand-form']}>
                    <h3 className={classes.title}>Cadastre-se no Avaliador</h3>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <div className={classes['input-container']}>
                        <div className={classes['label-float']}>
                            <input onChange={onChange} name='emailRegister'
                                value={form.emailRegister} className={errors.invalidEmailRegister ? classes['invalid-input'] : classes['input-register']} 
                                type="text" placeholder="E-mail"/>
                        </div>
                    </div>
                    <div className={classes['input-container']}>
                        <div className={classes['label-float']}>
                            <input onChange={onChange} name='passwordRegister' 
                                value={form.passwordRegister} className={errors.invalidPasswordRegister ? classes['invalid-input'] : classes['input-register']}
                                type="password" placeholder="Senha"/>
                        </div>
                    </div>
                    <div className={classes['input-container-flex']}>
                        <div>
                            <div className={classes['label-float']}>
                                <input onChange={onChange} name='date_birth' 
                                    value={form.date_birth} className={errors.invalidDateRegister ? classes['invalid-input-flex'] : classes['input-flex']}
                                    type="date" placeholder="Nascimento"/>
                            </div>
                        </div>
                        <div>
                            <div className={classes['label-float']}>
                                <input onChange={onChange} name='profession' 
                                    value={form.profession} className={errors.invalidProfession ? classes['invalid-input-flex'] : classes['input-flex']}
                                    type="text" placeholder="Profissão"/>
                            </div>
                        </div>
                    </div>
                    <div className={classes['input-container-flex']}>
                        <div>
                            <div className={classes['label-float']}>
                                <input onChange={onChange} name='country' 
                                    value={form.country} className={errors.invalidCountry ? classes['invalid-input-flex'] : classes['input-flex']}
                                    type="text" placeholder="País"/>
                            </div>
                        </div>
                        <div>
                            <div className={classes['label-float']}>
                                <input onChange={onChange} name='city' 
                                    value={form.city} className={errors.invalidCity ? classes['invalid-input-flex'] : classes['input-flex']}
                                    type="text" placeholder="Cidade"/>
                            </div>
                        </div>
                    </div>
                    <div className={classes['input-container-flex']}>
                        <div>
                            <div className={classes['label-float']}>
                                <input onChange={onChange} name='nameRegister' 
                                    value={form.nameRegister} className={errors.invalidNameRegister ? classes['invalid-input-flex'] : classes['input-flex']}
                                    type="text" placeholder="Nome"/>
                            </div>
                        </div>
                        <select className={errors.invalidRelationship ? classes['invalid-input-select'] : classes['input-select']} value={form.selected} onChange={e => setForm((prevState) => ({
                                ...prevState,
                                selected: e.target.value
                            }))} name="relationship">
                            <option value="Relacionamento">Relacionamento</option>
                            <option value="Solteiro">Solteiro</option>
                            <option value="Casado">Casado</option>
                            <option value="Viúvo">Viúvo</option>
                        </select>
                    </div>
                    <div className={classes['flex-button-register']}>
                        <button className={classes['btn-signup']}>
                            <span className={classes['signup-description']}>
                                Criar uma conta
                            </span>
                        </button>
                    </div>
                    <div className={classes['flex-button-register']}>
                        <button className={classes['btn-signin-register']} onClick={() => setIsRegister(false)}>
                            <span className={classes['signin-description']}>
                                Entrar na conta
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormRegister;