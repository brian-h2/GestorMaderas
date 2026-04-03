import React from 'react';
import { ToastType } from '../hooks/useToast';
import styles from './Toast.module.css';

interface Props {
  message: string;
  type: ToastType;
  visible: boolean;
}

export const Toast: React.FC<Props> = ({ message, type, visible }) => (
  <div className={`${styles.toast} ${styles[type]} ${visible ? styles.show : ''}`}>
    {message}
  </div>
);
