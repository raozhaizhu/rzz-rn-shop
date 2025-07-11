import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import ProductListItem from "@/components/ProductListItem";
import ListHeader from "@/components/ListHeader";
import { useAuth } from "@/providers/AuthProvider";
import { getProductsAndCategories } from "@/api/api";

export default function Home() {
    const { data, error, isLoading } = getProductsAndCategories();

    if (isLoading) return <ActivityIndicator />;

    if (error || !data) return <Text>Error {error?.message || "An error occurred"}</Text>;

    return (
        <View>
            <FlatList
                data={data.products}
                renderItem={({ item }) => <ProductListItem product={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={<ListHeader categories={data.categories} />}
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.flatListContent}
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    flatListContent: {
        paddingBottom: 20,
    },
    flatListColumn: {
        paddingBottom: 20,
    },
});
