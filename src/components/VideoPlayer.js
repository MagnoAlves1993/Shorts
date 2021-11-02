import React, { useRef, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { BsChatRight, BsShare, BsWhatsapp, BsFacebook, BsTwitter } from 'react-icons/bs'

const animationFont = keyframes`
    from {
    color: purple;
  }

  50% {
      color:green;
  }

  to {
    color: yellow;
  }
`


const colorAnimation = keyframes`
 0% { color: red }
 30% { color: green }
 60% { color: blue }
 100% { color: yellow }
`

const Section = styled.section`
    scroll-snap-align: start;
    position: relative;
    font-family: 'Nunito Sans', sans-serif;
`
const BoxTools = styled.div`
    position: absolute;
    z-index:1;
    right:0px;
    top:50px;
    color: white;
    font-size:40px;
    display: flex;
    flex-direction: column;
    text-shadow: 1px 1px 5px black;
`

const BoxShared = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffffffab;
    padding: 10px;
    border-radius: 10px;
    text-shadow: none;
    margin-right: 5px;
`

const BoxDescription = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100vw;
    color: white;
    z-index:1;
    bottom:5px;
    left: 0px;
    padding-left: 5px;
    padding-top:5px;
    background: linear-gradient(to top,rgba(0,0,0,0.81) 0%,rgba(0,0,0,0.81) 00%,rgba(0,0,0,0) 100%)
`

const Video = styled.video`
    z-index:2;
`
const Price = styled.div`
    width: fit-content;
    font-weight: 900;
    font-size: 30px;
    margin: 10px 0;
    padding: 5px 15px;
    border: 1px solid #8CE563;
    border-radius: 40px;

    &#ab{
        font-weigth:900;
        font-size: 35px;
        border: none;
        padding: 5px;
        animation: ${colorAnimation} 5s infinite;
    }
`

const Title = styled.p`
    width: 75vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ffffff;
    border-radius: 5px;
    margin: 0 0 15px 0;
    padding: 5px;
`

const SideBar = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: #0000003d;
    padding: 10px;
    border-radius: 10px;
    margin-right: 5px;
    margin-bottom: 5px;
`

function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}

export const VideoPlayer = (item) => {
    const { title, videoLink, price, user, id } = item.item
    const firstName = user.split(" ")
    const lastName = firstName[1].split("", 1)
    const vidRef = useRef();
    const isVisible = useOnScreen(vidRef)
    const [statusVideo, setStatusVideo]= useState('play')
    const [showBoxShared, setShowBoxShared]= useState(false)

    useEffect(() => {
        if(!isVisible){
            vidRef.current.pause()
        }
        else{
            vidRef.current.play()
        }
    }, [isVisible])

    const onPause = () => {
        vidRef.current.pause()
    }

    const onPlay = () => {
        vidRef.current.play();
    }

    const controlsManual = () => {
        if(statusVideo === 'pause'){
            onPlay()
            setStatusVideo('play')
        }
        else if(statusVideo === 'play'){
            onPause()
            setStatusVideo('pause')
        }

    }

    return (
        <>
            <Section>
                <Video 
                    ref={vidRef}
                    autoPlay
                    width="100%"
                    muted
                    loop
                    onClick={() => controlsManual()}
                >
                    <source src={videoLink} type="video/mp4" />
                    Your browser does not support HTML video.
                </Video>
                <BoxTools>
                    <SideBar>
                        <BsChatRight size={30} />
                        <BsShare size={30} onClick={() => setShowBoxShared(!showBoxShared)}/>
                    </SideBar>
                    {showBoxShared && <BoxShared>
                        <a href={`https://api.whatsapp.com/send/?text=localhost:3000/${videoLink}?sender_device=pc&sender_web_id=6941002906875512326&is_from_webapp=v1&is_copy_url=0`}><BsWhatsapp color={'#6E0AD6'} size={30}/></a>
                        <a href={`https://www.facebook.com/sharer/sharer.php?app_id=113869198637480&u=localhost:3000/${videoLink}?sender_device=pc&sender_web_id=6941002906875512326&is_from_webapp=v1&is_copy_url=0&display=popup&sdk=joey`}><BsFacebook color={'#6E0AD6'} size={30}/></a>
                        <a href={`https://twitter.com/intent/tweet?refer_source=localhost:3000/${videoLink}?sender_device=pc&sender_web_id=6941002906875512326&is_from_webapp=v1&is_copy_url=0&text=localhost:3000/${videoLink}?sender_device=pc&sender_web_id=6941002906875512326&is_from_webapp=v1&is_copy_url=0`}><BsTwitter color={'#6E0AD6'} size={30}/></a>
                    </BoxShared>}
                </BoxTools>
                <BoxDescription>
                    <Price id={id}>{price}</Price>
                    <Title>{title}</Title>
                </BoxDescription>
        </Section>
       </>
    )
}

