import Footer from "../../../components/Footer/Footer";
import FormRegisterProduct from "../../../components/Form/FormRegisterProduct/FormRegisterProducts";
import Header from "../../../components/Header/Header";

import classes from './Register.module.css';

const RegisterProduct = () => {
    return (
        <>
            <Header />
            <div className={classes.container}>
                <h3>Produto</h3>
                <FormRegisterProduct />
            </div>
            <Footer />
        </>
    )
};

export default RegisterProduct