import React from "react"

import { Avatar, Container } from "@/components/global/atoms"

function ProfileScreen() {
  const defaultAvatar =
    ""

  return (
    <Container>
      <Avatar
        source={defaultAvatar}
        alt="Zotaeus"
        size={120}
        className="items-center"
      />
    </Container>
  )
}

export default ProfileScreen
