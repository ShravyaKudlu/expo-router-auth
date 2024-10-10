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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Sizes = {
  S: number;
  M: number;
  L: number;
};

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  sizes: Sizes;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: "$10.00",
    description: "Description for Product 1",
    image: "https://via.placeholder.com/150",
    sizes: { S: 10, M: 5, L: 0 },
  },
  {
    id: "2",
    name: "Product 2",
    price: "$20.00",
    description: "Description for Product 2",
    image: "https://via.placeholder.com/150",
    sizes: { S: 0, M: 2, L: 3 },
  },
  {
    id: "3",
    name: "Product 3",
    price: "$30.00",
    description: "Description for Product 3",
    image: "https://via.placeholder.com/150",
    sizes: { S: 1, M: 0, L: 4 },
  },
  {
    id: "4",
    name: "Product 4",
    price: "$40.00",
    description: "Description for Product 4",
    image: "https://via.placeholder.com/150",
    sizes: { S: 3, M: 3, L: 3 },
  },
];

const Index: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: string]: string | null;
  }>({});
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }, []);

  const handleAddToCart = useCallback(
    (product: Product, quantity: number) => {
      const selectedSize = selectedSizes[product.id];
      if (!selectedSize) {
        Alert.alert("Warning", "Please select a size before adding to cart.");
        return;
      }
      setCart((prevCart) => ({
        ...prevCart,
        [product.id]: (prevCart[product.id] || 0) + quantity,
      }));
      updateProductSizes(product, selectedSize, -quantity);
      setModalVisible(false);
    },
    [selectedSizes]
  );

  const updateProductSizes = (
    product: Product,
    selectedSize: string,
    change: number
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id
          ? {
              ...p,
              sizes: {
                ...p.sizes,
                [selectedSize]: p.sizes[selectedSize as keyof Sizes] + change,
              },
            }
          : p
      )
    );
  };

  const handleLikePress = useCallback((productId: string) => {
    setLikedProducts((prevLiked) => ({
      ...prevLiked,
      [productId]: !prevLiked[productId],
    }));
  }, []);

  const handleSizePress = useCallback((productId: string, size: string) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: prevSizes[productId] === size ? null : size,
    }));
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: modalVisible ? 1 : 0,
      duration: modalVisible ? 500 : 300,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

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
        <View style={styles.sizeContainer}>
          {Object.entries(item.sizes).map(([size, quantity]) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSizes[item.id] === size && styles.sizeButtonSelected,
                quantity === 0 && styles.sizeButtonDisabled,
              ]}
              onPress={() => handleSizePress(item.id, size)}
              disabled={quantity === 0}
            >
              <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
              <QuantityControls
                productId={item.id}
                selectedSizes={selectedSizes}
                cart={cart}
                setCart={setCart}
                updateProductSizes={updateProductSizes}
                products={products}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.shoppingBagButton}
              onPress={() => handleAddToCart(item, 1)}
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
    [cart, likedProducts, selectedSizes]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the E-Commerce App!</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        numColumns={2}
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
                    <View style={styles.sizeContainer}>
                      {Object.entries(selectedProduct.sizes).map(
                        ([size, quantity]) => (
                          <TouchableOpacity
                            key={size}
                            style={[
                              styles.sizeButton,
                              selectedSizes[selectedProduct.id] === size &&
                                styles.sizeButtonSelected,
                              quantity === 0 && styles.sizeButtonDisabled,
                            ]}
                            onPress={() =>
                              quantity > 0 &&
                              handleSizePress(selectedProduct.id, size)
                            }
                            disabled={quantity === 0}
                          >
                            <Text style={styles.sizeButtonText}>{size}</Text>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
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
                        <QuantityControls
                          productId={selectedProduct.id}
                          selectedSizes={selectedSizes}
                          cart={cart}
                          setCart={setCart}
                          updateProductSizes={updateProductSizes}
                          products={[]}
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.shoppingBagButton}
                          onPress={() => handleAddToCart(selectedProduct, 1)}
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
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

// Component for quantity controls
const QuantityControls: React.FC<{
  productId: string;
  selectedSizes: { [key: string]: string | null };
  cart: { [key: string]: number };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  updateProductSizes: (
    product: Product,
    selectedSize: string,
    change: number
  ) => void;
  products: Product[];
}> = ({
  productId,
  selectedSizes,
  cart,
  setCart,
  updateProductSizes,
  products,
}) => {
  const handleQuantityChange = (change: number) => {
    const selectedSize = selectedSizes[productId];
    if (!selectedSize) {
      Alert.alert("Warning", "Please select a size before changing quantity.");
      return;
    }
    const newQuantity = (cart[productId] || 0) + change;
    if (newQuantity < 0) return;

    setCart((prevCart) => ({
      ...prevCart,
      [productId]: newQuantity,
    }));
    updateProductSizes({ id: productId } as Product, selectedSize, -change);
  };

  const selectedSize = selectedSizes[productId];
  const isOutOfStock = selectedSize
    ? products.find((p) => p.id === productId)?.sizes[
        selectedSize as keyof Sizes
      ] === 0
    : false;

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => handleQuantityChange(-1)}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{cart[productId]}</Text>
      <TouchableOpacity
        style={[
          styles.quantityButton,
          isOutOfStock && styles.sizeButtonDisabled,
        ]}
        onPress={() => {
          if (isOutOfStock) {
            Alert.alert("Warning", "Selected size is out of stock.");
          } else {
            handleQuantityChange(1);
          }
        }}
        disabled={isOutOfStock}
      >
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
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
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  sizeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sizeButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sizeButtonSelected: {
    backgroundColor: "#0056b3",
  },
  sizeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Index;
