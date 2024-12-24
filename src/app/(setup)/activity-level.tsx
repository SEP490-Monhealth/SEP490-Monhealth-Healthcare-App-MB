import React from "react"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import ActivityLevel from "@/components/local/activities/ActivityLevel"

import { frequencyActivityData } from "@/constants/frequency"

function FrequencyActivity() {
  return (
    <Container>
      <Content>
        <Header back title="Thông tin" />
        <ActivityLevel activitiesData={frequencyActivityData} />
      </Content>
    </Container>
  )
}

export default FrequencyActivity
