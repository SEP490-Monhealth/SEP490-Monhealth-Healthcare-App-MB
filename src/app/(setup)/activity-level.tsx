import React, { useState } from "react"

import {
  Calendar,
  Calendar2,
  CalendarCircle,
  CalendarRemove
} from "iconsax-react-native"

import { Chip, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function ActivityLevelScreen() {
  const activityLevelsData = [
    {
      label: "0 buổi / tuần",
      value: 1.2,
      icon: CalendarRemove
    },
    {
      label: "1 - 3 buổi / tuần",
      value: 1.375,
      icon: Calendar2
    },
    {
      label: "3 - 5 buổi / tuần",
      value: 1.55,
      icon: Calendar
    },
    {
      label: "6 - 7 buổi / tuần",
      value: 1.725,
      icon: CalendarCircle
    }
  ]

  const [selectedActivity, setSelectedActivity] = useState(1.2)

  const handleSelectActivity = (value: number) => {
    setSelectedActivity(value)
    console.log(value)
  }

  return (
    <Container>
      <Header back label="Thông tin" />

      <Content>
        <VStack gap={12} className="mt-2">
          {activityLevelsData.map((activity) => {
            const Icon = activity.icon

            return (
              <Chip
                key={activity.label}
                label={activity.label}
                border={true}
                borderWidth={2}
                size="lg"
                icon={
                  <Icon
                    size={28}
                    color={
                      selectedActivity === activity.value
                        ? COLORS.primary
                        : COLORS.accent
                    }
                  />
                }
                selected={selectedActivity === activity.value}
                onPress={() => handleSelectActivity(activity.value)}
              />
            )
          })}
        </VStack>
      </Content>
    </Container>
  )
}

export default ActivityLevelScreen
