import { Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { FavoritePokemons } from '../../components/pokemon'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils'


export const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons)
  }, [])
  

  return (
    <Layout title='Favoritos'>
      {favoritePokemons.length===0 
        ? <NoFavorites/> 
        : (
          <FavoritePokemons
            pokemons={favoritePokemons}
          />
        )}
      
    </Layout>
  )
}

export default FavoritesPage