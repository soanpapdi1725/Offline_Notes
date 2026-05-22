import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CategoryTags } from "../constants/Category";
import { setNotes } from "../Store/Slices/notesSlice";
const TaskCard = ({ SingleTask, showButtons, setShowButtons }) => {
  const { id, title, description, completed, category, dueDate } = SingleTask;
  const { notes } = useSelector((state) => state.savedNotes);
  const categories = CategoryTags;
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnDelete = (notes, id) => {
    const newNotes = notes.filter((task) => task.id.toString() !== id);
    dispatch(setNotes(newNotes));
  };
  return (
    <Link href={`/Task/${id}`} asChild>
      <TouchableOpacity
        onLongPress={() => {
          setShowButtons(id);
        }}
        className="w-[46%] justify-between h-[150px] bg-blue-50 rounded-lg "
      >
        {showButtons !== id ? (
          <>
            <View className="px-2 py-1">
              <Text
                numberOfLines={2}
                className="font-bold font-header text-xl "
              >
                {title}
              </Text>
              <Text numberOfLines={4} className="font-body text-[#827D89]">
                {description}
              </Text>
            </View>

            <View
              className={`flex-row justify-between items-center px-2 rounded-b-lg`}
              style={{
                backgroundColor: categories.find((tag) => tag.name === category)
                  ?.activeColor,
              }}
            >
              <View className="flex-col items-start">
                <Text className="text-[#ffffff] font-bold">{dueDate}</Text>
                <Text className="text-[#ffffff] font-header">{category}</Text>
              </View>
              <View className="bg-orange-100 rounded-full">
                {completed ? (
                  <Entypo name="check" size={24} color="green" />
                ) : (
                  <Ionicons name="timer-outline" size={24} color="red" />
                )}
              </View>
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center gap-4">
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/Task/[id]",
                    params: { id, mode: "editable" },
                  })
                }
                className="h-10 w-10 bg-green-200 justify-center items-center rounded-full"
              >
                <MaterialIcons name="create" size={30} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                className="h-10 w-10 bg-orange-200 justify-center items-center rounded-full"
                onPress={() => {
                  handleOnDelete(notes, id.toString());
                }}
              >
                <MaterialCommunityIcons name="delete" size={30} color="red" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="" onPress={() => setShowButtons(null)}>
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default TaskCard;
