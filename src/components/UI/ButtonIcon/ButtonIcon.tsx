import styles from './ButtonIcon.module.css';

import closeIcon from '../../../assets/close.svg';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import nextIcon from '../../../assets/next.svg';
import beforeIcon from '../../../assets/before.svg';
import addIcon from '../../../assets/add.svg';

export enum Buttons {
	EDIT = 'edit',
	DELETE = 'delete',
	CLOSE = 'close',
	NEXT = 'next',
	BEFORE = 'before',
	ADD = 'add',
}

export enum ButtonSizes {
	SMALL = '24px',
	MEDIUM = '48px',
}

type ButtonIconProps = {
	type: Buttons;
	size?: ButtonSizes;
	onClick?: () => void;
};

const getButtonIcon = (type: Buttons) => {
	switch (type) {
		case Buttons.EDIT:
			return editIcon;
		case Buttons.DELETE:
			return deleteIcon;
		case Buttons.NEXT:
			return nextIcon;
		case Buttons.BEFORE:
			return beforeIcon;
		case Buttons.ADD:
			return addIcon;
		default:
			return closeIcon;
	}
};

const ButtonIcon = ({ type, onClick, size }: ButtonIconProps) => {
	const icon = getButtonIcon(type);

	return (
		<button
			type="button"
			onClick={onClick}
			className={styles.button}
			style={{ width: size, height: size }}
		>
			<img src={icon} alt={`${type} button`} />
		</button>
	);
};
export default ButtonIcon;
