import { useRef, useEffect, useState } from 'react';

import styles from './Modal.module.css';

import ButtonIcon, { ButtonSizes, Buttons } from '../ButtonIcon/ButtonIcon';

type ModalProps = {
	onClose?: () => void;
	children: React.ReactNode;
	open?: boolean;
};

const Modal = ({ onClose, children, open }: ModalProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(open);

	const openStyle = isOpen === true ? { display: 'flex' } : { display: 'none' };
	const handleClose = () => {
		setIsOpen(false);

		onClose && onClose();
	};

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target;

		if (ref.current && ref.current === target) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return (
		<div className={`column ${styles.modal}`} style={openStyle} ref={ref}>
			<div className={`flex column ${styles.content}`}>
				<ButtonIcon
					type={Buttons.CLOSE}
					onClick={handleClose}
					size={ButtonSizes.SMALL}
				></ButtonIcon>
				{children}
			</div>
		</div>
	);
};
export default Modal;
