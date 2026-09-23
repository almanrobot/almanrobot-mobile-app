import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { forgotPasswordUrl } from '@app/Data/EndPoint';

const ForgotPassword: React.FC = () => {
  const webviewRef = React.useRef<WebView | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webviewRef}
        source={{ uri: forgotPasswordUrl }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {},
});

export default ForgotPassword;
