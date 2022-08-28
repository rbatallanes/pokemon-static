import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { NavBar } from '../ui'


/* type Props = {
    children?: React.ReactNode,
    title?: string
  }; */

interface Props{
    children?: React.ReactNode,
    title?: string
}

const origin = (typeof window === 'undefined')? '':window.location.origin

export const Layout: FC<Props>= ({children,title}) => {


  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name='author' content='Ricardo Batallanes'/>
            <meta name='description' content={`Info ${title}`}/>
            <meta name='keywords' content={`${title},pokemon,pokedex`}/>

            <meta property="og:title" content={`infor sobre ${title}`}/>
            <meta property="og:description" content={`Descripción sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <NavBar/>
        <main style={{
            padding: '0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}

export default Layout