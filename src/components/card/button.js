import styles from './BtnTask.module.css';

export const Button = ({ onClick }) => {
	return (
		<button className={styles['list-btn']} onClick={onClick}>
			Удалить
		</button>
	);
};
