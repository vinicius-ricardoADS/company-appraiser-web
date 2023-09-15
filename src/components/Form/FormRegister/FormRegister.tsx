import { PropsFormLoginOrRegister } from "../../../types/form";

const FormRegister = ({
    onSubmit,
    onChange,
    form,
    classes,
    errors,
    setIsRegister,
} : PropsFormLoginOrRegister) => {
    return (
        <>
            <div className={classes!['container-form']}>
                <div className={classes!['brand-form']}>
                    <h3 className={classes!.title}>Cadastre-se no Avaliador</h3>
                </div>
                <form className={classes!.form} onSubmit={onSubmit}>
                    <div className={classes!['input-container']}>
                        <div className={classes!['label-float']}>
                            <input onChange={onChange} name='emailRegister'
                                value={form.emailRegister} className={errors.invalidEmailRegister ? classes!['invalid-input'] : classes!['input-register']} 
                                type="text" placeholder="E-mail"/>
                        </div>
                    </div>
                    <div className={classes!['input-container']}>
                        <div className={classes!['label-float']}>
                            <input onChange={onChange} name='passwordRegister' 
                                value={form.passwordRegister} className={errors.invalidPasswordRegister ? classes!['invalid-input'] : classes!['input-register']}
                                type="password" placeholder="Senha"/>
                        </div>
                    </div>
                    <div className={classes!['input-container-flex']}>
                        <div>
                            <div className={classes!['label-float']}>
                                <input onChange={onChange} name='date_birth' 
                                    value={form.date_birth} className={errors.invalidDateRegister ? classes!['invalid-input-flex'] : classes!['input-flex']}
                                    type="date" placeholder="Nascimento"/>
                            </div>
                        </div>
                        <div>
                            <div className={classes!['label-float']}>
                                <input onChange={onChange} name='cpfRegister' 
                                    value={form.cpfRegister} className={errors.invalidCpfRegister ? classes!['invalid-input-flex'] : classes!['input-flex']}
                                    type="text" placeholder="CPF"/>
                            </div>
                        </div>
                    </div>
                    <div className={classes!['input-container']}>
                        <div className={classes!['label-float']}>
                            <input onChange={onChange} name='nameRegister' 
                                value={form.nameRegister} className={errors.invalidNameRegister ? classes!['invalid-input'] : classes!['input-register']}
                                type="text" placeholder="Nome Completo"/>
                        </div>
                    </div>
                    <div className={classes!['flex-button-register']}>
                        <button className={classes!['btn-signup']}>
                            <span className={classes!['signup-description']}>
                                Criar uma conta
                            </span>
                        </button>
                    </div>
                    <div className={classes!['flex-button-register']}>
                        <button className={classes!['btn-signin-register']} onClick={() => setIsRegister(false)}>
                            <span className={classes!['signin-description']}>
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