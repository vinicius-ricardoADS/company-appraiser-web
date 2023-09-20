import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TableProducts from "../../components/Table/TablesProducts/TableProducts";

import classes from './Products.module.css';

const Products = () => {
    return (
        <>
            <Header />
            <Container home={false}>
                <div style={{marginBottom: '50px', marginLeft: '600px'}}>
                    <a className={classes['link-register-product']} href="/products/register">
                        <button className={classes['btn-add-product']}>
                            Adicionar produto
                        </button>
                    </a>
                </div>
                <TableProducts />
            </Container>
            <Footer />
        </>
    )
};

export default Products;