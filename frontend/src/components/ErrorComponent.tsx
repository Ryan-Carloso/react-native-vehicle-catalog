import React from 'react';
import { Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BrandColors } from '@/src/theme/BrandColors';
import { API_BASE_URL } from '../utils/const';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorComponent = ({
  /**
   * Error message to display. Defaults to 'An error occurred. Please try again.'
   * @default 'An error occurred. Please try again.'
   */
  message = 'An error occurred. Please try again.',
  onRetry,
}: ErrorComponentProps) => {
  const handleContactSupport = () => {
    // NOTE: mockup email, in prod replace with real support email
    Linking.openURL('mailto:support@vehiclecatalog.com');
  };

  if (__DEV__ && !API_BASE_URL) {
    return <DevError />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{message}</Text>

        {onRetry && (
          <TouchableOpacity style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.linkButton} onPress={handleContactSupport}>
        <Text style={styles.linkText}>Contact Support</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const DevError = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <View style={styles.titleContainer}>
        <Text style={styles.devTitle}>Development Error</Text>
        <Text style={styles.devText}>
          Please make sure you have configured the .env file as described in the README.md.
        </Text>
      </View>
      <Text style={styles.devText}>Also, make sure that you have run</Text>
      <Text style={styles.devText}>`pnpm dev:backend`.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.background,
  },
  titleContainer: {
    marginBottom: 14,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: BrandColors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    color: BrandColors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  devTitle: {
    color: BrandColors.danger,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  devText: {
    color: BrandColors.textPrimary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  button: {
    backgroundColor: BrandColors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    padding: 8,
    backgroundColor: BrandColors.accent,
    borderRadius: 8,
    position: 'absolute',
    bottom: 50,
  },
  linkText: {
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
});
