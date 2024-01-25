/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { Platform, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import {
  CarouselScreen,
  ChatRoom,
  CreatePollScreen,
  FileUpload,
  ImageCropScreen,
  PollResult,
  VideoPlayer,
  LMOverlayProvider,
  LMChatroomCallbacks,
  LMChatCallbacks,
  NavigateToProfileParams,
  NavigateToGroupDetailsParams,
  RadialGradient,
} from "likeminds_chat_reactnative_integration";
import { myClient } from ".";
import ChatroomTabNavigator from "./src/ChatroomTabNavigator";
import { setStyles } from "./styles";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const userName = "";
  const userUniqueId = "";
  const chatroomId = "";
  const announcementRoomId = "";
  const profileImageUrl = "";
  const gender: string = "male";

  useEffect(() => {
    setStyles(gender);
  }, []);

  // Override callBacks with custom logic
  class CustomCallbacks implements LMChatCallbacks, LMChatroomCallbacks {
    navigateToProfile(params: NavigateToProfileParams) {
      // Override navigateToProfile with custom logic
    }

    navigateToHomePage() {
      // Override navigateToHomePage with custom logic
    }

    onEventTriggered(eventName: string, eventProperties?: Map<string, string>) {
      // Override onEventTriggered with custom logic
    }

    navigateToGroupDetails(params: NavigateToGroupDetailsParams) {
      // Override navigateToGroupDetails with custom logic
    }
  }

  const lmChatInterface = new CustomCallbacks();

  const gradientStyling = {
    colors: gender === "male" ? ["#3BA773", "#0B713F"] : ["#B25647", "#CC8A7A"],
    style: {
      flex: 1,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
  };

  return (
    <LMOverlayProvider
      myClient={myClient}
      userName={userName}
      userUniqueId={userUniqueId}
      profileImageUrl={profileImageUrl}
      lmChatInterface={lmChatInterface}
    >
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            initialParams={{
              chatroomID: chatroomId,
              isInvited: false,
              announcementRoomId: announcementRoomId,
              gender: gender,
              tabNavigator: ChatroomTabNavigator,
              backIconPath: require("./assets/images/backIcon.png"),
            }}
            options={() => {
              if (Object.keys(gradientStyling).length !== 0) {
                return {
                  headerBackground: () => (
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <StatusBar
                        translucent
                        backgroundColor="transparent"
                        barStyle="light-content"
                      />
                      <RadialGradient {...gradientStyling} />
                    </View>
                  ),
                };
              }
              return {};
            }}
          />
          <Stack.Screen
            options={{ gestureEnabled: Platform.OS === "ios" ? false : true }}
            name={"FileUpload"}
            component={FileUpload}
          />
          <Stack.Screen name={"VideoPlayer"} component={VideoPlayer} />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name={"CarouselScreen"}
            component={CarouselScreen}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name={"PollResult"}
            component={PollResult}
            initialParams={{
              backIconPath: require("./assets/images/backIcon.png"),
            }}
          />
          <Stack.Screen
            name={"CreatePollScreen"}
            component={CreatePollScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={"ImageCropScreen"}
            component={ImageCropScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LMOverlayProvider>
  );
}

export default App;
