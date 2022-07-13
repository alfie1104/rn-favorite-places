import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, []);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
