import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";

const NestedStack = createNativeStackNavigator();

export default function PostsScreen() {
  return (
    <NestedStack.Navigator screenOptions={{ headerShown: false }}>
      <NestedStack.Screen name='Comments' component={CommentsScreen} />
      <NestedStack.Screen name='Map' component={MapScreen} />
    </NestedStack.Navigator>
  );
}
