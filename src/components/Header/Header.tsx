import { useState, useEffect } from 'react';
import { AlignJustify } from 'lucide-react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import brand from '../../assets/brand.ico';
import classes from './Header.module.css';
import axios from 'axios';
import { User } from '../../types/User';

type JwtDecodeEmail = {
    email: string
}

type HeaderResponsiveProps = {
    windowSize: boolean;
    isOpen: boolean;
    toggleDropdown: () => void;
}

type HeaderUserOrAdminProps = {
    user: User;
    props: HeaderResponsiveProps;
}

const HeaderUser = () => {
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
                                Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
};

const HeaderAdmin = ({ windowSize, isOpen, toggleDropdown }: HeaderResponsiveProps) => {
    return (
        <>
            {windowSize ? (
                <header className={classes.header}>
                    <div className={classes.flex}>
                        <div className={classes.flex}>
                            <img src={brand} alt='' className={classes.img} />
                            <h3 className={classes.h3}>Company Appraiser</h3>
                        </div>
                        <div className={classes['dropdown-container']}>
                            <button className={classes['dropdown-button']} onClick={toggleDropdown}>
                                <AlignJustify className={classes['drop-down']} />
                            </button>
                            {isOpen && (
                                <ul className={classes['dropdown-menu-flex']}>
                                    <li className={classes.li}>
                                        <a className={window.location.pathname === '/users' ? 
                                        classes['link-phone-mark'] : classes['link-phone']} href='#'>
                                            Usuários
                                        </a>
                                    </li>
                                    <li className={classes.li}>
                                        <a className={window.location.pathname === '/users' ? 
                                        classes['link-phone-mark'] : classes['link-phone']} href='#'>
                                            Relatórios
                                        </a>
                                    </li>
                                    <li className={classes.li}>
                                        <a className={window.location.pathname === '/companys' ? 
                                        classes['link-phone-mark'] : classes['link-phone']} href='/companys'>
                                            Empresas
                                        </a>
                                    </li>
                                    <li className={classes.li}>
                                        <a className={window.location.pathname === '/products' ? 
                                        classes['link-phone-mark'] : classes['link-phone']} href='#'>
                                            Produtos
                                        </a>
                                    </li>
                                    {window.location.pathname !== '/evaluations' ? (
                                        <li className={classes.li}>
                                            <a className={classes['link-phone']} href='/evaluations'>
                                                Avaliar
                                            </a>
                                        </li>
                                    ) : (
                                        null
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </header>
            ) : (
                <header className={classes.header}>
                    <div className={classes.flex}>
                        <div className={classes.flex}>
                            <img src={brand} alt='' className={classes.img} />
                            <h3 className={classes.h3}>Company Appraiser</h3>
                        </div>
                        <ul className={classes['ul-flex']}>
                            <li className={classes.li}>
                                <a className={window.location.pathname === '/users' ? 
                                classes['link-flex-mark'] : classes['link-flex']} href='#'>
                                    Usuários
                                </a>
                            </li>
                            <li className={classes.li}>
                                <a className={window.location.pathname === '/reports' ? 
                                classes['link-flex-mark'] : classes['link-flex']} href='#'>
                                    Relatórios
                                </a>
                            </li>
                            <li className={classes.li}>
                                <a className={window.location.pathname === '/companys' ? 
                                classes['link-flex-mark'] : classes['link-flex']} href='/companys'>
                                    Empresas
                                </a>
                            </li>
                            <li className={classes.li}>
                                <a className={window.location.pathname === '/products' ? 
                                classes['link-flex-mark'] : classes['link-flex']} href='/products'>
                                    Produtos
                                </a>
                            </li>
                            {window.location.pathname !== '/evaluations' ? (
                                <li className={classes.li}>
                                    <a className={classes['link-flex']} href='/evaluations'>
                                        Avaliar
                                    </a>
                                </li>
                            ) : (
                                null
                            )}
                        </ul>
                    </div>
                </header>
            )}
        </>
    )
};

const HeaderUserOrAdmin = ({ user, props }: HeaderUserOrAdminProps) => {
    return (
        <>
            {user?.role?.toString() === 'USER' ? (
                <HeaderUser />
            ) : (
                <HeaderAdmin
                    windowSize={props.windowSize}
                    isOpen={props.isOpen}
                    toggleDropdown={props.toggleDropdown} 
                />
            )}
        </>
    )
}

const HeaderLogin = ({ windowSize, isOpen, toggleDropdown }: HeaderResponsiveProps) => {
    return (
        <>
            {windowSize ? (
                <header className={classes.header}>
                    <div className={classes.flex}>
                        <div className={classes.flex}>
                            <img src={brand} alt='' className={classes.img} />
                            <h3 className={classes.h3}>Company Appraiser</h3>
                        </div>
                        <div className={classes['dropdown-container']}>
                            <button className={classes['dropdown-button']} onClick={toggleDropdown}>
                                <AlignJustify className={classes['drop-down']} />
                            </button>
                            {isOpen && (
                                <ul className={classes['dropdown-menu']}>
                                    <li className={classes['li-info']}>
                                        <a className={classes['link-phone']} href='#'>
                                            Informações
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </header>
            ) : (
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
            )}
        </>
    )
};

const Header = () => {
    const [windowSize, setWindowSize] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState<User>();

    const token = Cookies.get('token');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        setWindowSize(window.innerWidth <= 360);
    };

    const propsResponsive: HeaderResponsiveProps = {
        windowSize,
        isOpen,
        toggleDropdown
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        if (token) {
            const decodeToken: JwtDecodeEmail = jwtDecode(token);

            const fetchUser = async () => {
                await axios.get(`http://localhost:3333/users/${decodeToken.email}`).then((res) => setUser(res.data))
            }

            fetchUser();
        }
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [token]);
    
    return (
        <>
            {token ? (
                <HeaderUserOrAdmin
                    props={propsResponsive}
                    user={user!}
                />
            ) : (
                <HeaderLogin
                    windowSize={windowSize}
                    isOpen={isOpen}
                    toggleDropdown={toggleDropdown}
                />
            )}
        </>
    )
};

export default Header;