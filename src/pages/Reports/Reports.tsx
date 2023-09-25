import { useState, useEffect } from 'react';

import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"

import classes from './Reports.module.css';
import { Company } from '../../types/Company';
import axios from 'axios';
import Cookies from 'js-cookie';

type BodyReport = {
    company_id: string;
}

const Reports = () => {

    const [companys, setCompanys] = useState<Company[]>([]);

    const [reportUrl, setReportUrl] = useState('');

    const token = Cookies.get('token');

    const [form, setForm] = useState({
        company_id: '',
    });

    const generateReport = () => {
        if (form.company_id.trim() !== '') {
            const body: BodyReport = { company_id: form.company_id };

            axios.post('http://localhost:3333/reports', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => setReportUrl(res.data));
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3333/company', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setCompanys(res.data));
    }, [token]);

    return (
        <>
            <Header />
            <Container home={false}>
                <div className={classes.flex}>
                    <div className={classes!['input-container']}>
                        <select
                            className={classes.select}
                            value={form.company_id}
                            onChange={e => setForm((prevState) => ({
                                ...prevState, 
                                company_id: e.target.value,
                            }))}
                            name='company_id'
                        >
                            <option value="">Selecione uma opção</option>
                            {companys.map(company => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{marginBottom: '25px', marginLeft: '50px'}}>
                        <button onClick={generateReport} className={classes['btn-report']}>
                            Gerar relatório
                        </button>
                    </div>
                </div>
                <div>
                    {reportUrl ? (
                        <h3>Link para dowload do relatório <a href={reportUrl}>Clique aqui</a></h3>
                    ) : (
                        null
                    )}
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default Reports;