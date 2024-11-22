import {
  PlaceholderBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
} from "@10play/tentap-editor";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

const TextEditor = ({ onValueChange, value, placeholder }) => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: "",
    onChange: async () => {
      const text = await editor.getHTML(); // Await the resolved value of getText()
      console.log("Editor changed", text);
      onValueChange(text);
    },
    bridgeExtensions: [
      ...TenTapStartKit,
      PlaceholderBridge.configureExtension({
        placeholder: placeholder,
      }),
    ],
  });

  useEffect(() => {
    let timeoutId;

    if (value != editor.getHTML()) {
      console.log("set text when value is different", value);

      timeoutId = setTimeout(() => {
        editor.setContent(value);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RichText style={[styles.editor]} editor={editor} />
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  editor: {
    position: "relative",
    width: "100%",
    height: 100,
    flex: 1,
    padding: 20,
  },
});

export default TextEditor;
