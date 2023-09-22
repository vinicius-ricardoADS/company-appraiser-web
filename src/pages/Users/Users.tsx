import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import TableUsers from "../../components/Table/TablesUsers/TableUsers";

const Users = () => {
    return (
        <>
            <Header />
            <Container home={false}>
                <TableUsers />
            </Container>
            <Footer />
        </>
    );
};

export default Users;