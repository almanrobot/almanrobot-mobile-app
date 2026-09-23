import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const emptyErrorMessage: string = 'Neden burası boş? 🤔';

export const DialogInputComponent = ({
  control,
  index,
  errors,
  dialog,
  icon,
  label,
}: any) => {
  let controllerName = `dialogs.${index}.${dialog}`;
  let visibleController =
    errors.dialogs != null && errors.dialogs[index]?.[dialog] != null;
  return (
    <>
      <Controller
        control={control}
        name={controllerName}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={bite.textInput}
            label={label}
            onBlur={onBlur}
            onChangeText={(text: string) => onChange(text)}
            value={value}
            left={<TextInput.Icon icon={icon} size={32} />}
          />
        )}
      />
      {visibleController ? (
        <HelperText type="error" visible={visibleController}>
          {emptyErrorMessage}
        </HelperText>
      ) : null}
    </>
  );
};

const bite = StyleSheet.create({
  textInput: {
    marginBottom: 3,
  },
});
