import { launchCameraAsync } from "expo-image-picker";
import { Button, View } from "react-native";

function ImagePicker() {
  const takeImageHandler = async () => {
    // No permissions request is necessary for launching the image library
    let image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);
  };

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
