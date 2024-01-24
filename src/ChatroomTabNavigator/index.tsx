import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { ChatroomTabNavigatorProps } from "./type";

function ChatroomTabNavigator({
  navigation,
  chatroomId,
  announcementRoomId,
  lmChatInterface,
}: ChatroomTabNavigatorProps) {
  const [activeTab, setActiveTab] = useState(1); // Defaulting to the first tab

  const handleTabPress = (tabIndex: number) => {
    setActiveTab(tabIndex);
    if (tabIndex == 1) {
      return navigation.navigate("ChatRoom", {
        chatroomID: chatroomId?.toString(),
      });
    } else if (tabIndex == 2) {
      return navigation.navigate("ChatRoom", {
        chatroomID: announcementRoomId?.toString(),
      });
    } else if (tabIndex == 3) {
      lmChatInterface.navigateToProfile();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 1 && styles.activeTab]}
        onPress={() => handleTabPress(1)}
      >
        <Image
          source={
            activeTab === 1
              ? require("../../assets/images/chatActive.png")
              : require("../../assets/images/chatInactive.png")
          }
          style={styles.tabIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 2 && styles.activeTab]}
        onPress={() => handleTabPress(2)}
      >
        <Image
          source={
            activeTab === 2
              ? require("../../assets/images/announcementActive.png")
              : require("../../assets/images/announcementInactive.png")
          }
          style={styles.tabIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 3 && styles.activeTab]}
        onPress={() => handleTabPress(3)}
      >
        <Image
          source={
            activeTab === 3
              ? require("../../assets/images/profileActive.png")
              : require("../../assets/images/profileInactive.png")
          }
          style={styles.tabIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2", // Set your desired background color
    padding: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "hsl(151, 23%, 86%)",
    margin: 10,
  },
  activeTab: {
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "hsl(151, 47%, 45%)",
    borderWidth: 2,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default ChatroomTabNavigator;
