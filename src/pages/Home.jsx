import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/Index";
import { Button, Container, Grid, Stack } from "@mui/material";
import api from "../config/api";
import PokemonCard from "../components/PokemonCard/Index";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Home() {
  const [count, setCount] = useState(1);
  const [listaPok, setListaPok] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [limit] = useState(25);
  const [offset] = useState(0);
  const [pokefilter, setPokeFilter] = useState("");
  const pokemonFilter = listaPok.results.filter((pokemon) =>
    pokemon.name.includes(pokefilter)
  );
  useEffect(() => {
    getPokemons(limit, offset);
  }, []);

  function getPokemons(limit, offset) {
    api.get("pokemon?limit=" + limit + "&offset=" + offset).then(({ data }) => {
      setListaPok(data);
    });
  }

  function changePag(e, nextOrPrevious, count) {
    e.preventDefault();
    if (count === "next") {
      setCount((state) => (state + 1 > 1 ? state + 1 : 1));
    } else {
      setCount((state) => (state - 1 > 1 ? state - 1 : 1));
    }

    if (nextOrPrevious) {
      api
        .get(nextOrPrevious.replace("https://pokeapi.co/api/v2/", ""))
        .then(({ data }) => {
          setListaPok(data);
        });
    }
  }

  return (
    <>
      <NavBar setPokeFilter={setPokeFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemonFilter.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <PokemonCard name={pokemon.name} url={pokemon.url} index={key} />
            </Grid>
          ))}
        </Grid>

        <Stack
          sx={{ marginTop: "30px", marginBottom: "15px" }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            startIcon={<ArrowBackIcon />}
            className="confirm-button"
            variant="contained"
            size="large"
            onClick={(e) => changePag(e, listaPok.previous, "previous")}
          ></Button>
          <p>{count}</p>
          <Button
            startIcon={<ArrowForwardIcon />}
            className="confirm-button"
            variant="contained"
            size="large"
            onClick={(e) => changePag(e, listaPok.next, "next")}
          ></Button>
        </Stack>
      </Container>
    </>
  );
}
