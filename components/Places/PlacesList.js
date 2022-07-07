import { FlatList, Text } from "react-native";

function PlacesList({ places }) {
  return (
    <FlatList
      data={places}
      key={(item) => item.id}
      renderItem={<Text>{places.title}</Text>}
    />
  );
}

export default PlacesList;
