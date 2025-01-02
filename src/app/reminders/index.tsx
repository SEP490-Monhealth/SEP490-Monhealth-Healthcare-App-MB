import React from "react"

import { View } from "react-native"
import { FlatList } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import { ListFooter, WaterCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleWaterData } from "@/constants/water"

function UpdateNotificationScreen() {
  const { items } = sampleWaterData

  return (
    <Container>
      <Header
        back
        label="Cập nhật"
        action={{
          icon: <Add variant="Outline" size={22} color={COLORS.primary} />,
          url: "/reminders/create"
        }}
      />

      <Content className="mt-2">
        <FlatList
          data={items || []}
          keyExtractor={(item) => item.waterIntakeId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WaterCard
              variant="more"
              key={item.waterIntakeId}
              waterIntakeId={item.waterIntakeId}
              volume={item.volume}
              intakeTime={item.intakeTime}
              status={item.status}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default ReminderScreen
