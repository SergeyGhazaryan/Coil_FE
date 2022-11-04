import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ErrorText } from './types';

import styles from "./errors.module.scss"

const  DescriptionAlerts = ({text}:ErrorText) => {
    return (
      <Stack sx={{ width: '20%',}} spacing={2} className={styles.container} >
        <Alert severity="error" className={styles.errorBlock}>
          {text}
        </Alert>
      </Stack>
    );
  }

  export default DescriptionAlerts