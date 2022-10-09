import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from 'src/utils/colors';
import CustomButton from 'src/components/CustomButton';
import {db} from 'src/firebase';
import {findSize} from 'src/utils/helper';

const Home = ({navigation, route}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    let data = [];
    db.ref('/contacts')
      .once('value')
      .then(res => {
        res.forEach(item => {
          data.push(item.val());
        });
        setContacts(data);
      });
  }, [route?.param?.flag]);
  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          marginVertical: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item?.image ? (
            <Image
              source={{uri: item?.image}}
              style={{height: 60, width: 60, borderRadius: 35, marginEnd: 15}}
            />
          ) : (
            <Image
              source={require('src/assets/images/user.jpg')}
              style={{height: 60, width: 60, borderRadius: 35, marginEnd: 15}}
            />
          )}
          <View>
            <Text style={{fontSize: 16, color: colors.defaultBlack}}>
              {item?.name}
            </Text>
            <Text style={{fontSize: 13, color: colors.defaultBlack}}>
              {item?.phone}
            </Text>
          </View>
        </View>
        <CustomButton
          onPress={() => {
            Alert.alert('Delete', 'Are you sure,you want to delete?', [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {},
              },
            ]);
          }}>
          <Image
            source={require('src/assets/images/delete.jpg')}
            style={{height: 30, width: 30, marginEnd: 15}}
          />
        </CustomButton>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={_renderItem}
        keyExtractor={item => item?.id}
        ListHeaderComponent={
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.defaultBlack,
                fontWeight: 'bold',
              }}>
              Contacts
            </Text>
            <CustomButton
              title={'Add Contact'}
              type={1}
              style={{
                height: findSize(30),
                width: findSize(110),
              }}
              textStyle={{fontSize: 12}}
              onPress={() => {
                navigation?.navigate('AddContact');
              }}
            />
          </View>
        }
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: colors.defaultBlack}}>
              No contacts added yet.
            </Text>
            <CustomButton
              title={'Add Contact'}
              type={2}
              onPress={() => {
                navigation?.navigate('AddContact');
              }}
            />
          </View>
        }
        ItemSeparatorComponent={
          <View style={{height: 1, backgroundColor: colors.appGray2}} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.defaultWhite,
  },
});
