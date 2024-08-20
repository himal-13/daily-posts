    import * as React from 'react';
    import Button from '@mui/material/Button';
    import Menu from '@mui/material/Menu';
    import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsis,  faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useUserContext } from '../utils/Context';
import { Post,} from '../utils/interfaces';

interface PostMenuProps{
    postId:number,
}

   function PostMenu({postId}:PostMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const[openDialog,setOpenDialog] = React.useState(false)
    const open = Boolean(anchorEl);
    const [editingValue,setEditingValue] = React.useState('')
    const{currentUser,editPost,deletePost} = useUserContext()
    const[post,setPost]= React.useState<Post>()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEditClick =()=>{
        setEditingValue(post?.content??'')

        handleClose()
        setOpenDialog(true)

    }


    React.useEffect(()=>{
        setPost(currentUser.posts.find(post=>post.postId===postId))

    },[])

    const handleSave=()=>{
        if(post?.content !==editingValue && editingValue.trim()!==''){
            editPost(post!.postId,editingValue)
            setOpenDialog(false);
        }

    }

    return (
        <div>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faEllipsis} className='text-xl'/>
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
                    <div className="">
                    <MenuItem onClick={handleEditClick}><span className='mx-2'>Edit </span> <FontAwesomeIcon icon={faEdit}/></MenuItem>
                    <MenuItem onClick={()=>{deletePost(post!.postId);setAnchorEl(null)}}><span className='mx-2'>Delete </span><FontAwesomeIcon icon={faTrash}/></MenuItem>
                    </div>
        </Menu>

            <Dialog
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" >
            Edit your post
            </DialogTitle>
            <DialogContent >
            <DialogContentText>
                <input value={editingValue} onChange={(e)=>setEditingValue(e.target.value)} maxLength={60} placeholder='edit post' className='px-4 py-2'/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=>setOpenDialog(false)}>
                Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    }

    export default PostMenu;
