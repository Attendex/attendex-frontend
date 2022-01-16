import { Alert, Collapse } from '@mui/material';
import { useEffect } from 'react';

export const alertSeverity = {
  "SUCCESS": "success",
  "WARN": "warning",
  "ERROR": "error",
}
function AlertFeedback (props) {
  const { msg, onClose, severity } = props;

  useEffect(() => {
    setTimeout(() => onClose(), 5000); // close alert after 3 seconds
  });

  return (
    <Collapse in={!!msg}>
      <Alert severity={severity} onClose={onClose} sx={{marginTop: '1rem'}}>{msg}</Alert>
    </Collapse>
  );
}

export default AlertFeedback;
