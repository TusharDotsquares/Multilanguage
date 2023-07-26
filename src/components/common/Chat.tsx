import * as React from "react";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";
import "@yext/chat-ui-react/bundle.css";

const Chat = () => {
  return (
      <ChatHeadlessProvider
        config={{
          apiKey: "936cb98fa8b5eb0a26702f87babfd9a8",
          botId: "byeredo-chat",
          saveToSessionStorage: false,
          apiDomain: "sbx-cdn.yextapis.com",
        }}
      >
        <ChatPopUp 
        title="Chat with us"
        showRestartButton={false}
        placeholder="Ask me about byeredo"
        stream={false}
        showTimestamp={false} />
      </ChatHeadlessProvider>
  );
};

export default Chat;
