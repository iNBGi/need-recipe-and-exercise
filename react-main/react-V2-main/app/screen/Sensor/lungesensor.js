import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, Button } from 'react-native';
import { WelcomeToLungeSensor } from './lungefront';

export const Lungesensor = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [noOfLunges, setNoOfLunges] = useState(0);
  const [isLunging, setIsLunging] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [status, setStatus] = useState('unknown');
  const isCountedRef = useRef(false); // Ref to track counting status
  const cooldownTimeoutRef = useRef(null); // Ref for cooldown timeout
  const cooldownDuration = 3000; // Cooldown duration in milliseconds

  const minConfidence = 0.5; // Pose detection confidence threshold
  const verticalThreshold = 300; // Vertical distance threshold for proper lunge detection

  const onPoseDetected = (pose) => {
    const leftHipY = pose[0]?.pose?.leftHip?.y;
    const rightHipY = pose[0]?.pose?.rightHip?.y;
    const leftKneeY = pose[0]?.pose?.leftKnee?.y;
    const rightKneeY = pose[0]?.pose?.rightKnee?.y;
    const leftAnkleY = pose[0]?.pose?.leftAnkle?.y;
    const rightAnkleY = pose[0]?.pose?.rightAnkle?.y;

    if (
      pose[0]?.pose?.leftHip?.confidence > minConfidence &&
      pose[0]?.pose?.leftKnee?.confidence > minConfidence &&
      pose[0]?.pose?.leftAnkle?.confidence > minConfidence &&
      pose[0]?.pose?.rightHip?.confidence > minConfidence &&
      pose[0]?.pose?.rightKnee?.confidence > minConfidence &&
      pose[0]?.pose?.rightAnkle?.confidence > minConfidence
    ) {
      const verticalDistanceLeft = Math.abs(leftHipY - leftAnkleY);
      const verticalDistanceRight = Math.abs(rightHipY - rightAnkleY);
      const isLeftInFront = leftHipY < rightHipY;

      if (verticalDistanceLeft < verticalThreshold && verticalDistanceRight < verticalThreshold && !isLunging) {
        setIsLunging(true);
        setStatus('proper');
        isCountedRef.current = false; // Reset count status

        if (cooldownTimeoutRef.current) {
          clearTimeout(cooldownTimeoutRef.current);
        }
        cooldownTimeoutRef.current = setTimeout(() => {
          setIsLunging(false);
          setStatus('unknown');
        }, cooldownDuration);
      } else if ((verticalDistanceLeft >= verticalThreshold || verticalDistanceRight >= verticalThreshold) && isLunging && !isCountedRef.current) {
        if (isLeftInFront && verticalDistanceLeft >= verticalThreshold) {
          setIsLunging(false);
          setStatus('improper');
          setNoOfLunges((prevNoOfLunges) => prevNoOfLunges + 1);
          isCountedRef.current = true; // Mark lunge as counted
        } else if (!isLeftInFront && verticalDistanceRight >= verticalThreshold) {
          setIsLunging(false);
          setStatus('improper');
          setNoOfLunges((prevNoOfLunges) => prevNoOfLunges + 1);
          isCountedRef.current = true; // Mark lunge as counted
        } else {
          setIsLunging(false);
          setStatus('unknown');
        }
      }
    } else {
      setIsLunging(false);
      setStatus('improper');
    }
  };

  const onStart = () => {
    setIsStarted(true);
    setShowWelcomePage(false);
    setNoOfLunges(0);
  };

  const handleStop = () => {
    setIsStarted(false);
    setIsLunging(false);
    setStatus('unknown');
  };

  return (
    <View style={{ flex: 1 }}>
      {showWelcomePage ? (
        <WelcomeToLungeSensor onStart={onStart} />
      ) : (
        <>
          <Text>Human Pose</Text>
          <HumanPose
            height={500}
            width={400}
            enableKeyPoints={true}
            enableSkeleton={true}
            flipHorizontal={false}
            isBackCamera={false}
            color={'0, 255, 0'} // Initial color is red
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
            No of Lunges: {noOfLunges}
          </Text>
          {isLunging && status !== 'unknown' && (
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
          <Button title="Stop" onPress={handleStop} disabled={!isStarted} />
        </>
      )}
    </View>
  );
};

export default Lungesensor;
