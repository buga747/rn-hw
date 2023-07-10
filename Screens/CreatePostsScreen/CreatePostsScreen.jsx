import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  name: "",
  place: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  const { width } = useWindowDimensions();

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    if (photo.uri) {
      setPhoto(photo.uri);
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const sendPhoto = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    if (photo && location && state) {
      setIsShowKeyboard(false);
      setPhoto(null);
      setLocation(null);
      setState(initialState);
      navigation.navigate("DefaultScreen", { photo });
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.box}>
          {!isShowKeyboard && (
            <Camera style={styles.camera} ref={setCamera}>
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  transform: [{ translateX: -30 }, { translateY: -30 }],
                }}
                onPress={takePhoto}
                activeOpacity={0.8}>
                <MaterialIcons name='camera-alt' size={24} color='#fff' />
              </TouchableOpacity>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                  />
                </View>
              )}
            </Camera>
          )}
          <TouchableOpacity style={{ marginTop: 8 }} activeOpacity={0.8}>
            <Text style={styles.text}>
              {photo ? "Редагувати фото" : "Завантажити фото"}
            </Text>
          </TouchableOpacity>

          <View style={styles.wrapInput}>
            <TextInput
              style={{ ...styles.input, width: width }}
              placeholder='Назва...'
              placeholderTextColor='#bdbdbd'
              onFocus={() => setIsShowKeyboard(true)}
              value={state.name}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, name: value }))
              }
            />
          </View>
          <View style={styles.wrapInput}>
            <AntDesign
              name='enviromento'
              size={24}
              color='#bdbdbd'
              style={styles.icon}
            />
            <TextInput
              style={{ ...styles.input, paddingStart: 28, width: width }}
              placeholder='Місцевість...'
              placeholderTextColor='#bdbdbd'
              onFocus={() => setIsShowKeyboard(true)}
              value={state.place}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, place: value }))
              }
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.onBtn,
              backgroundColor: photo ? "#ff6c00" : "#f6f6f6",
            }}
            onPress={sendPhoto}
            activeOpacity={0.8}>
            <Text
              style={{
                ...styles.btnTitle,
                color: photo ? "#fff" : "#bdbdbd",
              }}>
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setState(initialState)}>
            <Feather name='trash-2' size={24} color='#bdbdbd' />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    marginHorizontal: 16,
  },
  camera: {
    position: "relative",
    height: 240,
    marginTop: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
    fontFamily: "Roboto-Regular",
  },
  wrapInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    marginTop: 32,
    paddingBottom: 15,
  },
  input: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  icon: {
    position: "absolute",
    bottom: 20,
  },
  onBtn: {
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  deleteBtn: {
    backgroundColor: "#f6f6f6",
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100,
    marginBottom: 22,
  },
});
