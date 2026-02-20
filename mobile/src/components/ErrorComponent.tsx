import React from 'react';
import { Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BrandColors } from '@/src/theme/BrandColors';

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

  if (__DEV__) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.devTitle}>Development Error</Text>
          <Text style={styles.devText}>Please confirm if you run pnpm dev:backend</Text>
          {onRetry && (
            <TouchableOpacity style={styles.button} onPress={onRetry}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
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

        <TouchableOpacity style={styles.linkButton} onPress={handleContactSupport}>
          <Text style={styles.linkText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.background,
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
    marginBottom: 24,
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
  },
  linkText: {
    color: BrandColors.accent,
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
