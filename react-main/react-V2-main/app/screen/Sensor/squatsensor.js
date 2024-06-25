import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, Button } from 'react-native';
import { WelcomeToSquatSensor } from './squatfront';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export const Squatsensor = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [noOfSquats, setNoOfSquats] = useState(0);
  const [isSquatting, setIsSquatting] = useState(false);
  const [holdingSquat, setHoldingSquat] = useState(false);
  const [status, setStatus] = useState('unknown');
  const [intervalId, setIntervalId] = useState(null);
  const [hasAnnouncedKeypoints, setHasAnnouncedKeypoints] = useState(false);
  const [keypointIntervalId, setKeypointIntervalId] = useState(null);
  const [currentPose, setCurrentPose] = useState(null);
  const [squatLimit, setSquatLimit] = useState(null);
  const [keypointsVisible, setKeypointsVisible] = useState(true);
  const [startMessageVisible, setStartMessageVisible] = useState(false); // New state variable

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const holdStartTimeRef = useRef(0);
  const lastSquatTimeRef = useRef(0);
  const holdTime = 1000; // Adjust as needed
  const cooldownTime = 1000; // Adjust as needed

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

  const checkKeypointsConfidence = (pose) => {
    const leftHip = pose[0]?.pose?.leftHip;
    const leftKnee = pose[0]?.pose?.leftKnee;
    const leftAnkle = pose[0]?.pose?.leftAnkle;

    const rightHip = pose[0]?.pose?.rightHip;
    const rightKnee = pose[0]?.pose?.rightKnee;
    const rightAnkle = pose[0]?.pose?.rightAnkle;

    const minConfidence = 0.7;

    if (
      leftHip?.confidence > minConfidence &&
      leftKnee?.confidence > minConfidence &&
      leftAnkle?.confidence > minConfidence &&
      rightHip?.confidence > minConfidence &&
      rightKnee?.confidence > minConfidence &&
      rightAnkle?.confidence > minConfidence
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onPoseDetected = (pose) => {
    if (!isFocused) return; // Prevent updates if not focused

    if (noOfSquats >= squatLimit) return; // Stop further actions when squat limit is reached

    setCurrentPose(pose);

    const keypointsAreVisible = checkKeypointsConfidence(pose);
    setKeypointsVisible(keypointsAreVisible);

    if (keypointsAreVisible) {
      const leftHip = pose[0]?.pose?.leftHip;
      const leftKnee = pose[0]?.pose?.leftKnee;
      const leftAnkle = pose[0]?.pose?.leftAnkle;

      const rightHip = pose[0]?.pose?.rightHip;
      const rightKnee = pose[0]?.pose?.rightKnee;
      const rightAnkle = pose[0]?.pose?.rightAnkle;

      const leftHipY = leftHip?.y || 0;
      const leftKneeY = leftKnee?.y || 0;
      const leftAnkleY = leftAnkle?.y || 0;
      const rightHipY = rightHip?.y || 0;
      const rightKneeY = rightKnee?.y || 0;
      const rightAnkleY = rightAnkle?.y || 0;

      const verticalDistanceHipKnee = Math.abs(leftHipY - leftKneeY);
      const verticalDistanceKneeAnkle = Math.abs(leftKneeY - leftAnkleY);

      if (verticalDistanceHipKnee > 200 || verticalDistanceKneeAnkle > 200) {
        if (isSquatting) {
          setIsSquatting(false);
          setHoldingSquat(false); // Ensure holdingSquat is false
          setStatus('improper');
        } else {
          setStatus('unknown'); // Set to 'unknown' if just standing
        }
        return;
      }

      const verticalDistance = Math.abs(leftHipY - leftAnkleY);

      if (verticalDistance < 300) {
        if (!isSquatting) {
          setIsSquatting(true);
          holdStartTimeRef.current = Date.now();
        } else {
          const holdDuration = Date.now() - holdStartTimeRef.current;
          if (holdDuration >= holdTime && !holdingSquat) {
            setHoldingSquat(true);
            const currentTime = Date.now();
            if (currentTime - lastSquatTimeRef.current > cooldownTime) {
              setNoOfSquats((prevNoOfSquats) => {
                const newNoOfSquats = prevNoOfSquats + 1;
                if (newNoOfSquats >= squatLimit) {
                  clearInterval(intervalId);
                  clearInterval(keypointIntervalId);
                }
                setStatus('proper'); // Set status to 'proper' when a squat is counted
                return newNoOfSquats;
              });
              lastSquatTimeRef.current = currentTime;
            }
          }
        }
      } else {
        if (isSquatting) {
          setIsSquatting(false);
          setHoldingSquat(false); // Ensure holdingSquat is false
          setTimeout(() => {
            setStatus('improper'); // Update status to 'improper' if squat hold is not met, with delay
          }, 500); // 1-second delay
        } else {
          setStatus('unknown'); // Set to 'unknown' if just standing
        }
      }

      if (!hasAnnouncedKeypoints && noOfSquats === 0) {
        setHasAnnouncedKeypoints(true);
        setStartMessageVisible(true); // Show the start message
        setTimeout(() => setStartMessageVisible(false), 3000); // Hide the message after 3 seconds
      }
    } else {
      setIsSquatting(false);
      setHoldingSquat(false); // Ensure holdingSquat is false
      setStatus('unknown');
      if (hasAnnouncedKeypoints) {
        setHasAnnouncedKeypoints(false);
      }
    }
  };

  const onStart = (level) => {
    setShowWelcomePage(false);
    switch (level) {
      case 'beginner':
        setSquatLimit(5);
        break;
      case 'intermediate':
        setSquatLimit(15);
        break;
      case 'experienced':
        setSquatLimit(20);
        break;
      default:
        setSquatLimit(5);
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
        return; // No next level
    }
    onStart(nextLevel);
  };

  const resetApp = () => {
    setShowWelcomePage(true);
    setNoOfSquats(0);
    setIsSquatting(false);
    setHoldingSquat(false);
    setStatus('unknown');
    setHasAnnouncedKeypoints(false);
    setCurrentPose(null);
    setSquatLimit(null);
    setKeypointsVisible(true); // Reset keypoints visibility
    setStartMessageVisible(false); // Hide the start message
    holdStartTimeRef.current = 0;
    lastSquatTimeRef.current = 0;

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (keypointIntervalId) {
      clearInterval(keypointIntervalId);
      setKeypointIntervalId(null);
    }
  };

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [isFocused, noOfSquats, squatLimit]);

  useEffect(() => {
    if (!showWelcomePage) {
      const id = setInterval(() => {
        if (currentPose && checkKeypointsConfidence(currentPose)) {
          setStatus('proper');
        } else {
          setStatus('improper');
        }
      }, 3000);

      setKeypointIntervalId(id);

      return () => {
        if (id) {
          clearInterval(id);
        }
      };
    }
  }, [showWelcomePage, currentPose]);

  useEffect(() => {
    return () => {
      // Clear all intervals
      if (intervalId) clearInterval(intervalId);
      if (keypointIntervalId) clearInterval(keypointIntervalId);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showWelcomePage ? (
        <WelcomeToSquatSensor onStart={onStart} />
      ) : (
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: status === 'proper' ? 'green' : 'red',
              fontWeight: 'bold',
              marginVertical: 20,
            }}>
            {startMessageVisible ? 'You may start now' : keypointsVisible ? (status === 'proper' ? 'Proper' : status === 'improper' ? 'Improper' : '') : 'Move back and center yourself'}
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
            No of Squats: {noOfSquats}
          </Text>
          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button title="Next Level" onPress={proceedToNextLevel} disabled={noOfSquats < squatLimit} />
            <Button title="Reset" onPress={resetApp} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
          </View>
        </>
      )}
    </View>
  );
};

export default Squatsensor;
