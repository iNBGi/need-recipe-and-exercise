import React, { useEffect, useState } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text } from 'react-native';
import { WelcomeToDumbellSensor } from './dumbellfront';

export const Dumbellsensor = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [noOfCurls, setNoOfCurls] = useState(0);
  const [isCurling, setIsCurling] = useState(false);
  const [status, setStatus] = useState('unknown');

  const calculateAngle = (joint1, joint2, joint3) => {
    const radians = Math.atan2(joint3.y - joint2.y, joint3.x - joint2.x) - Math.atan2(joint1.y - joint2.y, joint1.x - joint2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

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

    const minConfidence = 0.7; // Adjust the confidence level as needed

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

      // Check if both arms are going up
      const leftWristGoingUp = leftWrist.y < leftElbow.y;
      const rightWristGoingUp = rightWrist.y < rightElbow.y;

      if (leftWristGoingUp && rightWristGoingUp && !isCurling) {
        setIsCurling(true);
        setStatus('proper');
        setNoOfCurls((prevNoOfCurls) => prevNoOfCurls + 1);
      } else if (!leftWristGoingUp || !rightWristGoingUp) {
        setIsCurling(false);
        setStatus('improper');
      }
    } else {
      setIsCurling(false);
      setStatus('improper');
    }
  };

  const onStart = () => {
    setShowWelcomePage(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {showWelcomePage ? (
        <WelcomeToDumbellSensor onStart={onStart} />
      ) : (
        <>
          <Text>Human Pose</Text>
          <HumanPose
            height={500}
            width={400}
            enableKeyPoints={false}
            enableSkeleton={false}
            flipHorizontal={false}
            isBackCamera={false}
            color={'0, 255, 0'}
            mode={'single'}
            onPoseDetected={onPoseDetected}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 50,
              left: 0,
              right: 0,
              textAlign: 'center',
              textShadowColor: 'black',
              backgroundColor: 'white',
              padding: 10,
              fontSize: 20,
              color: status === 'proper' ? 'green' : 'red',
            }}>
            No of Barbell Curls: {noOfCurls}
          </Text>
          {isCurling && status !== 'unknown' && (
            <Text
              style={{
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: 70,
                color: status === 'proper' ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
              {status}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Dumbellsensor;
