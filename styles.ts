import { STYLES } from "likeminds_chat_reactnative_integration";

export const setStyles = () => {
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

  // styling for chatroom header
  const chatroomHeaderStyles = {
    chatroomNameHeaderStyle: {
      color: "white",
      fontSize: 18,
      fontFamily: "NunitoSans-Bold",
    },
    chatroomSubHeaderStyle: {
      color: "white",
      fontSize: 13,
    },
  };

  // styling for chatBubble
  const chatBubbleStyles = {
    textStyles: {
      fontSize: 15,
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
      senderNameStyles: {
        color: "#3CA874",
        fontSize: 15,
      },
      senderDesignationStyles: {
        fontSize: 14,
      },
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
    selectionColor: "#3CA874",
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

  if (chatroomHeaderStyles) {
    STYLES.setChatroomHeaderStyle(chatroomHeaderStyles);
  }

  if (inputBoxStyles) {
    STYLES.setInputBoxStyle(inputBoxStyles);
  }
};
