import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import api from "../../config/api";
import { CardActionArea } from "@mui/material";

const boxSX = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: 5,
  width: 300,
  "&:hover": {
    boxShadow: "7",
    cursor: "pointer",
  },
};
const cardContentdSX = {
  width: 300,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  objetcFit: "initial",
  padding: 0,
};
const cardMediaSx = {
  width: "100%",
  objectFit: "initial",
  display: "flex",
  justifyContent: "center",
  paddingBottom: "10px",
};
const typographySx = {
  margin: "initial",
  borderTop: "groove",
  borderColor: "rgb(0, 0, 0, 0.1)",
  padding: "15px 0 15px 15px",
};
export default function PokemonCard({ name, url, index }) {
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    getDadosPokemon();
  }, [url]);

  async function getDadosPokemon() {
    const res = await api.get(url);
    setImage(res.data.sprites.other["dream_world"].front_default);
  }

  return (
    <Card sx={boxSX} key={index}>
      <CardActionArea>
        <CardContent sx={cardContentdSX}>
          {image && (
            <CardMedia
              sx={cardMediaSx}
              component="img"
              height="150px"
              image={image}
              alt={name}
            />
          )}
          <Typography
            sx={typographySx}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
