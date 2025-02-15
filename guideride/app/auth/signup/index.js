import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { authentication } from '../../../configs/firebase';

const COLORS = {
  PRIMARY: '#000',
  WHITE: '#fff',
  DARK: '#333',
  GREY: '#808080',
  RED: '#FF0000',
  GREEN: '#008000',
};

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate full name (No numbers allowed)
  const isValidFullName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Weak';
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
      return 'Strong';
    } else {
      return 'Medium';
    }
  };

  // On account creation
  const OnCreateAccount = async () => {
    if (!email || !password || !fullname) {
      ToastAndroid.show('Please enter all details', ToastAndroid.SHORT);
      return;
    }

    if (!isValidEmail(email)) {
      ToastAndroid.show('Invalid email format', ToastAndroid.SHORT);
      return;
    }

    if (!isValidFullName(fullname)) {
      ToastAndroid.show('Full name should not contain numbers', ToastAndroid.SHORT);
      return;
    }

    try {
      // Check if email already exists using fetchSignInMethodsForEmail
      const methods = await fetchSignInMethodsForEmail(authentication, email);
      if (methods.length > 0) {
        // If methods array is not empty, email already exists
        ToastAndroid.show(
          'Email already exists. Please sign in or create a new account.',
          ToastAndroid.LONG
        );
        return; // Exit the function if the email exists
      }

      // If email does not exist, create the user
      createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
          ToastAndroid.show('Account created successfully!', ToastAndroid.SHORT);
          console.log('User created:', userCredential.user);
        })
        .catch((error) => {
          console.log(error.message, error.code);
          ToastAndroid.show('Error creating account. Please try again.', ToastAndroid.SHORT);
        });

    } catch (error) {
      console.error("Error checking email:", error);
      ToastAndroid.show('Error checking email. Please try again later.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 50 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left-circle" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontSize: 30, fontFamily: 'Bold', textAlign: 'center' }}>
        Create New Account
      </Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Bold' }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full Name"
          value={fullname}
          onChangeText={setFullName}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Bold' }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Bold' }}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordStrength(checkPasswordStrength(text));
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color={COLORS.GREY} />
          </TouchableOpacity>
        </View>
        {password.length > 0 && (
          <Text style={{ color: passwordStrength === 'Strong' ? COLORS.GREEN : COLORS.RED }}>
            Password Strength: {passwordStrength}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={OnCreateAccount}
        style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('auth/signin')}
        style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    color: COLORS.DARK,
    fontFamily: 'Bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Bold',
  },
  button: {
    marginTop: 30,
    padding: 20,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 15,
  },
  buttonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Bold',
  },
  outlineButton: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 30,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Bold',
  },
});

export default SignUp;
