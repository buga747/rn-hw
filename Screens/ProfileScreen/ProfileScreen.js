import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, ScrollView, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { styles } from "./ProfileScreenStyles";
import Background from "../../assets/images/app_background.jpg";
import RegistrationImageAddButton from "../../components/RegistrationImageAddButton";
import RegistrationImageRemoveButton from "../../components/RegistrationImageRemoveButton";
import PostComponent from "../../components/PostComponent/PostComponent";
import LogoutButton from "../../components/LogoutButton";
import {
  selectUserPhoto,
  selectUserName,
} from "../../redux/authorization/authSelectors";
import {
  selectAllPosts,
  selectCurrentUserPosts,
} from "../../redux/posts/postsSelectors";

const ProfileScreen = () => {
  const posts = useSelector(selectAllPosts);
  const userPhoto = useSelector(selectUserPhoto);
  const userName = useSelector(selectUserName);
  const [userAvatar, setUserAvatar] = useState(userPhoto); // Corrected the state variable name
  const navigation = useNavigation();

  const handleRemoveImage = () => {
    setUserAvatar(null);
  };

  const uploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) setUserAvatar(result.uri); // Corrected the property name 'cancelled'
  };

  return (
    <ImageBackground
      source={Background}
      resizeMode='cover'
      style={{ width: "100%", height: "100%" }}>
      <View style={styles.profileContainer}>
        <View style={styles.profileLogoutButton}>
          <LogoutButton onPress={() => navigation.navigate("LoginScreen")} />
        </View>

        <View style={styles.userImageContainer}>
          {userAvatar && (
            <Image
              source={{ uri: userAvatar }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
              }}
            />
          )}
          {!userAvatar ? ( // Updated the condition to check userAvatar
            <RegistrationImageAddButton onPress={uploadAvatar} />
          ) : (
            <RegistrationImageRemoveButton onPress={handleRemoveImage} />
          )}
        </View>

        <Text style={styles.profileHeader}>{userName}</Text>
        <ScrollView
          style={{ margin: 0, padding: 0 }}
          showsVerticalScrollIndicator={false}>
          {posts.map((item) => {
            const key = Object.keys(item)[0];
            const {
              img,
              description,
              likes,
              comments,
              locationName,
              geoLocation,
            } = item[key];
            return (
              <PostComponent
                key={key}
                image={img}
                description={description}
                likes={likes}
                comments={comments ? comments : []}
                locationName={locationName}
                geoLocation={geoLocation}
              />
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
