import classes from './Container.module.css';

type ContainerProps = {
    children: React.ReactNode;
    home: boolean;
}


const Container = ({ children, home }: ContainerProps) => {
    return (
        <div className={home ? classes.container : classes['container-view']}>
            {children}
        </div>
    )
};

export default Container;