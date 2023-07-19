import React, { useState, useEffect } from "react";
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
  selectUserId,
} from "../../redux/authorization/authSelectors";
import { selectAllPosts } from "../../redux/posts/postsSelectors";

const ProfileScreen = () => {
  const posts = useSelector(selectAllPosts);
  const userPhoto = useSelector(selectUserPhoto);
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);
  const [userAvatar, setUserAvatar] = useState(userPhoto);
  const [filteredPosts, setFilteredPosts] = useState([]); // New state variable
  const navigation = useNavigation();

  useEffect(() => {
    // Filter posts based on userId whenever userId changes
    const filtered = posts.filter(
      (item) => item[Object.keys(item)[0]].userId === userId
    );
    setFilteredPosts(filtered);
  }, [posts, userId]);

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

    if (!result.canceled) setUserAvatar(result.uri);
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
          {!userAvatar ? (
            <RegistrationImageAddButton onPress={uploadAvatar} />
          ) : (
            <RegistrationImageRemoveButton onPress={handleRemoveImage} />
          )}
        </View>

        <Text style={styles.profileHeader}>{userName}</Text>
        <ScrollView
          style={{ margin: 0, padding: 0 }}
          showsVerticalScrollIndicator={false}>
          {filteredPosts.map((item) => {
            const key = Object.keys(item)[0];
            const post = item[key];
            const {
              img,
              description,
              likes,
              comments,
              locationName,
              geoLocation,
            } = post;
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
