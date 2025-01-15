import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"

function AssistantScreen() {
  const router = useRouter()

  const handleViewSignUp = () => {
    router.push("/test/consultant-sign-up")
  }

  const handleViewCertificate = () => {
    router.push("/test/certification")
  }

  const handleViewService = () => {
    router.push("/test/service")
  }

  const handleViewImageUpload = () => {
    router.push("/test/image-upload")
  }

  return (
    <Container>
      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Button size="lg" onPress={handleViewSignUp}>
            Đăng kí consultant
          </Button>

          <Button size="lg" onPress={handleViewCertificate}>
            Chứng chỉ
          </Button>

          <Button size="lg" onPress={handleViewService}>
            Dịch vụ
          </Button>

          <Button size="lg" onPress={handleViewImageUpload}>
            Upload ảnh
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}
export default AssistantScreen
