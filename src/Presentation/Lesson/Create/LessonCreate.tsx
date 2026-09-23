import { AuthContext } from '@app/AuthContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Snackbar } from 'react-native-paper';

import { DialogInputComponent } from './components/DialogInput.component';
import { LessonCreateRobotDialog } from '@app/Models/lesson.model';

import LessonCreateViewModel from './LessonCreateViewModel';

const defaultDialog: LessonCreateRobotDialog = {
  dialogs: [
    {
      key: '',
      key_tr: '',
      value: '',
      value_tr: '',
    },
  ],
};

export const LessonCreate: React.FC = ({ route, navigation }: any) => {
  const { storeLesson, getLesson, sendServer, deleteLesson } =
    LessonCreateViewModel();
  const { auth }: any = useContext(AuthContext);
  const [draftValues, setDraftValues] = useState<LessonCreateRobotDialog>();
  const scrollRef = useRef<any>();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  useEffect(() => {
    getLesson(route.params.name)
      .then(res => {
        setDraftValues(res);
        reset(res);
      })
      .catch(err => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endOfDraft = async (key: string, token: any) => {
    const warn = await endOfDraftWarning();
    if (warn) {
      const waitServer = await sendServer(key, token);
      if (waitServer.error) {
        setSnackbarMessage(waitServer.error);
        setSnackbarVisible(true);
      } else {
        await deleteLesson(key);
        navigation.navigate('Course', {
          type: 'userserver',
        });
      }
    }
  };

  const endOfDraftWarning = async (): Promise<boolean> =>
    new Promise(resolve => {
      Alert.alert(
        'Bitir',
        'Taslak verileriniz silinip robot haline dönüştürülecek.',
        [
          {
            text: 'Dönüştür',
            onPress: () => resolve(true),
          },
          {
            text: 'Düzenle',
            onPress: () => resolve(false),
            style: 'cancel',
          },
        ],
      );
    });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonCreateRobotDialog>({
    defaultValues: draftValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: 'dialogs',
    control,
    rules: {
      required: 'Lütfen en az bir diyalog ekleyin.',
    },
  });

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }>
        {fields.map((field, index) => {
          return (
            <View key={field.id}>
              <DialogInputComponent
                control={control}
                index={index}
                errors={errors}
                dialog="key"
                icon="robot-happy-outline"
                label="Robot 🇩🇪"
              />
              <DialogInputComponent
                control={control}
                index={index}
                errors={errors}
                dialog="key_tr"
                icon="robot-outline"
                label="Robot 🇹🇷"
              />
              <DialogInputComponent
                control={control}
                index={index}
                errors={errors}
                dialog="value"
                icon="face-agent"
                label="Sen 🇩🇪"
              />
              <DialogInputComponent
                control={control}
                index={index}
                errors={errors}
                dialog="value_tr"
                icon="face-man"
                label="Sen 🇹🇷"
              />
              <Button
                style={bite.deleteButton}
                icon="delete"
                mode="contained-tonal"
                onPress={() => remove(index)}>
                Sil
              </Button>
            </View>
          );
        })}
      </ScrollView>

      <HelperText
        style={bite.helperInfo}
        type="info"
        visible={errors.dialogs?.root?.message != null}>
        {errors.dialogs?.root?.message}
      </HelperText>

      <View style={bite.snackbar}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}>
          {snackbarMessage}
        </Snackbar>
      </View>

      {/* ---------------------------------------------------- */}
      <View style={bite.buttonArea}>
        <Button
          icon="plus"
          mode="elevated"
          onPress={() => append(defaultDialog.dialogs)}>
          Diyalog
        </Button>
        <Button
          icon="content-save-check"
          mode="elevated"
          onPress={handleSubmit(data => {
            storeLesson(route.params.name, data);
            setSnackbarMessage('Taslak olarak kaydedildi.');
            setSnackbarVisible(true);
          })}>
          Kaydet
        </Button>
        <Button
          icon="check-all"
          mode="elevated"
          onPress={() => endOfDraft(route.params.name, auth)}>
          Bitir
        </Button>
      </View>
    </>
  );
};

const bite = StyleSheet.create({
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },
  deleteButton: {
    width: 100,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 7,
  },
  helperInfo: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
  },
  snackbar: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
