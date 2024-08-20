import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUserContext } from '../utils/Context';

 const EditProfile=()=> {
    const [open, setOpen] = React.useState(false);
    const[bio,setBio]= React.useState('')
    const[userName,setUserName]= React.useState('')
    const[name,setName]= React.useState('')
    const{updateBio,updateName,updateUserName,currentUser} = useUserContext()
    


    const handleClickOpen = () => {
        setOpen(true);
    };

 

    const handleClose = () => {
        setOpen(false);
    };

 
    const loadValues=()=>{
        setBio(currentUser.bio)
        setUserName(currentUser.username)
        setName(currentUser.name)
    }
    React.useEffect(()=>{
        loadValues()

    },[])

    const handleSave=()=>{
        if(currentUser.bio !==bio && bio !==''){
            updateBio(bio)
        }
        if(currentUser.name !==name && name !==''){
            updateName(name)
        }
        if(currentUser.username !== userName && userName !==''){
            if(!userName.startsWith('@')){
            updateUserName(`@${userName}`)


            }else{
                updateUserName(userName)
            }
        }
        setOpen(false);
    }

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

    return (
        <React.Fragment>
        <Button type="button" className="px-4 py-2 my-4 rounded-3xl border-2 border-gray-300" onClick={handleClickOpen}>edit profile</Button>

        <Dialog
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title"><h3>Edit Your Profile</h3>
            </DialogTitle>
            <DialogContent >
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                <div className="my-2 "><label htmlFor="name">name</label> <br/><input type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} maxLength={15} id='name' className='px-4 py-2 rounded-xl' /></div>
                <div className="my-2"><label htmlFor="username">user name</label>  <br/><input type='text' placeholder='username' id='username' value={userName} onChange={(e)=>setUserName(e.target.value)} maxLength={10} className='px-4 py-2 rounded-xl' /></div>
                <div className="my-2"><label htmlFor="bio">Bio</label>  <br/><input type='text' placeholder='bio' id='bio' value={bio} onChange={(e)=>setBio(e.target.value)} maxLength={30} className='px-4 py-2 rounded-xl' /></div>
                
                
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

export default EditProfile;