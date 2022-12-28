import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import styled from "styled-components";

const ListStyled = styled(List)`
    height: 300px;
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
`;

export default () => {
    return (
        <ListStyled aria-label="vendors list">
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <img src="https://placeholder.com/" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="DC Food Trucks" secondary="N/A" />
            </ListItem>
            <Divider />
        </ListStyled>
    )
}