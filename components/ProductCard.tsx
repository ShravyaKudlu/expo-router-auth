import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type ProductCardProps = {
  item: Product;
  cart: { [key: string]: number };
  likedProducts: { [key: string]: boolean };
  handleProductPress: (product: Product) => void;
  handleLikePress: (productId: string) => void;
  handleShoppingBagPress: (productId: string, size: string) => void;
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  cart,
  likedProducts,
  handleProductPress,
  handleLikePress,
  handleShoppingBagPress,
  setCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
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
        {["S", "M", "L"].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
            onPress={() => setSelectedSize(selectedSize === size ? null : size)}
          >
            <Text
              style={[
                styles.sizeButtonText,
                selectedSize === size && styles.selectedSizeButtonText,
              ]}
            >
              {size}
            </Text>
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
            onPress={() => {
              if (selectedSize) {
                handleShoppingBagPress(item.id, selectedSize);
              } else {
                alert("Please select a size");
              }
            }}
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
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
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
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sizeButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginHorizontal: 5,
  },
  selectedSizeButton: {
    backgroundColor: "#007BFF",
  },
  sizeButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  selectedSizeButtonText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    padding: 10,
  },
});

export default ProductCard;
