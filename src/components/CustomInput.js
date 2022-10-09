import React, {forwardRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from 'src/utils/colors';
import {DEVICE_WIDTH, findHeight, findSize} from 'src/utils/helper';
// import CountryPicker from 'react-native-country-picker-modal';
const CustomInput = forwardRef(
  (
    {
      containerStyle,
      onChangeText,
      value,
      inputStyle,
      title,
      titleStyle,
      placeholder,
      keyboardType,
      error,
      errorStyle,
      mainContainerStyle,

      isTouchable = false,
      onPress = () => {},
      editable = true,

      placeholderTextColor,
      ...rest
    },
    ref,
  ) => {
    return (
      <View style={mainContainerStyle}>
        {title ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          activeOpacity={1}
          disabled={!isTouchable}
          onPress={onPress}
          style={[styles.container, containerStyle]}>
          {editable ? (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChangeText}
              style={[styles.input, inputStyle]}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor ?? colors.appGray}
              keyboardType={keyboardType ?? 'default'}
              editable={!isTouchable && editable}
              selectionColor={colors.themeColor}
              {...rest}
            />
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor ?? colors.appGray}
                keyboardType={keyboardType ?? 'default'}
                editable={!isTouchable && editable}
                selectionColor={colors.themeColor}
                {...rest}
              />
            </ScrollView>
          )}
        </TouchableOpacity>
        {error ? (
          <View style={{overflow: 'hidden'}}>
            <Text numberOfLines={2} style={[styles.error, errorStyle]}>
              {error}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appGray1,
    height: findHeight(55),
    width: '100%',
    borderRadius: findHeight(28),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  divider: {
    backgroundColor: colors.appGray2,
    height: findHeight(30),
    width: 1.5,
    marginHorizontal: findSize(10),
  },
  input: {
    color: colors.defaultBlack,
    fontSize: findSize(15),
    flex: 1,
  },
  title: {
    color: colors.defaultBlack,
    fontSize: findSize(14),
    // fontWeight: 'bold',
  },
  error: {
    fontSize: findSize(14),
    color: colors.appRed,
    marginLeft: 5,
    maxWidth: DEVICE_WIDTH * 0.82,
  },
});
