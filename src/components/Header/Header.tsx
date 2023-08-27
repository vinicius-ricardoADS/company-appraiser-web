import brand from '../../assets/brand.ico';
import classes from './Header.module.css';

const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.flex}>
                    <div className={classes.flex}>
                        <img src={brand} alt='' className={classes.img} />
                        <h3 className={classes.h3}>Company Appraiser</h3>
                    </div>
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <a className={classes.link} href='#'>
                                Informações
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
};

export default Header;