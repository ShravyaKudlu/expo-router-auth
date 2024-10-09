import React, { useState, useRef, useEffect, useCallback } from "react";
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

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

const products: Product[] = [
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
  {
    id: "3",
    name: "Product 3",
    price: "$50.00",
    description: "This is yet another great product.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Product 4",
    price: "$25.00",
    description: "This product is also great.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Product 5",
    price: "$45.00",
    description: "This is a fantastic product.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Product 6",
    price: "$30.00",
    description: "This product is amazing.",
    image: "https://via.placeholder.com/150",
  },
];

const Index: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const [visibleQuantityControls, setVisibleQuantityControls] = useState<{
    [key: string]: boolean;
  }>({});
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }, []);

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + quantity,
    }));
    setModalVisible(false);
  }, []);

  const handleLikePress = useCallback((productId: string) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  }, []);

  const handleShoppingBagPress = useCallback((productId: string) => {
    setVisibleQuantityControls((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: 1,
    }));
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
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

          {cart[item.id] && cart[item.id] > 0 ? (
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
          ) : (
            <TouchableOpacity
              style={styles.shoppingBagButton}
              onPress={() => handleShoppingBagPress(item.id)}
            >
              <Icon
                name="shopping-bag"
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ),
    [
      cart,
      handleLikePress,
      handleShoppingBagPress,
      likedProducts,
      visibleQuantityControls,
    ]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the E-Commerce App!</Text>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        numColumns={numColumns}
      />

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
                            outputRange: [800, 0],
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

                      {cart[selectedProduct.id] &&
                      cart[selectedProduct.id] > 0 ? (
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
                      ) : (
                        <TouchableOpacity
                          style={styles.shoppingBagButton}
                          onPress={() =>
                            handleShoppingBagPress(selectedProduct.id)
                          }
                        >
                          <Icon
                            name="shopping-bag"
                            size={24}
                            color="grey"
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
  shoppingBagButton: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "70%",
    maxHeight: "90%",
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
