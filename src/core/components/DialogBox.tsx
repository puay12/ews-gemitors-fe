import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";

function DialogBox(props:any) {
    const [open, setOpen] = useState(false);

    const handleToClose = () => {
        setOpen(false);
    };

    const handleOnClick = () => {

    }

    return(
        <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.isCancelable
                        ? <Button onClick={handleToClose}
                            color="info" autoFocus>
                            Cancel
                        </Button> 
                        : <div></div>}
                    <Button onClick={handleOnClick}
                        color="success" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
    );
}