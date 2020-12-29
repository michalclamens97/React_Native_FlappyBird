import React from "react";
import { View } from "react-native";

const Obstacles = ({
  obstaclesLeft,
  obstaclesWidth,
  gap,
  obstaclesHeight,
  color,
  randomBottom,
}) => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: randomBottom + obstaclesHeight + gap,
        }}
      />

      <View
        style={{
          position: "absolute",
          backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
        }}
      />
    </>
  );
};

export default Obstacles;
