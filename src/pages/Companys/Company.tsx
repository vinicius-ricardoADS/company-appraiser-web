import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import TableCompanys from "../../components/Table/TablesCompanys/TableCompany";

import classes from './Companys.module.css';

const Company = () => {
    return (
        <>
            <Header />
            <Container home={false}>
                <div style={{marginBottom: '50px', marginLeft: '600px'}}>
                    <a className={classes['link-register-company']} href="/companys/register">
                        <button className={classes['btn-add-company']}>
                            Adicionar produto
                        </button>
                    </a>
                </div>
                <TableCompanys />
            </Container>
            <Footer />
        </>
    );
};

export default Company;