import React, {useState} from 'react'
import { useEffect } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

export const usePokemon = (id: string) => {
  const [isloading, setIsloading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull)

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon(resp.data);
    setIsloading(false);
  }

  useEffect(() => {
    loadPokemon()
  }, []);

  return {
    isloading,
    pokemon,
  }
}
