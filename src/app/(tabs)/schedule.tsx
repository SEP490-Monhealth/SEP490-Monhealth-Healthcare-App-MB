import React, { useState } from "react"

import { Text } from "react-native"

import { Add } from "iconsax-react-native"

import {
  Container,
  Content,
  Schedule,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"

function ScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <Container>
      <Header
        title="Thực đơn"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: "/foods"
        }}
      />

      <Content>
        <ScrollArea>
          <VStack center gap={20} className="mt-4 pb-16">
            <Schedule initialDate={currentDate} />

            <Tabs defaultValue="breakfast" className="w-full">
              <TabsList gap={24}>
                <TabsTrigger value="breakfast">Bữa sáng</TabsTrigger>
                <TabsTrigger value="lunch">Bữa trưa</TabsTrigger>
                <TabsTrigger value="dinner">Bữa tối</TabsTrigger>
                <TabsTrigger value="snack">Bữa phụ</TabsTrigger>
              </TabsList>
              <TabsContent value="breakfast">
                <Text>Content for Bữa sáng</Text>
              </TabsContent>
              <TabsContent value="lunch">
                <Text>Content for Bữa trưa</Text>
              </TabsContent>
              <TabsContent value="dinner">
                <Text>Content for Bữa tối</Text>
              </TabsContent>
              <TabsContent value="snack">
                <Text>Content for Bữa phụ</Text>
              </TabsContent>
            </Tabs>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ScheduleScreen
