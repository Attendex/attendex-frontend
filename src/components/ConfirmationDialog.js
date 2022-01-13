import { Button, DialogContentText, DialogActions, DialogContent, Dialog, DialogTitle } from '@mui/material';

function ConfirmationDialog (props) {
  const { onClose, open, title, text, cancelButtonText, actionButtonText } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>{cancelButtonText}</Button>
        <Button onClick={() => onClose(true)} autoFocus>{actionButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
