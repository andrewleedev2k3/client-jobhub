import { IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faBan } from "@fortawesome/free-solid-svg-icons";

type UserActionProps = {
    params: any, 
    onAction: (id: string) => void, 
    title: string
    actionType: 'ban' | 'unban'
}
function UserActions({params, onAction, title, actionType}: UserActionProps) {
    return (
        <Tooltip title={title}>
            <IconButton onClick={() => onAction(params.id)}>
                <FontAwesomeIcon icon={actionType === 'ban' ? faBan : faArrowRotateLeft} />
            </IconButton>
        </Tooltip>
    );
}

export default UserActions;