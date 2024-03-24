import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Dispatch } from 'react';

interface CofirmDelete {
    open: boolean;
    onSetOpen: Dispatch<React.SetStateAction<boolean>>;
    onSetAgree: Dispatch<React.SetStateAction<boolean>>;
}
const ConfirmDelete = ({ open, onSetOpen, onSetAgree }: CofirmDelete) => {
    return (
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">Bạn chắc chắn muốn xoá ?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Hãy cân nhắc kỹ trước khi thực hiện hành động này!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onSetAgree(false);
                        onSetOpen(false);
                    }}
                >
                    <span className="text-content-text">Huỷ</span>
                </Button>
                <Button
                    onClick={() => {
                        onSetAgree(true);
                        onSetOpen(false);
                    }}
                    autoFocus
                >
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDelete;
