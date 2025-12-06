export const COLORS = {
    primary: '#205047', // Updated to Green from Login Image
    secondary: '#2E3A59', // Original secondary
    accent: '#FFD166',
    background: '#F6F6F6',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#CCCCCC',
    lightGray: '#E5E5E5',
    darkGray: '#555555',
    text: '#2E3A59',
    success: '#4CAF50',
    error: '#F44336',

    // New Design Colors
    loginGreen: '#205047', // Deep green from login image
    loginButton: '#205047',
    dashboardPurple: '#7B6FE7', // Purple from dashboard card
    cardBg: '#FFFFFF',
    iconBg: '#F5F5F5',

    // Status Colors
    stockIn: '#E8F5E9',
    stockInText: '#2E7D32',
    outOfStock: '#FFEBEE',
    outOfStockText: '#C62828',
    lowStock: '#FFF8E1',
    lowStockText: '#F9A825',
};

export const FONTS = {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
    title: 'Montserrat-Bold',
};

export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
    title: 32,
    xxl: 40,
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.27,
        elevation: 5,
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    }
};
