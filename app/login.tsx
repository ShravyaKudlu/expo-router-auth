import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "./ctx";
import { router } from "expo-router";
import { Image } from "react-native";
// import fashionIcon from "@/assets/images/fashionicon.png";
export default function Login() {
  const { signIn } = useSession();
  const handleLogin = () => {
    signIn();

    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/fashionicon.png")} />
      <Text style={styles.title}>FreshInVogue</Text>
      <Text style={styles.paragraph}>Stay Trendy, Stay You</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        placeholder="Username(not required)"
        style={styles.input}
      />
      <TextInput
        placeholder="Password(not required)"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}

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
    borderColor: "#000",
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
});
