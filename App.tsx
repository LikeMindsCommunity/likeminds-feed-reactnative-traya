/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard, Platform, StatusBar, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "./RootNavigation";
import {
  CarouselScreen,
  CreatePollScreen,
  ImageCropScreen,
  PollResult,
  VideoPlayer,
  LMOverlayProvider,
  LMChatCallbacks,
  LMChatroomCallbacks,
  NavigateToProfileParams,
  NavigateToGroupDetailsParams,
} from "@likeminds.community/chat-rn-core";
import { myClient } from ".";
import { setStyles } from "./src/styles";
import { ScreenName } from "./src/enums/screenNameEnums";
import ChatroomScreenWrapper from "./screens/Chatroom/ChatroomScreenWrapper";
import FileUploadScreenWrapper from "./screens/FileUpload/FileUploadWrapper";
import {
  announcementRoomId,
  chatroomId,
  gender,
  profileImageUrl,
  userName,
  userUniqueId,
} from "./src/userAndCommunityInfo";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

// Override callBacks with custom logic
class CustomCallbacks implements LMChatCallbacks, LMChatroomCallbacks {
  navigateToProfile(params: NavigateToProfileParams) {
    // Override navigateToProfile with custom logic
  }

  navigateToHomePage() {
    // Override navigateToHomePage with custom logic
  }

  onEventTriggered(eventName: string, eventProperties?: Map<string, string>) {
    // Bugfender.log("eventName -- eventProperties", eventName, eventProperties);
    // Override onEventTriggered with custom logic
  }

  navigateToGroupDetails(params: NavigateToGroupDetailsParams) {
    // Override navigateToGroupDetails with custom logic
  }
}

const lmChatInterface = new CustomCallbacks();

function SettingsScreen() {
  useEffect(() => {
    setStyles(gender);
  }, []);

  return (
    <LMOverlayProvider
      myClient={myClient}
      userName={userName}
      userUniqueId={userUniqueId}
      profileImageUrl={profileImageUrl}
      lmChatInterface={lmChatInterface}
    >
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenName.ChatRoom}
          component={ChatroomScreenWrapper}
          initialParams={{
            chatroomID: chatroomId,
            announcementRoomId: announcementRoomId,
          }}
        />
        <Stack.Screen
          options={{ gestureEnabled: Platform.OS === "ios" ? false : true }}
          name={ScreenName.FileUpload}
          component={FileUploadScreenWrapper}
          initialParams={{
            backIconPath: "", // add your back icon path here
            imageCropIcon: "", // add your image crop icon path here
          }}
        />
        <Stack.Screen name={"VideoPlayer"} component={VideoPlayer} />
        <Stack.Screen
          options={{ gestureEnabled: false }}
          name={ScreenName.CarouselScreen}
          component={CarouselScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false }}
          name={ScreenName.PollResult}
          component={PollResult}
          initialParams={{
            backIconPath: require("./assets/images/backIcon.png"),
          }}
        />
        <Stack.Screen
          name={ScreenName.CreatePollScreen}
          component={CreatePollScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={ScreenName.ImageCropScreen}
          component={ImageCropScreen}
        />
      </Stack.Navigator>
    </LMOverlayProvider>
  );
}

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [isKeyBoardFocused, setIsKeyBoardFocused] = useState(false);
  useLayoutEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyBoardFocused(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyBoardFocused(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            display:
              Platform.OS !== "ios"
                ? isKeyBoardFocused
                  ? "none"
                  : "flex"
                : "flex",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
