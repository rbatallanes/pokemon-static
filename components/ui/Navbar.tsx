import { Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const NavBar = () => {

  const {theme} = useTheme()

  const [color, setColor] = useState('blue')

  useEffect(() => setColor('pink'), [])

  const router = useRouter()

  const favoritos=()=>{
    router.push('/favorites/1')
  }

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 10px',
        backgroundColor: theme?.colors.gray100.value
    }}>

      <Image
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}
        alt='Icono Poke'
        width={'80'}
        height={'80'}
      />
        
      <NextLink href={'/'} passHref>
        <Link>
          <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >P</Text>  
          
          <Text size="2em" color={color} >okemón</Text>
        </Link>
      </NextLink>  
        


        <Spacer css={{flex: 1}}/>
        <NextLink href={'/favorites'} passHref>
          <Link css={{marginRight:'10px'}}>
            <Text  color={color}>Favoritos</Text> 
          </Link>
        </NextLink>
    </div>
  )
}

export default NavBar