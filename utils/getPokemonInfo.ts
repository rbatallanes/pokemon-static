import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

export const getPokemonInfo = async (val:string) => {

  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${val}`)
  
  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }

  return {
    props: {
      pokemon
    }
  }
}