import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface PostMenuHomeProps{
    handleNotIntrested:()=>void,
    handleFollow:()=>void,
    username:string,
    isFollowed:boolean

}

export default function PostMenuHome({handleFollow,handleNotIntrested,username,isFollowed}:PostMenuHomeProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faEllipsis}/>
        </Button>
        <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={()=>handleNotIntrested()}>not intrested</MenuItem>
            <MenuItem onClick={()=>handleFollow()}>{isFollowed?"unfollow":"follow"} {username}</MenuItem>
        </Menu>
        </div>
    );
}
