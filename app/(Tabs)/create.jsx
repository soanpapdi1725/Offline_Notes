import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import FrameForScreens from "../../components/frameForScreens";
import { CategoryTags } from "../../constants/Category";
import { createNotes } from "../../Store/Slices/notesSlice";

let taskSchema = object({
  title: string(),
  description: string().required(),
});

const Create = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = CategoryTags;
  const [tag, setTag] = useState("None");
  return (
    <FrameForScreens>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={taskSchema}
        onSubmit={(values) => {
          const newTask = {
            id: Date.now(),
            title: values.title,
            description: values.description,
            dueDate: dueDate.toISOString().split("T")[0],
            category: tag,
            completed: false,
            createdAt: Date.now(),
          };

          dispatch(createNotes(newTask));
          values.title = "";
          values.description = "";
          values.title = "";
          setTag("None");
          router.navigate("/notes");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View className="flex-col mt-4">
            <TextInput
              className="text-4xl h-20 text-[#292929] font-header font-bold"
              placeholder="Note Title"
              onChangeText={handleChange("title")}
              value={values.title}
            />

            <View className="h-[45%] border-[1px] border-[#c5c5c5] rounded-lg">
              <TextInput
                className="text-xl text-[#333131] font-body"
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
              <View className="bg-blue-400 px-4 rounded-lg h-20 flex-row items-center justify-between w-[70%]">
                <Text className="font-bold font-header text-white">
                  {new Date(dueDate).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </Text>
                <TouchableOpacity
                  className="p-3 bg-gray-100 rounded-lg "
                  onPress={() => setShowDatePicker(true)}
                >
                  <MaterialIcons name="date-range" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={dueDate}
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
                      setDueDate(selectedDate);
                    }
                  }}
                />
              )}

              <TouchableOpacity
                className="w-[90%] bg-[#6A3EA1] p-4 items-center rounded-xl mt-4"
                onPress={() => handleSubmit()}
              >
                <Text className="text-xl font-header font-bold text-white">Save Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </FrameForScreens>
  );
};

export default Create;
