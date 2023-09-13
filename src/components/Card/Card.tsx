import presentation from '../../assets/img_presentation.webp';
import classes from './Card.module.css';

const Card = () => {
    return (
        <div className={classes['container-img']}>
            <img src={presentation} className={classes.img} alt="Group friends" />
            <div className={classes.middle}>
                <p className={classes.description}>
                    Sua avaliação que importa para ter seu produto melhor e mais barato
                </p>
            </div>
        </div>
    );
};

export default Card;