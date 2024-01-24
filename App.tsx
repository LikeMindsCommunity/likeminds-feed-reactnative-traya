/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
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
  STYLES,
  RadialGradient,
} from "likeminds_chat_reactnative_integration";
import { myClient } from ".";
import ChatroomTabNavigator from "./src/ChatroomTabNavigator";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const userName = "";
  const userUniqueId = "";
  const chatroomId = "";
  const announcementRoomId = "";
  const profileImageUrl = "";

  // themeStyling
  const themeStyles = {
    hue: 10,
    fontColor: "black",
    primaryColor: "#B7D340",
    secondaryColor: "#B7D340",
    lightBackgroundColor: "#d7f7ed",
    fontTypes: {
      LIGHT: "NunitoSans-Light",
      MEDIUM: "NunitoSans-Medium",
      SEMI_BOLD: "NunitoSans-SemiBold",
      BOLD: "NunitoSans-Bold",
      BLACK: "NunitoSans-Black",
    },
  };

  // styling for reactionList
  {
    /*
  const reactionListStyles = {
    reactionSize: 0,
    reactionLeftItemStroke: "pink",
    reactionRightItemStroke: "yellow",
    reactionItemBorderRadius: 5,
    gap: 5,
  };
  */
  }

  // styling for chatBubble
  const chatBubbleStyles = {
    // borderRadius: 5,
    // sentMessageBackgroundColor: "yellow",
    // receivedMessageBackgroundColor: "pink",
    // selectedBackgroundColor: "grey",
    // selectedMessageBackgroundColor: "purple",
    textStyles: {
      fontSize: 16,
    },
    linkTextColor: "#3CA874",
    taggingTextColor: "#3CA874",
    stateMessagesBackgroundColor: "#3CA87429",
    stateMessagesTextStyles: {
      color: "#808080",
    },
    dateStateMessage: {
      color: "#808080",
    },
    messageReceivedHeader: {
      color: "#3CA874",
    },
    playPauseBoxIcon: {
      backgroundColor: "#B7D340",
    },
    voiceNoteSlider: {
      minimumTrackTintColor: "#B7D340",
      thumbTintColor: "#B7D340",
    },
    pollVoteSliderColor: {
      backgroundColor: "#3CA87429",
    },
  };

  // styling for inputBox
  const inputBoxStyles = {
    placeholderTextColor: "#aaa",
    selectionColor: "#aaa",
    partsTextStyle: {
      color: "#3CA874",
    },
    sendIconStyles: {
      tintColor: "black",
    },
    micIconStyles: {
      tintColor: "black",
    },
  };

  if (chatBubbleStyles) {
    STYLES.setChatBubbleStyle(chatBubbleStyles);
  }

  if (themeStyles) {
    STYLES.setTheme(themeStyles);
  }

  // if (reactionListStyles) {
  //   STYLES.setReactionListStyle(reactionListStyles);
  // }

  if (inputBoxStyles) {
    STYLES.setInputBoxStyle(inputBoxStyles);
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
      // Override onEventTriggered with custom logic
    }
  }

  const lmChatInterface = new CustomCallbacks();

  const gradientStyling = {
    colors: ["#3BA773", "#0B713F"],
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
              tabNavigator: ChatroomTabNavigator,
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
