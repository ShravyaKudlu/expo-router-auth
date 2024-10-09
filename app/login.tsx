import React from "react";
import { Button, StyleSheet, TextInput, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "./ctx";
import { router } from "expo-router";
import { useTheme } from "./ThemeContext"; // Import useTheme

const Login: React.FC = () => {
  const { signIn } = useSession();
  const handleLogin = () => {
    signIn();
    router.replace("/");
  };

  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require("@/assets/images/fashionicon.png")} />
      <Text style={[styles.title, { color: theme.text }]}>FreshInVogue</Text>
      <Text style={[styles.paragraph, { color: theme.text }]}>
        Stay Trendy, Stay You
      </Text>
      <View style={[styles.separator, { backgroundColor: theme.separator }]} />
      <TextInput
        placeholder="Username(not required)"
        style={[styles.input, { borderColor: theme.tint }]}
      />
      <TextInput
        placeholder="Password(not required)"
        secureTextEntry
        style={[styles.input, { borderColor: theme.tint }]}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
});

export default Login;
