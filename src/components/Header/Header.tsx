import { useState, useEffect } from 'react';
import { AlignJustify } from 'lucide-react';
import brand from '../../assets/brand.ico';
import classes from './Header.module.css';

const Header = () => {
    const [windowSize, setWindowSize] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        setWindowSize(window.innerWidth <= 360);
    };


    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    
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

export default Header;