import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import styled from "styled-components";
import { Geo } from "../../api/types";

interface TileProps {
    imgUrl: string,
    name: string,
    geo?: Geo,
}

const ListStyled = styled(List)`
    width: 100%;
    padding-top: 0px;
    padding-bottom: 0px;
`;

const ImageStyled = styled.img`
    width: 40px;
`;

const AddressStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

const TextContainer = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    
    & > .div {
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;

interface LocationDisplayProps {
    geo?: Geo
}

const LocationDisplay = ({geo}: LocationDisplayProps) => {
    if (geo) {
        return (
            <AddressStyled>
                <Typography component="span">{geo.full_name}</Typography>
                <Typography component="span">{geo.coordinates.lat.toFixed(4)} | {geo.coordinates.long.toFixed(4)}</Typography>
            </AddressStyled>
        )
    }
    
    return <Typography component="span">-</Typography>
}

{/* avatar width/height defaults to 40px in mui */}
export default ({imgUrl, name, geo}: TileProps) => {
    return (
        <>
            <ListStyled aria-label="vendors list">
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar sx={{ width: 40, height: 40 }}> 
                            <ImageStyled src={imgUrl} />
                        </Avatar>
                    </ListItemAvatar>
                    {/* certain components in materialsUI are super compatiable with nextjs like ListItemText primary + secondary because they next <p>tags  */}
                    {/* So will separate them out like this */}
                    <TextContainer>
                        <Typography component="span">{name}</Typography>
                        <LocationDisplay geo={geo} />
                    </TextContainer>
                </ListItem>
            </ListStyled>
            <Divider />
        </>
    )
}

