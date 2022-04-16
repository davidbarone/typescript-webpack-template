import React, { FunctionComponent, MouseEventHandler } from 'react';
import style from './style.css';

type ButtonPropsType = {
  title: string;
  label: string;
  visible: boolean;
  click: MouseEventHandler<HTMLButtonElement>;
}

const MyButton: FunctionComponent<ButtonPropsType> = ({ label, visible, click, title }) => {
    return (
        <button
            className={style.myButton}
            title={title}
            style={visible ? style['display:inline'] : style['display: none']}
            onClick={click}
        >
            {label}
        </button>
    );
};

export default MyButton;
