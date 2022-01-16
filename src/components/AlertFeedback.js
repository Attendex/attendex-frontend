import { useEffect } from 'react';
import { styled } from '@mui/system';
import { Alert, Collapse } from '@mui/material';

function AlertFeedback (props) {
  const { msg, onClose, severity } = props;

  useEffect(() => {
    setTimeout(() => onClose(), 5000); // close alert after 3 seconds
  });

  return (
    <Collapse in={!!msg}>
      <StyledAlert severity={severity} onClose={onClose}>{msg}</StyledAlert>
    </Collapse>
  );
}

export const alertSeverity = {
  "SUCCESS": "success",
  "WARN": "warning",
  "ERROR": "error",
}

const StyledAlert = styled(Alert)({
  marginTop: '1rem',
});

export default AlertFeedback;
