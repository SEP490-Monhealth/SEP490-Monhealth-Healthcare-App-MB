import React from "react"

import { View } from "react-native"
import { FlatList } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import { ListFooter, WaterCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleWaterData } from "@/constants/water"

function ReminderScreen() {
  const waterData = sampleWaterData

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
          data={waterData || []}
          keyExtractor={(item) => item.waterIntakeId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WaterCard
              key={item.waterIntakeId}
              waterIntakeId={item.waterIntakeId}
              amount={item.amount}
              time={item.time}
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
