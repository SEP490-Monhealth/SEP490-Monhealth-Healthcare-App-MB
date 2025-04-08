import React from "react"

import { Text, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

import { useAuth } from "@/contexts/AuthContext"

import { useCompletePayment } from "@/hooks/usePayment"

import { whoIAm } from "@/services/authService"

const PaymentResult = () => {
  const router = useRouter()
  const params = useLocalSearchParams()

  const { user, setUser } = useAuth()
  const userId = user?.userId

  console.log("Params từ PayOS:", params)

  const isCancel = params.cancel === "true"
  const isSuccess = params.code === "00" && params.status === "PAID"

  const { mutate: completePayment } = useCompletePayment()

  const handleDone = async () => {
    // await completePayment(params.id, {
    //   onSuccess: async () => {
    //     const updatedUser = await whoIAm()
    //     setUser(updatedUser)
    //     router.replace(`/settings/user/${userId}/information`)
    //   }
    // })
  }

  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        {isSuccess ? (
          <ErrorDisplay
            imageSource={require("../../../../public/images/monhealth-congratulations-image.png")}
            title="Thanh toán thành công"
            description="Bạn đã thanh toán thành công cho gói đăng ký của mình!"
          />
        ) : (
          <ErrorDisplay
            imageSource={require("../../../../public/images/monhealth-internal-server-error-image.png")}
            title="Thanh toán thất bại"
            description="Thanh toán của bạn không thành công, vui lòng thử lại."
          />
        )}
      </View>

      <Button size="lg" onPress={handleDone} className="mb-4">
        Hoàn thành
      </Button>
    </Container>
  )
}

export default PaymentResult
