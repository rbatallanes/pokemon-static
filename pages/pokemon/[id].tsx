import React, { useEffect, useState } from 'react'

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { GetStaticProps, NextPage,GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils'
import confetti from 'canvas-confetti'

interface Props{
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {

  //const router = useRouter()

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
  
  const pokemons151 = [...Array(151)].map((val,idx)=>`${idx+1}`)
  //console.log({pokemons151});
  
  return {
    paths: pokemons151.map(id=>({
      params: {id}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) =>{

  const {id} = params as {id: string}

  return getPokemonInfo(id)
}

export default PokemonPage