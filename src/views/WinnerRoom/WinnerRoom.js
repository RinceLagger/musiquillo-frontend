import React from "react";

//import { usePlayers } from "../../context/PlayersContext";

import { useHistory } from "react-router-dom";
import "./WinnerRoom.css";
import styled, { keyframes } from "styled-components";
import { flip } from "react-animations";
import podium from "../../assests/images/podium.png";

/****REDUX */

import {useSelector} from 'react-redux';

const flipAnimation = keyframes`${flip}`;

const FlipH1 = styled.h1`
  animation: 3s ${flipAnimation};
`;

export default function WinnerRoom() {
  let history = useHistory();
  //const { players } = usePlayers();
  const {players} = useSelector((state)=> state.players);

  const [winner, setWinner] = React.useState({});

  const findWinner = React.useCallback(() => {
    let winnerName = players[0].username;
    let winnerPoints = players[0].points;
    let winnerImg = players[0].imgUser;
    players.forEach((player) => {
      if (player.points > winnerPoints) {
        winnerName = player.username;
        winnerPoints = player.points;
        winnerImg = player.imgUser;
      }
    });

    return {
      winnerName,
      winnerPoints,
      winnerImg,
    };
  }, [players]);

  React.useEffect(() => {
    const ganador = findWinner();
    setWinner(ganador);

    setTimeout(() => {
      history.push("/room-menu");
    }, 10000);
  }, [history, findWinner]);

  return (
    <div className="winning-container">
      <FlipH1 id="winner">
        <img id="winnerImg" src={winner.winnerImg} alt="img-winner" />
        {winner.winnerName}
      </FlipH1>
      <img src={podium} alt="podium" />
    </div>
  );
}
