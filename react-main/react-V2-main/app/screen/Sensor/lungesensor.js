import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, Button } from 'react-native';
import { WelcomeToLungeSensor } from './lungefront';
import Tts from 'react-native-tts';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export const Lungesensor = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [noOfLunges, setNoOfLunges] = useState(0);
  const [isLunging, setIsLunging] = useState(false);
  const [status, setStatus] = useState('unknown');
  const [voiceMessage, setVoiceMessage] = useState(null);
  const [hasAnnouncedKeypoints, setHasAnnouncedKeypoints] = useState(false);
  const [currentPose, setCurrentPose] = useState(null);
  const [lungeLimit, setLungeLimit] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const ttsTimeoutRef = useRef(null);

  const minConfidence = 0.5; // Pose detection confidence threshold
  const verticalThreshold = 300; // Vertical distance threshold for proper lunge detection
  const holdTime = 1000; // Time to hold the lunge
  const holdStartTimeRef = useRef(0);

  const checkKeypointsConfidence = (pose) => {
    const { leftHip, leftKnee, leftAnkle, rightHip, rightKnee, rightAnkle } = pose[0]?.pose;

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

    if (noOfLunges >= lungeLimit) return; // Stop further actions when lunge limit is reached

    setCurrentPose(pose);

    if (checkKeypointsConfidence(pose)) {
      const { leftHip, leftKnee, leftAnkle, rightHip, rightKnee, rightAnkle } = pose[0]?.pose;

      const verticalDistanceLeft = Math.abs(leftHip.y - leftAnkle.y);
      const verticalDistanceRight = Math.abs(rightHip.y - rightAnkle.y);

      if (verticalDistanceLeft < verticalThreshold && verticalDistanceRight < verticalThreshold) {
        if (!isLunging) {
          setIsLunging(true);
          setStatus('unknown');
          holdStartTimeRef.current = Date.now();
        } else {
          const holdDuration = Date.now() - holdStartTimeRef.current;
          if (holdDuration >= holdTime) {
            setIsLunging(false);
            setNoOfLunges((prevNoOfLunges) => {
              const newNoOfLunges = prevNoOfLunges + 1;
              if (newNoOfLunges >= lungeLimit) {
                Tts.stop(); // Stop any ongoing TTS before speaking the final message
              }
              return newNoOfLunges;
            });
            Tts.speak('You are now finished');
            setVoiceMessage('');
          }
        }
      } else if (isLunging) {
        setIsLunging(false);
        setStatus('improper');
      }

      if (!hasAnnouncedKeypoints && noOfLunges < lungeLimit) {
        handleVoice('All keypoints visible, you may start.');
        setHasAnnouncedKeypoints(true);
      }
    } else {
      setIsLunging(false);
      setStatus('unknown');
      if (noOfLunges < lungeLimit) {
        setVoiceMessage('Move back and center yourself in front of the camera.');
      }
      if (hasAnnouncedKeypoints) {
        setHasAnnouncedKeypoints(false);
      }
    }
  };

  const onStart = (level) => {
    setShowWelcomePage(false);
    switch (level) {
      case 'beginner':
        setLungeLimit(2);
        break;
      case 'intermediate':
        setLungeLimit(15);
        break;
      case 'experienced':
        setLungeLimit(20);
        break;
      default:
        setLungeLimit(5);
    }
  };

  const handleVoice = (ttsText) => {
    if (!isLunging && noOfLunges < lungeLimit) {
      Tts.speak(ttsText);
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
    setNoOfLunges(0);
    setIsLunging(false);
    setStatus('unknown');
    setVoiceMessage(null);
    setHasAnnouncedKeypoints(false);
    setCurrentPose(null);
    setLungeLimit(null);
    holdStartTimeRef.current = 0;

    clearTimeout(ttsTimeoutRef.current); // Clear any pending TTS timeout
    Tts.stop(); // Stop any ongoing TTS
    Tts.speak('Application has been reset. Please start again.');
  };

  useEffect(() => {
    if (voiceMessage && isFocused && noOfLunges < lungeLimit && !isLunging) {
      handleVoice(voiceMessage);
    }
  }, [voiceMessage, isFocused, noOfLunges, lungeLimit, isLunging]);

  useEffect(() => {
    if (noOfLunges >= lungeLimit) {
      clearTimeout(ttsTimeoutRef.current);
      Tts.stop(); // Stop any ongoing TTS immediately when lunge limit is reached
    }
  }, [noOfLunges, lungeLimit]);

  useEffect(() => {
    return () => {
      // Clean up: Stop TTS when component unmounts
      Tts.stop();
    };
  }, []);

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
              color: noOfLunges >= lungeLimit ? 'green' : 'black',
            }}>
            No of Lunges: {noOfLunges}
          </Text>
          {status === 'proper' && (
            <Text
              style={{
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: 70,
                color: 'green',
                fontWeight: 'bold',
              }}>
              Proper
            </Text>
          )}
          {status === 'improper' && (
            <Text
              style={{
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: 70,
                color: 'red',
                fontWeight: 'bold',
              }}>
              Improper
            </Text>
          )}

          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button title="Next Level" onPress={proceedToNextLevel} disabled={noOfLunges < lungeLimit} />
            <Button title="Reset" onPress={resetApp} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
          </View>
        </>
      )}
    </View>
  );
};

export default Lungesensor;
