import React, {useEffect, useState} from 'react';
import HumanPose from 'react-native-human-pose';
import {View, Text} from 'react-native';

export const Sensorscreen = () => {
  const [noOfSquats, setNoOfSquats] = useState(0);
  const [hasSit, setHasSit] = useState(false);
  const [hasStand, setHasStand] = useState(false);
  const onPoseDetected = (pose) => {

    console.log('leftHip', pose[0]?.pose?.leftHip?.y);
    console.log('leftAnkle', pose[0]?.pose?.leftAnkle?.y);
    if (
      pose[0]?.pose?.leftHip?.confidence > 0.4 &&
      pose[0]?.pose?.leftAnkle?.confidence > 0.4
    ) {
      if (
        Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) < 500
      ) 
      {
        setHasSit(true);
        setHasStand(false);
      }
      if (hasSit) {
        if (
          Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) > 500
        ) 
        {
          setHasStand(true);
          setHasSit(false);
        }
      }
    }
  };

  useEffect(() => {
    setNoOfSquats(hasStand ? noOfSquats + 1 : noOfSquats);
  }, [hasStand]);

  return (
    <View style={{flex: 1}}>
      <Text>Human Pose</Text>
      <HumanPose
        height={500}
        width={400}
        enableKeyPoints={true}
        enableSkeleton={true}
        flipHorizontal={false}
        isBackCamera={false}
        color={'255, 0, 0'}
        onPoseDetected={onPoseDetected}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          textShadowColor:'black',
          backgroundColor: 'white',
          padding: 10,
          fontSize: 20,
        }}>
        No of Squats: {noOfSquats}
      </Text>
    </View>
  );
};

export default Sensorscreen;