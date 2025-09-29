import './Background.css'
import video1 from '../../assets/Mikaila_video.mov'
import image1 from '../../assets/Mikaila_lamb.jpeg'
import image2 from '../../assets/Mikaila_horse.jpeg'
import image3 from '../../assets/Mikaila_giant.jpeg'

const Background = ({playStatus,heroCount}) => {

    if (playStatus) {
        return (
            <video className='background fade-in' autoPlay loop>
                <source src={video1} type='video/mp4' />
            </video>
        )
    }
    else if (heroCount===0)
    {
        return <img src={image1} className='background fade-in' alt="" />
    }
    else if (heroCount===1)
    {
        return <img src={image2} className='background fade-in' alt="" />
    }
    else if (heroCount===2)
    {
        return <img src={image3} className='background fade-in' alt="" />
    }
};

export default Background;