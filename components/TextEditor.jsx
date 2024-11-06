import { useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const TextEditor = ({
  onValueChange,
  value,
  styleEditor,
  styleToolbar,
  placeholder,
}) => {
  const richTextRef = useRef();

  return (
    <>
      <RichEditor
        ref={richTextRef}
        initialContentHTML={value}
        onChange={onValueChange}
        placeholder={placeholder || ""}
        style={[styles.editor, styleEditor && styleEditor]}
      />
      <RichToolbar
        editor={richTextRef}
        selectedIconTint="#7FB640"
        actions={[
          "bold",
          "italic",
          "underline",
          "unorderedList",
          "orderedList",
        ]}
        iconTint="black"
        style={[styles.toolbar, styleToolbar && styleToolbar]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  editor: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: "#aaa",
    borderWidth: 0.5,
    overflow: "hidden",
    flex: 1,
  },
  toolbar: {
    backgroundColor: "#e5e5e5",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
});

export default TextEditor;
