import React, { useRef, useState } from "react"

import { Text, View } from "react-native"

import {
  Container,
  HStack,
  Input,
  Select,
  SheetRefProps
} from "@/components/global/atoms"

const PortionCreateScreen = () => {
  const [query, setQuery] = useState("")

  const SheetRef = useRef<SheetRefProps>(null)

  const openSheet = () => {
    SheetRef.current?.scrollTo(-300)
  }

  return (
    <Container>
      <HStack center gap={8}>
        <View style={{ flex: 1 }}>
          <Input
            value={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="1"
            keyboardType="numeric"
            clearText={false}
          />
        </View>

        <View style={{ flex: 4 }}>
          <Select
            defaultValue="Chọn khẩu phần ăn"
            value="chén (100 g)"
            onPress={openSheet}
          />
        </View>
      </HStack>
    </Container>
  )
}

export default PortionCreateScreen
