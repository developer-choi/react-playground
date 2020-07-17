import React, {useEffect, useRef} from 'react';
import BasicContainer from '../../components/basic/BasicContainer';
import styled from 'styled-components/native';
import {Animated, StyleSheet, View} from 'react-native';

export default function SignUpSuccess() {

  // useReplaceScreen('EasySecurityNavigator', 3000);

  const sentences = [
      'An empty house A hole inside my heart \'Im all alone The rooms are getting smaller',
      'I wonder how I wonder why I wonder where they are The days we had',
      'The songs we sang together Oh yeah And all my love I\'m holding on forever Reaching for the love that seems so fa'
  ];

  const opacityValues2d = useRef(sentences.map(sentence => sentence.split('').map(() => new Animated.Value(0)))).current;

  useEffect(() => {

    const animations = Animated.sequence(opacityValues2d.map(opacityValues => (
        Animated.stagger(100, opacityValues.map(opacityValue => (
                Animated.timing(opacityValue, {
                  useNativeDriver: true,
                  duration: 1,
                  toValue: 1
                })
            ))
        ))));

    animations.start();

  }, []);

  return (
      <BasicContainer pageTitle="Welcome to SUWORLD">
        <InnerViewStyle>
          {sentences.map((sentence, sentenceIndex) => (
              <View key={`view-${sentenceIndex}`} style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'red', borderWidth: 1, marginBottom: 10}}>
                {sentence.split('').map((char, charIndex) => (
                    <Animated.Text key={`${sentenceIndex}-${charIndex}`} style={{opacity: opacityValues2d[sentenceIndex][charIndex]}}>{char}</Animated.Text>
                ))}
              </View>
          ))}
        </InnerViewStyle>
      </BasicContainer>
  );
}

const InnerViewStyle = styled.View`
  justify-content: flex-end;
`;

const styles = StyleSheet.create({
  lightgray: {
    color: 'lightgray'
  },
  displayNone: {
    opacity: 0
  }
});
