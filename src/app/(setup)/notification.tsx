import React from "react"

import { FlatList, View } from "react-native"

import { Setting4 } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ArcProgress,
  ListFooter,
  ListHeader,
  WaterCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleWaterData } from "@/constants/water"

function NotificationScreen() {
  const waterData = sampleWaterData

  const totalWater = 2000
  const drank = 1300
  const progress = Math.min((drank / totalWater) * 100, 100)

  return (
    <Container>
      <Header
        back
        label="Lịch nhắc nhở"
        action={{
          icon: <Setting4 variant="Bold" size={20} color={COLORS.primary} />,
          url: "/update-notification"
        }}
      />

      <Content className="mt-2">
        <FlatList
          data={waterData || []}
          keyExtractor={(item) => item.waterIntakeId}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader>
              <ArcProgress
                size={240}
                width={14}
                fill={progress}
                arcSweepAngle={260}
                rotation={230}
                centerCircle
                value={drank}
                maxValue={totalWater}
                label="ml"
              />
              <Section label="Nhắc nhở mỗi ngày" />
            </ListHeader>
          )}
          renderItem={({ item }) => (
            <WaterCard
              buttonMore={false}
              buttonSwitch={true}
              key={item.waterIntakeId}
              waterIntakeId={item.waterIntakeId}
              amount={item.amount}
              time={item.time}
              status={item.status}
              onToggleChange={(data) => {
                console.log(data)
              }}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default NotificationScreen
