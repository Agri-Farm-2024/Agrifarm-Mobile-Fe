import {
  PlaceholderBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useBridgeState,
  useEditorBridge,
  useEditorContent,
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
    initialContent: "",
    bridgeExtensions: [
      ...TenTapStartKit,
      PlaceholderBridge.configureExtension({
        placeholder: placeholder,
      }),
    ],
  });

  const content = useEditorContent(editor, { type: "html" });
  const editorState = useBridgeState(editor);
  useEffect(() => {
    if (!content || content == "") {
      return;
    }
    console.log("content changed", content);
    onValueChange(content);
  }, [content]);

  useEffect(() => {
    if (!editorState.isReady) {
      return;
    }
    console.log("value change", value, content);
    editor.setContent(value);
  }, [editorState.isReady]);

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
