import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './Loading.module.scss'

export const Loading = () => (
  <div className={styles.Loading}>
    <Spinner animation="border" role="status" />
  </div>
);
