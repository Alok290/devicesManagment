import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Eye, EyeOff, Clover, ShieldCheck, Users } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (email && password) {
            login(selectedRole);
        } else {
            // For demo purposes, allow login without credentials if just testing UI
            login(selectedRole);
        }
    };

    // Floral Pattern Background Component
    const FloralBackground = () => (
        <View style={styles.floralContainer}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Abstract floral shapes approximating the image */}
                <Circle cx="20" cy="20" r="30" fill="rgba(255,255,255,0.05)" />
                <Circle cx="80" cy="80" r="40" fill="rgba(255,255,255,0.05)" />
                <Path
                    d="M0,100 Q30,60 60,80 T100,60 V100 H0 Z"
                    fill="rgba(255,255,255,0.03)"
                />
                <Path
                    d="M60,100 Q70,70 90,80"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="none"
                />
                {/* Leaf shapes */}
                <Path d="M70,70 Q80,60 90,70 Q80,80 70,70" fill="rgba(255,255,255,0.1)" />
                <Path d="M75,60 Q85,50 95,60 Q85,70 75,60" fill="rgba(255,255,255,0.1)" />
            </Svg>
        </View>
    );

    const renderRoleSelection = () => (
        <View style={styles.roleContainer}>
            <View style={styles.headerSection}>
                <FloralBackground />
                <View style={styles.logoContainer}>
                    <Clover size={40} color={COLORS.white} />
                </View>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.subWelcomeText}>Select your role to continue</Text>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.roleCardsContainer}>
                    <TouchableOpacity
                        style={styles.roleCard}
                        onPress={() => setSelectedRole('manager')}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
                            <ShieldCheck size={32} color={COLORS.loginGreen} />
                        </View>
                        <Text style={styles.roleTitle}>Manager</Text>
                        <Text style={styles.roleDesc}>Full Access</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.roleCard}
                        onPress={() => setSelectedRole('team_member')}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
                            <Users size={32} color="#1976D2" />
                        </View>
                        <Text style={styles.roleTitle}>Team Member</Text>
                        <Text style={styles.roleDesc}>Restricted Access</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderLoginForm = () => (
        <View style={styles.formContainer}>
            <View style={styles.headerSection}>
                <FloralBackground />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setSelectedRole(null)}
                >
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Clover size={40} color={COLORS.white} />
                </View>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.subWelcomeText}>Sign in to continue</Text>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        placeholderTextColor={COLORS.gray}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.gray}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeOff size={20} color={COLORS.gray} />
                            ) : (
                                <Eye size={20} color={COLORS.gray} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.footerLinks}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.loginGreen} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {!selectedRole ? renderRoleSelection() : renderLoginForm()}
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    floralContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    headerSection: {
        height: height * 0.4,
        backgroundColor: COLORS.loginGreen,
        padding: SIZES.extraLarge,
        justifyContent: 'center',
        position: 'relative',
    },
    bottomSection: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        padding: SIZES.extraLarge,
        paddingTop: SIZES.extraLarge * 2,
    },
    logoContainer: {
        marginBottom: SIZES.medium,
    },
    welcomeText: {
        fontSize: 36,
        fontFamily: FONTS.title,
        color: COLORS.white,
        marginBottom: SIZES.base,
    },
    subWelcomeText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.regular,
        color: 'rgba(255,255,255,0.8)',
    },
    roleContainer: {
        flex: 1,
    },
    roleCardsContainer: {
        gap: SIZES.medium,
    },
    roleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        ...SHADOWS.light,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    roleTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        flex: 1,
    },
    roleDesc: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
    },
    formContainer: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: SIZES.extraLarge * 2,
        left: SIZES.extraLarge,
        zIndex: 10,
    },
    backText: {
        color: COLORS.white,
        fontSize: 30,
        fontFamily: FONTS.bold,
    },
    inputGroup: {
        marginBottom: SIZES.large,
    },
    label: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.loginGreen,
        marginBottom: SIZES.base,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.small,
        padding: SIZES.medium,
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.secondary,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.small,
        paddingHorizontal: SIZES.medium,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: SIZES.medium,
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.secondary,
    },
    loginButton: {
        backgroundColor: COLORS.loginGreen,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        alignItems: 'center',
        marginTop: SIZES.medium,
        ...SHADOWS.medium,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.extraLarge * 2,
    },
    linkText: {
        color: COLORS.loginGreen,
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
