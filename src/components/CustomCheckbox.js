import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {findSize} from 'src/utils/helper';
import colors from 'src/utils/colors';

const CustomCheckbox = ({checked, onChange, title}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => onChange(!checked)}>
      <View style={styles.box}>{checked && <View style={styles.check} />}</View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    height: findSize(22),
    width: findSize(22),
    borderRadius: 2,
    backgroundColor: colors.appGray1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.themeColor,
  },

  check: {
    height: findSize(10),
    width: findSize(10),
    backgroundColor: colors.themeColor,
  },
  title: {
    color: colors.defaultBlack,
    fontSize: findSize(13),
    marginStart: 10,
  },
});
