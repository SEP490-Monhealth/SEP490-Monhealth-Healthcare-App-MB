import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Chip } from "@/components/global/atoms";
import { FrequencyActivityType } from "@/constants/frequency";
import { COLORS } from "@/constants/app";

interface ActivityProps {
  activitiesData: FrequencyActivityType[];
}

const ActivityLevel = ({ activitiesData }: ActivityProps) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleSelectCategory = (activityTitle: string) => {
    setSelectedActivity(activityTitle);
    console.log(activityTitle);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {activitiesData.map((activity) => {
        const IconComponent = activity.icon;
        return (
          <Chip
            key={activity.title}
            label={activity.title}
            border={true}
            size="xl"
            icon={<IconComponent size={28} color={COLORS.primary}/>}
            selected={selectedActivity === activity.title}
            onPress={() => handleSelectCategory(activity.title)}
            className="mb-10"
          />
        );
      })}
    </ScrollView>
  );
};

export default ActivityLevel;
