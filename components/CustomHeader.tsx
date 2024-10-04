import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const CustomHeaders: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isModelVisible, setModelVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Row: Your Name, Random Icon, Bag Icon */}
      <View style={styles.topRow}>
        {/* Your Name */}
        <Text style={styles.nameText}>Shravya</Text>

        {/* Random Icon */}
        <Icon
          name="planet-outline"
          size={28}
          style={styles.icon}
          onPress={() => alert("Random Icon")}
        />

        {/* Bag Icon */}
        <Fontisto
          name="shopping-bag"
          size={28}
          style={styles.icon}
          onPress={() => setModelVisible(true)}
        />
      </View>
      <Modal visible={isModelVisible}>
        <View>
          <Text>Bag Content</Text>
          <Button
            title="close"
            onPress={() => setModelVisible(false)}
          />
        </View>
      </Modal>

      {/* Middle Row: Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search for fashion..."
            style={styles.searchBar}
          />
          <Icon
            name="search-outline"
            size={20}
            style={styles.searchIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomHeaders;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    paddingHorizontal: 15,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
