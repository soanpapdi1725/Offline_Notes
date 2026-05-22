import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Empty from "../../components/Empty";
import FrameForScreens from "../../components/frameForScreens";
import TaskCard from "../../components/TaskCard";
import { CategoryTags } from "../../constants/Category";

const Notes = () => {
  const categories = CategoryTags;
  const [tag, setTag] = useState("None");
  const { notes } = useSelector((state) => state.savedNotes);
  const filteredTask =
    tag === "None"
      ? notes
      : notes.filter((singleTask) => singleTask.category === tag);
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(null);
  return (
    <FrameForScreens>
      <View className="flex-row justify-between">
        <Text className="font-header ml-1 text-4xl font-bold">Notes</Text>
      </View>
      <ScrollView
        className=""
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
      >
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
                {category.name === "None" ? "All" : category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredTask.length > 0 ? (
          <FlatList
            data={filteredTask}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskCard
                SingleTask={item}
                setShowButtons={setShowButtons}
                showButtons={showButtons}
              />
            )}
            numColumns={2}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              marginBottom: 10,
              gap: 15,
              marginLeft: 5,
            }}
            className="mt-2 pb-32"
          />
        ) : (
          <Empty tag={tag} />
        )}
      </ScrollView>
    </FrameForScreens>
  );
};

export default Notes;
