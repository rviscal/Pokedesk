import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import api from "../../config/api";
import { Box, CardActionArea, CircularProgress } from "@mui/material";
import { useState } from "react";

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
  width: "300px",
  objectFit: "initial",
  display: "flex",
  justifyContent: "center",
  padding: "10px 10px 10px 10px",
};
const typographySx = {
  margin: "initial",
  borderTop: "groove",
  borderColor: "rgb(0, 0, 0, 0.1)",
  padding: "15px 0 15px 15px",
  textTransform: "capitalize",
};
export default function PokemonCard({ name, url, index }) {
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const getDadosPokemon = () => {
      setLoading(true);
      setImage("");

      api.get(url).then((res) => {
        setImage(res.data.sprites.other["dream_world"].front_default);
        setLoading(false);
      });
    };

    getDadosPokemon();
  }, [url]);

  return (
    <Card sx={boxSX} key={index}>
      <CardActionArea>
        <CardContent sx={cardContentdSX}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
