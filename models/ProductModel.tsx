import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

interface ProductModalProps {
  product: Product | null;
  visible: boolean;
  likedProducts: { [key: string]: boolean };
  cart: { [key: string]: number };
  onLikePress: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void; // New function for decrementing
  onClose: () => void;
  slideAnim: Animated.Value;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  visible,
  likedProducts,
  cart,
  onLikePress,
  onAddToCart,
  onRemoveFromCart, // New function for decrementing
  onClose,
  slideAnim,
}) => {
  if (!product) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
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
                  source={{ uri: product.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalProductName}>{product.name}</Text>
                <Text style={styles.modalProductPrice}>{product.price}</Text>
                <Text style={styles.modalProductDescription}>
                  {product.description}
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => onLikePress(product.id)}>
                    <Icon
                      name="heart"
                      size={24}
                      color={likedProducts[product.id] ? "red" : "grey"}
                    />
                  </TouchableOpacity>

                  {cart[product.id] && cart[product.id] > 0 ? (
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onRemoveFromCart(product.id)} // Call decrement function
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {cart[product.id]}
                      </Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onAddToCart(product.id)} // Call increment function
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.shoppingBagButton}
                      onPress={() => onAddToCart(product.id)}
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
                onPress={onClose}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "70%",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  shoppingBagButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductModal;
