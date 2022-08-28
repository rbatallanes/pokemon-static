import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { GetStaticProps,GetStaticPaths, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonList } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils'


interface Props{
  pokemon: Pokemon
}

const  PokemonByNamePage: NextPage<Props> = ({pokemon}) =>{  

  const [isInFavorites, setisInFavorites] = useState(false)

  useEffect(()=>{
    setisInFavorites(localFavorites.existInFavorites(pokemon.id))
  },[pokemon.id])
  
  const onToogleFavorite=()=>{
    localFavorites.toogleFavorites(pokemon.id)
    setisInFavorites(!isInFavorites)

    if(isInFavorites) return

    confetti({
      zIndex: 999,
      particleCount: 999,
      spread: 160,
      angle: -100,
      origin:{
        x:1,
        y:0,
      }
    })
  }
    
  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Grid>

          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
                <Text h1 transform='capitalize'>
                  {pokemon.name}
                </Text>
                <Button
                  color={'gradient'}
                  ghost={!isInFavorites}
                  onClick={onToogleFavorite}
                >{isInFavorites?'En Favoritos':'Guardar En Favoritos'}</Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const {data} = await pokeApi.get<PokemonList>(`/pokemon?limit=151`)

  return {
    paths: data.results.map(pokemon=>({
      params: {name : pokemon.name}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  
  const {name} = params as {name: string}

  return getPokemonInfo(name)
}

export default PokemonByNamePage