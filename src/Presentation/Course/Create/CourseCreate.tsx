import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Button,
  FAB,
  MD3Theme,
  Modal,
  Portal,
  Provider,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { CourseType } from '@app/Models/course.model';

import CourseCreateViewModel from './CourseCreateViewModel';

const { storeData } = CourseCreateViewModel();

const CreateButton = ({ showModal, theme }: any) => (
  <FAB
    color={theme.colors.secondary}
    icon="plus"
    style={{
      backgroundColor: theme.colors.tertiaryContainer,
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    }}
    onPress={showModal}
  />
);

const InfoText = () => {
  const theme = useTheme();
  const bite = biteStyle(theme);
  return (
    <View style={bite.infocontainer}>
      <Text variant="headlineSmall">
        Kendi Robotunu Oluştur
        <Image
          source={require('@assets/robot/robot_peace.png')}
          style={{ height: 50, width: 50 }}
        />
      </Text>

      <Text style={{ paddingTop: 5 }} variant="bodyLarge">
        Sağ alttaki butona tıklayarak kendinize özel pratik yapabileceğiniz
        robot oluşturabilirsiniz.
      </Text>
    </View>
  );
};

const CreateModel = ({ visible, hideModal, courseTitle }: any) => {
  const theme = useTheme();
  const bite = biteStyle(theme);
  const [text, onChangeText] = React.useState('Useless Text');
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} style={bite.modelStyle}>
        <Text style={{ marginBottom: 10 }}>Kurs Başlığı ✏️</Text>
        <TextInput
          mode="outlined"
          style={bite.textInput}
          label="Ör: Benim Kursum"
          onChangeText={onChangeText}
        />
        <Button
          textColor={theme.colors.primary}
          onPress={() => courseTitle(text)}>
          Kaydet
        </Button>
      </Modal>
    </Portal>
  );
};

export const CourseCreate: React.FC = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  const theme = useTheme();
  const bite = biteStyle(theme);

  const showModal = () => {
    setVisible(true);
  };

  const goList = (type: CourseType) => {
    const routerTitle = type === 'userdraft' ? 'Taslaklarım' : 'Robotlarım';
    navigation.navigate('Course', {
      type: type,
      title: routerTitle,
    });
  };

  const courseTitle = (title: string) => {
    storeData(title);
    setVisible(false);
    goList('userdraft');
  };

  const hideModal = () => setVisible(false);
  return (
    <Provider>
      <CreateModel
        visible={visible}
        hideModal={hideModal}
        courseTitle={courseTitle}
      />
      <InfoText />
      <CreateButton showModal={() => showModal()} theme={theme} />
      <View style={{ marginTop: 20, marginRight: 15, marginLeft: 15 }}>
        <Button
          style={bite.buttons}
          buttonColor={theme.colors.secondaryContainer}
          // textColor={theme.colors.scrim}
          icon="file"
          mode="contained-tonal"
          onPress={() => goList('userdraft')}>
          Taslaklarım
        </Button>
        <Button
          style={bite.buttons}
          buttonColor={theme.colors.secondaryContainer}
          //textColor={theme.colors.scrim}
          icon="robot-love"
          mode="contained-tonal"
          onPress={
            () => goList('userserver')
            // auth && decodeAuth().role != 'user'
            //   ? goList('userserver')
            //   : setSnackbarVisible(true)
          }>
          Robotlarım
        </Button>
      </View>
      <Snackbar
        style={{ flex: 1, justifyContent: 'space-between' }}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}>
        Üyelik Gerekli
      </Snackbar>
    </Provider>
  );
};

const biteStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    buttons: {
      marginBottom: 15,
      padding: 5,
    },
    textInput: {
      height: 50,
      width: 250,
    },
    modelStyle: {
      marginTop: 100,
      marginBottom: 100,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 20,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.colors.background,
    },
    infocontainer: {
      padding: 10,
      alignSelf: 'center',
    },
  });
