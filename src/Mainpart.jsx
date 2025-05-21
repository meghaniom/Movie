import React from 'react'
import Header from './component/header'
import Content from './component/Content'
import PlayingTex from './component/PlayingTex'
import Competible from './component/Competible'
import Footer from './Footer/Footer'

const Mainpart = () => {
  return (
    <div>
        <>
        <Header/>
        <Content/>
        <PlayingTex/>
        <Competible/>
        <Footer/>
        </>
    </div>
  )
}

export default Mainpart