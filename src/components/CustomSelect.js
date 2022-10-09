import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from 'src/utils/colors';
import Modal from 'react-native-modal';
import CustomCheckbox from './CustomCheckbox';
import {DEVICE_HEIGHT} from 'src/utils/helper';
import CustomInput from './CustomInput';
const CustomSelect = ({error, data, selected, onChange}) => {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <View>
        <CustomInput
          onPress={() => setVisible(prev => !prev)}
          value={selected?.title ?? ''}
          placeholder={'Select Contact Type'}
          editable={false}
          isTouchable={true}
          error={error}
        />
      </View>
      <Modal
        isVisible={visible}
        hasBackdrop
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={{marginBottom: 0, justifyContent: 'flex-end'}}>
        <View
          style={{
            minHeight: 200,
            backgroundColor: colors.appGray1,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            padding: 10,
          }}>
          <View
            style={{
              width: 100,
              height: 2,
              alignSelf: 'center',
              marginVertical: 15,
              backgroundColor: colors.appGray,
            }}
          />
          <View>
            {data?.map((item, index) => {
              return (
                <CustomCheckbox
                  key={index?.toString()}
                  checked={selected?.value === item.value}
                  onChange={value => {
                    onChange(item);
                    onClose();
                  }}
                  title={item.title}
                />
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({});
