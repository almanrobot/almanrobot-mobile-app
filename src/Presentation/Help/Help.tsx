import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { helpPageUrl } from '@app/Data/EndPoint';

const Help: React.FC = () => {
  const webviewRef = React.useRef<WebView | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webviewRef}
        source={{ uri: helpPageUrl }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Help;
