import { 
    View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid 
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../../../configs/firebase';  // Ensure correct Firebase config import

const COLORS = {
    PRIMARY: '#000', 
    WHITE: '#fff',
    DARK: '#333', 
    GREY: '#808080'
};

const SignIn = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleSignIn = async () => {
        if (!email || !password) {
            ToastAndroid.show('Please enter all details', ToastAndroid.SHORT);
            return;
        }

        try {
            await signInWithEmailAndPassword(authentication, email, password)
            .then((userCredential)=>{
                const user=userCredential.user;
                router.replace('/mytrip')
                console.log(user);
                ToastAndroid.show('Signed in successfully!', ToastAndroid.SHORT);
                
            })
            
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                ToastAndroid.show('Email not found. Please sign up.', ToastAndroid.SHORT);
            } else if (error.code === 'auth/wrong-password') {
                ToastAndroid.show('Incorrect password. Try again.', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Error signing in. Please try again.', ToastAndroid.SHORT);
            }
        }
    };

    return (
        <View style={{ padding: 25, marginTop: 60 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Feather name="arrow-left-circle" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.heading}>Let's sign you in</Text>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.heading}>You have been missed</Text>

            <View style={{ marginTop: 30 }}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter Email" 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.passwordInput} 
                        placeholder="Enter Password" 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color={COLORS.GREY} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
                onPress={handleSignIn}
                style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => router.replace('auth/signup')}
                style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Bold',
        marginTop: 25,
        fontSize: 30
    },
    label: {
        fontFamily: 'Bold',
        fontSize: 18
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        color: COLORS.DARK,
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
        fontFamily: 'Bold'
    },
    outlineButton: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 30
    },
    outlineButtonText: {
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: 'Bold',
        fontSize: 20
    }
});

export default SignIn;
