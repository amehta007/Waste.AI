import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';






const camera = () =>{
  const navigation = useNavigation();
  let cameraRef = useRef<any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>();
  const [photo, setPhoto] = useState<any>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions to access camera</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri)
        .then(() => {
          setPhoto(undefined);
        })
    }

  
  

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.save} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        {hasMediaLibraryPermission ? <MaterialIcons name="save-alt" size={50} color="black" onPress={savePhoto} />: undefined}
        
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.button}>
      <Foundation name="camera" size={50} color="black" onPress={takePic}/>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
  },
  save: {
    alignSelf: 'stretch',
    flex: 1
  }
});

export default camera