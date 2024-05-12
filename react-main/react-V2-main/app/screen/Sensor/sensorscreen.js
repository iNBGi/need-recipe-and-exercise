<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text } from 'react-native';

export const Sensorscreen = () => {
  const [noOfCurls, setNoOfCurls] = useState(0);
  const [hasStart, setHasStart] = useState(false);
  const [hasEnd, setHasEnd] = useState(false);

  const calculateAngle = (joint1, joint2, joint3) => {
    const radians = Math.atan2(joint3.y - joint2.y, joint3.x - joint2.x) - Math.atan2(joint1.y - joint2.y, joint1.x - joint2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

    // Ensure angle is within 0 to 360 degrees
    if (angle > 180) {
      angle = 360 - angle;
    }

    return angle;
  };

  const onPoseDetected = (pose) => {
    const leftShoulder = pose[0]?.pose?.leftShoulder;
    const leftElbow = pose[0]?.pose?.leftElbow;
    const leftWrist = pose[0]?.pose?.leftWrist;

    const rightShoulder = pose[0]?.pose?.rightShoulder;
    const rightElbow = pose[0]?.pose?.rightElbow;
    const rightWrist = pose[0]?.pose?.rightWrist;

    const minConfidence = 0.5; // Adjust the confidence level as needed

    if (
      leftShoulder?.confidence > minConfidence &&
      leftElbow?.confidence > minConfidence &&
      leftWrist?.confidence > minConfidence &&
      rightShoulder?.confidence > minConfidence &&
      rightElbow?.confidence > minConfidence &&
      rightWrist?.confidence > minConfidence
    ) {
      const leftElbowWristAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      const rightElbowWristAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

      if (leftElbowWristAngle < 90 && rightElbowWristAngle < 90) {
        // Adjust the threshold angle as needed
        setHasStart(true);
        setHasEnd(false);
      }

      if (hasStart && (leftElbowWristAngle > 160 || rightElbowWristAngle > 160)) {
        // Adjust the threshold angle as needed
        setHasEnd(true);
        setHasStart(false);
=======
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
      pose[0]?.pose?.leftHip?.confidence > 0.5 &&
      pose[0]?.pose?.leftAnkle?.confidence > 0.5
    ) {
      if (
        Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) < 400
      ) 
      {
        setHasSit(true);
        setHasStand(false);
      }
      if (hasSit) {
        if (
          Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) > 400
        ) 
        {
          setHasStand(true);
          setHasSit(false);
        }
>>>>>>> 0c2d9cbc6b648353863948daaab0a6a9664b4fe7
      }
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    setNoOfCurls(hasEnd ? noOfCurls + 1 : noOfCurls);
  }, [hasEnd]);

  return (
    <View style={{ flex: 1 }}>
=======
    setNoOfSquats(hasStand ? noOfSquats + 1 : noOfSquats);
  }, [hasStand]);

  return (
    <View style={{flex: 1}}>
>>>>>>> 0c2d9cbc6b648353863948daaab0a6a9664b4fe7
      <Text>Human Pose</Text>
      <HumanPose
        height={500}
        width={400}
        enableKeyPoints={true}
        enableSkeleton={true}
        flipHorizontal={false}
        isBackCamera={false}
        color={'255, 0, 0'}
<<<<<<< HEAD
        mode={'single'} // Set mode to 'single'
=======
>>>>>>> 0c2d9cbc6b648353863948daaab0a6a9664b4fe7
        onPoseDetected={onPoseDetected}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
<<<<<<< HEAD
          textShadowColor: 'black',
          backgroundColor: 'white',
          padding: 10,
          fontSize: 20,
        }}>
        No of Barbell Curls: {noOfCurls}
=======
          textShadowColor:'white',
          backgroundColor: 'black',
          padding: 10,
          fontSize: 20,
        }}>
        No of Squats: {noOfSquats}
>>>>>>> 0c2d9cbc6b648353863948daaab0a6a9664b4fe7
      </Text>
    </View>
  );
};

<<<<<<< HEAD
export default Sensorscreen;
=======
export default Sensorscreen;
>>>>>>> 0c2d9cbc6b648353863948daaab0a6a9664b4fe7
