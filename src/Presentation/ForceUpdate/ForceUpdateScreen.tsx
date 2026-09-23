import React, { useEffect, useState } from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { getVersion } from 'react-native-device-info';
import { Button, Modal, Portal } from 'react-native-paper';

import { forceUpdateUrl } from '@app/Data/EndPoint';

const ForceUpdateScreen: React.FC = () => {
  const appVersion = getVersion();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const response = await fetch(forceUpdateUrl);
        const data = await response.json();

        const version =
          Platform.OS === 'ios'
            ? data.version.versionIos
            : data.version.versionAndroid;

        if (appVersion < version) {
          setIsUpdateAvailable(true);
        }
      } catch (error) {
        console.error('Error checking update:', error);
        setIsUpdateAvailable(false);
      }
    };

    checkUpdate();
  }, [appVersion]);

  const handleForceUpdate = () => {
    const storeUrl =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/tr/app/alman-robot/id6452275129'
        : 'https://play.google.com/store/apps/details?id=com.softalika.almanrobot';

    Linking.openURL(storeUrl);
  };

  return (
    <>
      {isUpdateAvailable ? (
        <Portal>
          <Modal visible={true} onDismiss={() => {}}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Yeni Sürüm Mevcut!</Text>
              <Text style={styles.message}>
                Uygulamanın güncel bir versiyonu bulunmaktadır. Lütfen
                güncelleme yapınız.
              </Text>
              <Button
                mode="contained"
                onPress={() => handleForceUpdate()}
                style={styles.confirmButton}>
                Güncelle
              </Button>
            </View>
          </Modal>
        </Portal>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
  },
  confirmButton: {
    marginTop: 8,
  },
});

export default ForceUpdateScreen;
