import Footer from "../../../components/Footer/Footer";
import FormRegisterCompany from "../../../components/Form/FormRegisterCompany/FormRegisterCompany";
import Header from "../../../components/Header/Header"

import classes from './Register.module.css';

const RegisterCompany = () => {
    return (
        <>
            <Header />
            <div className={classes.container}>
                <FormRegisterCompany />
            </div>
            <Footer />
        </>
    );
};

export default RegisterCompany;