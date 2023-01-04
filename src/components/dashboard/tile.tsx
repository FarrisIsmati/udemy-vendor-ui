import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import styled from "styled-components";
import { Geo } from "../../api/types";

interface TileProps {
    imgUrl: string,
    name: string,
    geo?: Geo,
}

const ListStyled = styled(List)`
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
`;

const ImageStyled = styled.img`
    width: 40px;
`;

const AddressStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

interface LocationDisplayProps {
    geo?: Geo
}

const LocationDisplay = ({geo}: LocationDisplayProps) => {
    if (geo) {
        return (
            <AddressStyled>
                <p>{geo.full_name}</p>
                <p>{geo.coordinates.lat} | {geo.coordinates.long}</p>
            </AddressStyled>
        )
    }
    
    return <p>N/A</p>
}

export default ({imgUrl, name, geo}: TileProps) => {
    return (
        <ListStyled aria-label="vendors list">
            <ListItem button>
                <ListItemAvatar>
                    <Avatar sx={{ width: 40, height: 40 }}> {/* width/height defaults to 40px in mui */}
                        <ImageStyled src={imgUrl} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={<LocationDisplay geo={geo}/>} />
            </ListItem>
            <Divider />
        </ListStyled>
    )
}

