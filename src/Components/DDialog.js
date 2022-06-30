import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

const DDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleModel(false)}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                {"Do you Really want to delete this user?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your are about to delete user
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => props.handleModel(false)}>
                    Cancel
                </Button>
                <Button onClick={() => props.handleModel(true)} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DDialog;