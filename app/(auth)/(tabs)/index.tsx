import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const products = [
  {
    id: "1",
    name: "Product 1",
    price: "$20.00",
    description: "This is a great product.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Product 2",
    price: "$35.00",
    description: "This is another great product.",
    image: "https://via.placeholder.com/150",
  },
  // Add more products as needed
];

const Index: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const slideAnim = useRef(new Animated.Value(0)).current; // Initial position for the modal (off-screen)

  const handleProductPress = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: (typeof products)[0], quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + quantity,
    }));
    setModalVisible(false);
  };

  const handleLikePress = (productId: string) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  useEffect(() => {
    if (modalVisible) {
      // Animate the modal sliding up when it becomes visible
      Animated.timing(slideAnim, {
        toValue: 1, // Slide into the view
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      // Reset the animation when modal is closed
      Animated.timing(slideAnim, {
        toValue: 0, // Slide out of view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const renderProductItem = ({ item }: { item: (typeof products)[0] }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleLikePress(item.id)}>
          <Icon
            name="heart"
            size={24}
            color={likedProducts[item.id] ? "red" : "grey"}
          />
        </TouchableOpacity>
        {cart[item.id] > 0 && (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                setCart((prevCart) => ({
                  ...prevCart,
                  [item.id]: Math.max((prevCart[item.id] || 0) - 1, 0),
                }))
              }
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cart[item.id] || 0}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                setCart((prevCart) => ({
                  ...prevCart,
                  [item.id]: (prevCart[item.id] || 0) + 1,
                }))
              }
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        {(cart[item.id] || 0) === 0 && (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(item, 1)}
          >
            <Icon
              name="shopping-bag"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the E-Commerce App!</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      {/* Modal for displaying product details */}
      {selectedProduct && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.modalContent,
                    {
                      transform: [
                        {
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [800, 0], // Slide from off-screen (800) to on-screen (0)
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <ScrollView>
                    <Image
                      source={{ uri: selectedProduct.image }}
                      style={styles.modalImage}
                    />
                    <Text style={styles.modalProductName}>
                      {selectedProduct.name}
                    </Text>
                    <Text style={styles.modalProductPrice}>
                      {selectedProduct.price}
                    </Text>
                    <Text style={styles.modalProductDescription}>
                      {selectedProduct.description}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        onPress={() => handleLikePress(selectedProduct.id)}
                      >
                        <Icon
                          name="heart"
                          size={24}
                          color={
                            likedProducts[selectedProduct.id] ? "red" : "grey"
                          }
                        />
                      </TouchableOpacity>
                      {cart[selectedProduct.id] > 0 && (
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() =>
                              setCart((prevCart) => ({
                                ...prevCart,
                                [selectedProduct.id]: Math.max(
                                  (prevCart[selectedProduct.id] || 0) - 1,
                                  0
                                ),
                              }))
                            }
                          >
                            <Text style={styles.quantityButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>
                            {cart[selectedProduct.id] || 0}
                          </Text>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() =>
                              setCart((prevCart) => ({
                                ...prevCart,
                                [selectedProduct.id]:
                                  (prevCart[selectedProduct.id] || 0) + 1,
                              }))
                            }
                          >
                            <Text style={styles.quantityButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {cart[selectedProduct.id] === 0 && (
                        <TouchableOpacity
                          style={styles.addToCartButton}
                          onPress={() => handleAddToCart(selectedProduct, 1)}
                        >
                          <Icon
                            name="shopping-bag"
                            size={24}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </ScrollView>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  productList: {
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: {
    width: 180,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  addToCartButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end", // Align modal to bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "70%", // Default height
    maxHeight: "90%", // Allow modal to expand up to 90%
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  modalProductName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalProductPrice: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  modalProductDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Index;
