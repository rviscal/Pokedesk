import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/Index";
import { Container, Grid } from "@mui/material";
import api from "../config/api";
import PokemonCard from "../components/PokemonCard/Index";

const gridsx = {
  display: "flex",
  maxWidth: 300,
};
export default function Home() {
  const [count, setConut] = useState(1);
  const [listaPok, setListaPok] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
    
  });
  const [limit] = useState(50);
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

  function changePag(e, nextOrPrevious) {
    e.preventDefault();

    if (nextOrPrevious) {
      api
        .get(nextOrPrevious.replace("https://pokeapi.co/api/v2/", ""))
        .then(({ data }) => {
          setListaPok(data);
          setConut(count + 1);
        });
    }
  }

  return (
    <div>
      <NavBar setPokeFilter={setPokeFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemonFilter.map((pokemon, key) => (
            <Grid item xs={3} key={key}>
              <PokemonCard name={pokemon.name} url={pokemon.url} index={key} />
            </Grid>
          ))}
        </Grid>
        <Grid md={12}>
          <button onClick={(e) => changePag(e, listaPok.next)}>
            proxima pagina
          </button>
          <button onClick={(e) => changePag(e, listaPok.previous)}>
            pagina anterior
          </button>
        </Grid>
      </Container>
    </div>
  );
}
