import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import FrameForScreens from "../../components/frameForScreens";
import { CategoryTags } from "../../constants/Category";
import { setNotes } from "../../Store/Slices/notesSlice";

let taskSchema = object({
  title: string(),
  description: string().required(),
});
const TaskInDetail = () => {
  const { id: taskId, mode } = useLocalSearchParams();
  const { notes } = useSelector((state) => state.savedNotes);
  const note = notes.find((task) => task.id.toString() === taskId);

  const { id, title, description, completed, category, dueDate, createdAt } =
    note;
  const dispatch = useDispatch();
  const router = useRouter();

  const [finishDate, setFinishDate] = useState(new Date(dueDate));
  const categories = CategoryTags;
  const [tag, setTag] = useState(category);
  const [editable, SetEditable] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleOnDelete = (notes, id) => {
    const newNotes = notes.filter((task) => task.id.toString() !== id);
    dispatch(setNotes(newNotes));
  };

  const handleOnCompleteTask = () => {
    const updateTasks = notes.map((singleTask) =>
      singleTask.id === id ? { ...singleTask, completed: !completed } : singleTask,
    );
    dispatch(setNotes(updateTasks));
  };
  return (
    <FrameForScreens>
      {/* Back button edit button and delete button - back will be left side and other two will be on right side */}
      <View className="flex-row justify-between my-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center w-20 gap-3">
          <TouchableOpacity
            onPress={() => SetEditable(!editable)}
            className="h-10 w-10 bg-orange-100 justify-center items-center rounded-full"
          >
            {editable || mode === "editable" ? (
              <Entypo name="circle-with-cross" size={24} color="red" />
            ) : (
              <MaterialIcons name="create" size={30} color="green" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="h-10 w-10 bg-orange-200 justify-center items-center rounded-full"
            onPress={() => {
              handleOnDelete(notes, taskId);
              router.pop();
            }}
          >
            <MaterialCommunityIcons name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1">
        {editable || mode === "editable" ? (
          <Formik
            initialValues={{
              title: title,
              description: description,
            }}
            validationSchema={taskSchema}
            onSubmit={(values) => {
              const newTask = {
                id: id,
                title: values.title,
                description: values.description,
                dueDate: finishDate.toISOString().split("T")[0],
                category: tag,
                completed: false,
                createdAt: createdAt,
              };
              const updatedNotes = notes.map((singleTask) =>
                singleTask.id === id ? newTask : singleTask,
              );
              dispatch(setNotes(updatedNotes));
              router.navigate("/(Tabs)/notes");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View className="flex-col mt-4">
                <TextInput
                  className="text-4xl font-header font-bold"
                  placeholder="Note Title"
                  onChangeText={handleChange("title")}
                  value={values.title}
                />

                <View className="h-[45%] border-[1px] border-[#c5c5c5] rounded-lg">
                  <TextInput
                    className="text-xl font-body"
                    placeholder="Note"
                    onChangeText={handleChange("description")}
                    value={values.description}
                    multiline
                    numberOfLines={12}
                  />
                </View>
                {errors.description && (
                  <Text className="ml-2 text-pink-500 text-xs">
                    Note Body Cannot be Empty
                  </Text>
                )}
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="pt-4 max-h-16"
                  contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  alwaysBounceHorizontal={true}
                >
                  {categories.map((category, index) => (
                    <TouchableOpacity
                      onPress={() => setTag(category.name)}
                      key={index}
                      className={`h-12 mx-2 w-32  items-center justify-center rounded-xl border-black-[1px]`}
                      style={{
                        backgroundColor:
                          tag === category.name
                            ? category.activeColor
                            : category.unActiveColor,
                      }}
                    >
                      <Text
                        className={`text-xl font-header font-bold ${tag === category.name ? "text-white" : "text-[#000000]"}  `}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <View className="items-center my-4 ">
                  <View className="bg-blue-300 px-4 rounded-lg  h-20 flex-row items-center justify-between w-[70%] ">
                    <Text className="font-bold font-header ">
                      {finishDate.toLocaleDateString(undefined, {
                        weekday: "short",
                        year:"numeric",
                        month:"short",
                        day:"numeric"
                      })}
                    </Text>
                    <TouchableOpacity
                      className="p-3 bg-gray-100 rounded-lg"
                      onPress={() => setShowDatePicker(true)}
                    >
                      <MaterialIcons
                        name="date-range"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                  {showDatePicker && (
                    <DateTimePicker
                      value={finishDate}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (selectedDate < today) {
                            Alert.alert("DueDate cannot be in past");
                            return;
                          }
                          setFinishDate(selectedDate);
                        }
                      }}
                    />
                  )}

                  <TouchableOpacity
                    className="w-[70%] bg-[#6A3EA1] p-4 items-center rounded-xl mt-4"
                    onPress={() => handleSubmit()}
                  >
                    <Text className="text-white font-bold text-xl">
                      Save Note
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        ) : (
          <View className="">
            <View className="flex-row justify-between">
              <View
                style={{
                  backgroundColor: categories.find(
                    (tag) => tag.name === category,
                  )?.activeColor,
                }}
                className="h-6 w-16 items-center rounded-lg  justify-center border-black-[1px]"
              >
                <Text className="text-sm font-header text-center text-white font-bold">
                  {category}
                </Text>
              </View>
              <View className="items-center flex-row gap-2">
                {completed ? (
                  <FontAwesome name="check" size={24} color="green" />
                ) : (
                  <Ionicons name="timer-outline" size={24} color="orange" />
                )}
                <Text className="font-bold">{completed ? "Completed" : "In Progress"}</Text>
              </View>
            </View>
            <Text className="text-4xl my-4 mb-4 font-header font-bold">
              {title}
            </Text>
            <Text className="text-xl my-10 font-body">{description}</Text>

            <View className="flex-row items-center gap-x-4 ">
              <View>
                <Feather name="calendar" size={24} color="black" />
              </View>

              <View className="">
                <Text className="font-header text-sm">COMPLETE BEFORE</Text>
                <Text>
                  {" "}
                  {new Date(dueDate).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-4 h-15 items-center my-10">
              <AntDesign name="clock-circle" size={24} color="black" />
              <View>
                <Text className="font-header text-sm">CREATED AT</Text>
                <Text>
                  {new Date(createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleOnCompleteTask();
              }}
              className={`${completed ? "bg-[#848484]" : "bg-[#6A3EA1]"} flex-row py-4 justify-center rounded-lg gap-2`}
            >
              <Feather
                name={completed ? "rotate-ccw" : "check-circle"}
                size={24}
                color="white"
              />
              <Text className="text-xl font-header font-bold text-white">
                {completed ? "Mark as Incomplete" : "Mark as Complete"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FrameForScreens>
  );
};

export default TaskInDetail;
