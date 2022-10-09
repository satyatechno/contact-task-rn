import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from 'src/components/CustomInput';
import CustomCheckbox from 'src/components/CustomCheckbox';
import CustomButton from 'src/components/CustomButton';
import CustomSelect from 'src/components/CustomSelect';
import {launchImageLibrary} from 'react-native-image-picker';

import {db, storage} from 'src/firebase';
import colors from 'src/utils/colors';
import {DEVICE_WIDTH} from 'src/utils/helper';

const AddContact = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [image, setImage] = useState({});

  const openImagePick = async () => {
    let options = {};

    const result = await launchImageLibrary(options);
    console.log('image', result);
    setImage(result?.assets?.[0]);
  };

  const validate = () => {
    let nameError = '';
    let phoneError = '';
    let typeError = '';

    if (!name?.trim()) {
      nameError = 'Required.';
    }
    if (!phone?.trim()) {
      phoneError = 'Required.';
    } else if (phone?.length < 9 || phone?.length > 15) {
      phoneError = 'Invailid Phone Number.';
    }
    if (!type?.value) {
      typeError = 'Required.';
    }
    setError({
      name: nameError,
      phone: phoneError,
      type: typeError,
    });
    if (nameError.length || phoneError.length || typeError.length) {
      return false;
    } else return true;
  };

  const onAddContact = async () => {
    try {
      const isValid = validate();
      if (isValid) {
        setLoading(true);
        let imageUrl = '';
        if (image?.uri) {
          const imgRef = storage.ref(image?.fileName);
          const imageUploadRes = await imgRef.putFile(image?.uri);
          console.log('first', imageUploadRes);
          imageUrl = await storage.ref(image?.fileName).getDownloadURL();
        }

        const newReference = db.ref('/contacts').push();
        newReference
          .set({
            id: newReference.key,
            name: name,
            phone: phone,
            isWhatsApp: isWhatsApp,
            type: type?.value,
            image: imageUrl,
          })
          .then(() => {
            setName('');
            setPhone('');
            setIsWhatsApp(false);
            setType(false);
            setImage({});
            navigation?.navigate('Home', {flag: new Date().getTime()});
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (e) {
      console.log('error catch', e);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        value={name}
        placeholder={'Name'}
        onChangeText={text => {
          setName(text);
        }}
        error={error?.name}
      />
      <CustomInput
        value={phone}
        placeholder={'Phone'}
        onChangeText={text => {
          setPhone(text);
        }}
        error={error?.phone}
        keyboardType="number-pad"
      />
      <CustomSelect
        isVisible={visible}
        data={[
          {
            title: 'Personal',
            value: 1,
          },
          {
            title: 'Office',
            value: 2,
          },
        ]}
        selected={type}
        onClose={() => setVisible(false)}
        onChange={value => setType(value)}
        error={error?.type}
      />
      <CustomCheckbox
        title={'Is this available on WhatsApp?'}
        checked={isWhatsApp}
        onChange={value => setIsWhatsApp(value)}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {image?.uri ? (
          <Image
            source={{uri: image?.uri}}
            style={{height: 70, width: 70, marginEnd: 12}}
          />
        ) : null}
        <CustomButton
          style={{
            width: image.uri ? DEVICE_WIDTH * 0.7 : DEVICE_WIDTH - 20,
          }}
          type={2}
          title="Select Picture"
          onPress={openImagePick}
        />
      </View>
      <CustomButton
        isLoading={loading}
        type={1}
        title="Add Contact"
        onPress={onAddContact}
      />
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.defaultWhite,
  },
});
