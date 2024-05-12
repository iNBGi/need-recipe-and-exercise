import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, Button } from 'react-native';
import { WelcomeToSquatSensor } from './squatfront';

export const Squatsensor = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [noOfSquats, setNoOfSquats] = useState(0);
  const [isSquatting, setIsSquatting] = useState(false);
  const [message, setMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [status, setStatus] = useState('unknown');
  const lastSquatTimeRef = useRef(0); // Ref to track the timestamp of the last squat
  const cooldownTime = 1000; // Cooldown period in milliseconds

  const onPoseDetected = (pose) => {
    const leftHipY = pose[0]?.pose?.leftHip?.y;
    const leftKneeY = pose[0]?.pose?.leftKnee?.y;
    const leftAnkleY = pose[0]?.pose?.leftAnkle?.y;
    const minConfidence = 0.7;

    if (
      pose[0]?.pose?.leftHip?.confidence > minConfidence &&
      pose[0]?.pose?.leftKnee?.confidence > minConfidence &&
      pose[0]?.pose?.leftAnkle?.confidence > minConfidence
    ) {
      const verticalDistanceHipKnee = Math.abs(leftHipY - leftKneeY);
      const verticalDistanceKneeAnkle = Math.abs(leftKneeY - leftAnkleY);

      // Check for high knee position
      if (verticalDistanceHipKnee > 200) {
        setIsSquatting(false);
        setMessage('High Knee - Invalid Count');
        setStatus('improper');
        return;
      }

      // Check for half squat position
      if (verticalDistanceKneeAnkle > 200) {
        setIsSquatting(false);
        setMessage('Half Squat - Invalid Count');
        setStatus('improper');
        return;
      }

      const verticalDistance = Math.abs(leftHipY - leftAnkleY);

      if (verticalDistance < 300) {
        if (!isSquatting) {
          setIsSquatting(true);
          setStatus('proper');
          setMessage('');
          const currentTime = Date.now();
          // Check if cooldown period has passed since the last squat
          if (currentTime - lastSquatTimeRef.current > cooldownTime) {
            setNoOfSquats((prevNoOfSquats) => prevNoOfSquats + 1);
            lastSquatTimeRef.current = currentTime;
          }
        }
      } else {
        setIsSquatting(false);
        setStatus('unknown');
      }
    } else {
      setIsSquatting(false);
      setStatus('unknown');
    }
  };

  const onStart = () => {
    setIsStarted(true);
    setShowWelcomePage(false);
    setNoOfSquats(0);
    lastSquatTimeRef.current = 0; // Reset last squat time on start
  };

  const handleStop = () => {
    setIsStarted(false);
    setIsSquatting(false);
    setMessage('');
    setStatus('unknown');
  };

  return (
    <View style={{ flex: 1 }}>
      {showWelcomePage ? (
        <WelcomeToSquatSensor onStart={onStart} />
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
            No of Squats: {noOfSquats}
          </Text>
          {isSquatting && status !== 'unknown' && (
            <Text
              style={{
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: 70,
                color: status === 'proper' ? 'green' : 'red',
                fontWeight: 'bold',
              }}>
              {status}
            </Text>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Button title={isStarted ? 'Stop' : 'Start'} onPress={isStarted ? handleStop : onStart} />
          </View>
        </>
      )}
    </View>
  );
};

export default Squatsensor;
