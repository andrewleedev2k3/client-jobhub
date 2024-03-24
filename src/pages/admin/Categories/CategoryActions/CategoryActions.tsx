import { Box, IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

type CategoryActionProps = {
    params: any
    onChange: (id: string) => void
    onDelete: (id: string) => void
}
function CategoryAction({params, onChange, onDelete}: CategoryActionProps) {
    return (
        <Box>
            <Tooltip title='Chỉnh sửa danh mục'>
                <IconButton onClick={() => onChange(params.id)}>
                    <FontAwesomeIcon icon={faPen} />
                </IconButton>
            </Tooltip>
            <Tooltip title='Xóa danh mục'>
                <IconButton onClick={() => onDelete(params.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default CategoryAction