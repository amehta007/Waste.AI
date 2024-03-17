import { View, Text, Button,StyleSheet,Pressable  } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router'
import { Stack } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import {Image, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';







const Page = () => {
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  


  return (
    <View style={styles.container}>
      <Link href={'/(screens)/camera'}>
        <FontAwesome name="camera" size={64} color="black" />
      </Link>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});

export default Page