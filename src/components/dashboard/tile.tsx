import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import styled from "styled-components";

interface TileProps {
    imgUrl: string,
    name: string,
    location: string,
}

const ListStyled = styled(List)`
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
`;

export default ({imgUrl, name, location}: TileProps) => {
    return (
        <ListStyled aria-label="vendors list">
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <img src={imgUrl} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={location ?? 'N/A'} />
            </ListItem>
            <Divider />
        </ListStyled>
    )
}