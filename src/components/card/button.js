import styles from './button.module.css';

export const Button = ({ onClick, children }) => {
	return (
		<button type="button" className={styles['list-btn']} onClick={onClick}>
			{children}
		</button>
	);
};
