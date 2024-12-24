import React from "react"

import { Container, Content } from "@/components/global/atoms"
import DatePicker from "@/components/global/atoms/DatePicker"
import { Header } from "@/components/global/organisms"

function DateOfBirth() {
  return (
    <Container>
      <Content>
        <Header back label="Thông tin" />
        <DatePicker />
      </Content>
    </Container>
  )
}

export default DateOfBirth
