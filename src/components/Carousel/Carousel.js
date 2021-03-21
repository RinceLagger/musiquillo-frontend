import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};

const items = [
    <div className="item" data-value="1">1. Create a Game and share the Code with your friends</div>,
    <div className="item" data-value="2">2. Start the game after your friends join the Game Room </div>,
    <div className="item" data-value="3">3. Remember to have your Microphone connected, you will need it!</div>,
    <div className="item" data-value="4">4. Every turn, 1 player will hum a requested song and send it to the rest of the players</div>,
    <div className="item" data-value="5">5. The other players will have to guess which song is it.</div>,
    <div className="item" data-value="5">6. The quickest you are, the more points you get!</div>,
];

export default function Carousel () {


return (<AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
    />)
}
    
