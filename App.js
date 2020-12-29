import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

export default function App() {
  //Getting the screen width and height
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const [isGameOver, setIsGameOver] = useState(false);

  const birdLeft = screenWidth / 2; //The point of the bottom left in our View
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2); //To make the bird move up and down the screen, the starting position is the middle of the screen
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth); //We set The obstacles off the page as their initial state
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0); //we are going to use this to substract from the height of the obstacles
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0); //we are going to use this to substract from the height of the obstacles

  const obstaclesWidth = 60;
  const obstaclesHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  const [score, setScore] = useState(0);

  //Start bird falling
  useEffect(() => {
    //If the bird is not at the bottom of the screen
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity); //I take - gravity from the bird height every 30 miliseconds, this way the bird is always going to go down
      }, 30);

      return () => {
        clearInterval(gameTimerId); //when the bidBotoom is < 0 , meaning is at the bottom of the screen, then we clear the interval
      };
    }
  }, [birdBottom]);

  console.log(birdBottom);

  //To make the Bird jump
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      console.log("jumped");
    }
  };

  //Start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstaclesWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5); //Move the obstacles to the left -5 pixels every 30 miliseconds
      }, 30);

      return () => {
        clearInterval(obstaclesLeftTimerId); //when the obstacleLeft has reached the end of the screen we clear the interval so the obstacles disappear from the screen
      };
    } else {
      //When the obstcles has reached the end of the screen then we reset the obstacle to star over
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeft]);

  //More Obstacles with different timer
  useEffect(() => {
    if (obstaclesLeftTwo > -obstaclesWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5); //Move the obstacles to the left -5 pixels every 30 miliseconds
      }, 30);

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo); //when the obstacleLeft has reached the end of the screen we clear the interval so the obstacles disappear from the screen
      };
    } else {
      //When the obstcles has reached the end of the screen then we reset the obstacle to star over
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeftTwo]);

  //check for collisions
  useEffect(() => {
    console.log(obstaclesLeft);
    console.log(screenWidth / 2);
    console.log(obstaclesLeft > screenWidth / 2);
    if (
      ((birdBottom < obstaclesNegHeight + obstaclesHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstaclesHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstaclesHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstaclesHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      console.log("game over");
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

        <Obstacles
          color={"green"}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          obstaclesLeft={obstaclesLeft}
          randomBottom={obstaclesNegHeight}
          gap={gap}
        />

        <Obstacles
          color={"yellow"}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          randomBottom={obstaclesNegHeightTwo}
          obstaclesLeft={obstaclesLeftTwo}
          gap={gap}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
