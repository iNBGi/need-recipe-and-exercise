import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, Button } from 'react-native';
import { WelcomeToDumbellSensor } from './dumbellfront';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export const Dumbellsensor = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [noOfCurls, setNoOfCurls] = useState(0);
  const [status, setStatus] = useState('unknown');
  const [hasAnnouncedKeypoints, setHasAnnouncedKeypoints] = useState(false);
  const [keypointsVisible, setKeypointsVisible] = useState(true);
  const [startMessageVisible, setStartMessageVisible] = useState(false);
  const [improperStatusVisible, setImproperStatusVisible] = useState(false);
  const [curlLimit, setCurlLimit] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('beginner');

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const holdStartTimeRef = useRef(0);
  const holdTime = 1000; // Hold position for 1 second

  const checkKeypointsConfidence = (pose) => {
    const leftShoulder = pose[0]?.pose?.leftShoulder;
    const leftElbow = pose[0]?.pose?.leftElbow;
    const leftWrist = pose[0]?.pose?.leftWrist;

    const rightShoulder = pose[0]?.pose?.rightShoulder;
    const rightElbow = pose[0]?.pose?.rightElbow;
    const rightWrist = pose[0]?.pose?.rightWrist;

    const minConfidence = 0.7;

    if (
      leftShoulder?.confidence > minConfidence &&
      leftElbow?.confidence > minConfidence &&
      leftWrist?.confidence > minConfidence &&
      rightShoulder?.confidence > minConfidence &&
      rightElbow?.confidence > minConfidence &&
      rightWrist?.confidence > minConfidence
    ) {
      return true;
    } else {
      return false;
    }
  };

  const calculateAngle = (joint1, joint2, joint3) => {
    const radians =
      Math.atan2(joint3.y - joint2.y, joint3.x - joint2.x) -
      Math.atan2(joint1.y - joint2.y, joint1.x - joint2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

    if (angle > 180) {
      angle = 360 - angle;
    }

    return angle;
  };

  const onPoseDetected = (pose) => {
    if (!isFocused) return;
    if (noOfCurls >= curlLimit) return;

    const keypointsAreVisible = checkKeypointsConfidence(pose);
    setKeypointsVisible(keypointsAreVisible);

    if (keypointsAreVisible) {
      const leftShoulder = pose[0]?.pose?.leftShoulder;
      const leftElbow = pose[0]?.pose?.leftElbow;
      const leftWrist = pose[0]?.pose?.leftWrist;

      const rightShoulder = pose[0]?.pose?.rightShoulder;
      const rightElbow = pose[0]?.pose?.rightElbow;
      const rightWrist = pose[0]?.pose?.rightWrist;

      const leftElbowWristAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      const rightElbowWristAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

      const leftWristGoingUp = leftWrist.y < leftElbow.y;
      const rightWristGoingUp = rightWrist.y < rightElbow.y;

      if (leftWristGoingUp && rightWristGoingUp) {
        const holdDuration = Date.now() - holdStartTimeRef.current;
        if (holdStartTimeRef.current === 0) {
          holdStartTimeRef.current = Date.now();
        } else if (holdDuration >= holdTime) {
          setImproperStatusVisible(false);
          setStatus('proper');
          setNoOfCurls((prevNoOfCurls) => {
            const newNoOfCurls = prevNoOfCurls + 1;
            if (newNoOfCurls >= curlLimit) {
              holdStartTimeRef.current = 0;
            }
            return newNoOfCurls;
          });
          holdStartTimeRef.current = 0; // Reset hold start time
        } else {
          setImproperStatusVisible(true);
          setStatus('improper');
        }
      } else {
        holdStartTimeRef.current = 0; // Reset hold start time if wrist is not going up
        setImproperStatusVisible(true);
        setStatus('improper');
      }

      if (!hasAnnouncedKeypoints && noOfCurls === 0) {
        setHasAnnouncedKeypoints(true);
        setStartMessageVisible(true);
        setTimeout(() => setStartMessageVisible(false), 3000);
      }
    } else {
      holdStartTimeRef.current = 0; // Reset hold start time if keypoints are not visible
      setStatus('unknown');
      if (hasAnnouncedKeypoints) {
        setHasAnnouncedKeypoints(false);
      }
    }
  };

  const onStart = (level) => {
    setShowWelcomePage(false);
    setCurrentLevel(level);
    switch (level) {
      case 'beginner':
        setCurlLimit(5);
        break;
      case 'intermediate':
        setCurlLimit(15);
        break;
      case 'experienced':
        setCurlLimit(20);
        break;
      default:
        setCurlLimit(10);
    }
  };

  const proceedToNextLevel = () => {
    let nextLevel;
    switch (currentLevel) {
      case 'beginner':
        nextLevel = 'intermediate';
        break;
      case 'intermediate':
        nextLevel = 'experienced';
        break;
      default:
        return;
    }
    onStart(nextLevel);
    setNoOfCurls(0);
    setStatus('unknown');
    setHasAnnouncedKeypoints(false);
    setKeypointsVisible(true);
    setStartMessageVisible(false);
    setImproperStatusVisible(false);
    holdStartTimeRef.current = 0;
  };

  const resetApp = () => {
    setShowWelcomePage(true);
    setNoOfCurls(0);
    setStatus('unknown');
    setHasAnnouncedKeypoints(false);
    setCurlLimit(null);
    setKeypointsVisible(true);
    setStartMessageVisible(false);
    setImproperStatusVisible(false);
    holdStartTimeRef.current = 0;
  };

  useEffect(() => {
    if (!showWelcomePage) {
      const id = setInterval(() => {
        if (keypointsVisible && status === 'proper') {
          setStatus('proper');
        } else {
          setStatus('improper');
        }
      }, 3000);

      return () => {
        if (id) {
          clearInterval(id);
        }
      };
    }
  }, [showWelcomePage, keypointsVisible, status]);

  return (
    <View style={{ flex: 1 }}>
      {showWelcomePage ? (
        <WelcomeToDumbellSensor onStart={onStart} />
      ) : (
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color:
                startMessageVisible
                  ? 'green'
                  : status === 'proper'
                  ? 'green'
                  : 'red',
              fontWeight: 'bold',
              marginVertical: 20,
            }}>
            {noOfCurls >= curlLimit
              ? 'You are now finished'
              : startMessageVisible
              ? 'You may start now'
              : keypointsVisible
              ? status === 'proper'
                ? 'Proper'
                : status === 'improper'
                ? 'Improper'
                : ''
              : 'Move back and center yourself'}
          </Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <HumanPose
              height={500}
              width={400}
              enableKeyPoints={true}
              enableSkeleton={true}
              flipHorizontal={false}
              isBackCamera={false}
              color={'0, 255, 0'}
              mode={'single'}
              onPoseDetected={onPoseDetected}
            />
          </View>
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
            {noOfCurls >= curlLimit ? `Current Level: ${currentLevel}` : `No of Curls: ${noOfCurls}`}
          </Text>
          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button title="Next Level" onPress={proceedToNextLevel} disabled={noOfCurls < curlLimit} />
            <Button title="Reset" onPress={resetApp} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
          </View>
        </>
      )}
    </View>
  );
};

export default Dumbellsensor;
