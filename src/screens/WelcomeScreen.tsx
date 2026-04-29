import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.welcomeTitle}>Welcome to</Text>
        <Text style={styles.welcomeSubtitle}>PixelGallery</Text>
        <Text style={styles.welcomeText}>Your beautifully vibrant creative journey begins here.</Text>
        <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('Register' as never)}>
          <Text style={styles.exploreButtonText}>Back to Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f0', // Light warm background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    color: '#636e72',
    marginBottom: 4,
    fontWeight: '500',
  },
  welcomeSubtitle: {
    fontSize: 46,
    fontWeight: '900',
    color: '#ff6b6b', // Prominent eye-catching coral matching the register screen
    marginBottom: 16,
    textShadowColor: 'rgba(255, 107, 107, 0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 17,
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: '#1a1a1a', // High contrast button
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default WelcomeScreen;
