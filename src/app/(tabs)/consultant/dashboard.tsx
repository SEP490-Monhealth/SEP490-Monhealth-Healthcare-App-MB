import React from "react"

import { Text, View } from "react-native"

import { Container } from "@/components/global/atoms"

import { HomeHeader } from "@/components/local/tabs/home"

import { useAuth } from "@/contexts/AuthContext"

function DashboardScreen() {
  const { user } = useAuth()
  const fullName = user?.fullName

  return (
    <Container>
      <HomeHeader fullName={fullName} />

      <Text>DashboardScreen</Text>
    </Container>
  )
}

export default DashboardScreen
