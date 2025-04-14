import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function SetupPolicy() {
  const router = useRouter()

  const handleSetup = () => {
    router.replace("/(setup)/consultant")
  }

  return (
    <Container>
      <Header label="Chính sách" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={32} className="pb-12">
            <VStack gap={12}>
              <VStack>
                <Text className="font-tbold text-lg text-primary">
                  Quyền lợi của bạn
                </Text>
                <Text className="text-justify font-tregular text-base text-secondary">
                  Chuyên viên tư vấn sẽ nhận được một phần tiền từ mỗi lần{" "}
                  <Text className="font-tbold">người dùng đặt lịch</Text> và
                  hoàn thành qua hệ thống. Số tiền này sẽ được chuyển vào{" "}
                  <Text className="font-tbold">ví của chuyên viên tư vấn</Text>.
                </Text>
              </VStack>

              <VStack>
                <Text className="font-tbold text-lg text-primary">
                  Ví tiền của chuyên viên
                </Text>
                <Text className="text-justify font-tregular text-base text-secondary">
                  Tiền từ các buổi tư vấn sẽ được cộng dồn vào{" "}
                  <Text className="font-tbold">ví của chuyên viên tư vấn</Text>{" "}
                  trong hệ thống. Bạn có thể theo dõi số dư trong ví của mình
                  qua mục <Text className="font-tbold">Thanh Toán</Text> trên
                  ứng dụng.
                </Text>
              </VStack>

              <VStack>
                <Text className="font-tbold text-lg text-primary">
                  Rút tiền
                </Text>
                <Text className="text-justify font-tregular text-base text-secondary">
                  Khi bạn muốn <Text className="font-tbold">rút tiền</Text> từ
                  ví, bạn có thể tạo yêu cầu rút tiền gửi tới hệ thống. Yêu cầu
                  sẽ được <Text className="font-tbold">xử lý</Text> và tiền sẽ
                  được chuyển vào tài khoản của bạn qua các phương thức thanh
                  toán mà hệ thống hỗ trợ, bao gồm{" "}
                  <Text className="font-tbold">chuyển khoản ngân hàng</Text>{" "}
                  hoặc <Text className="font-tbold">ví điện tử</Text>.
                </Text>
              </VStack>

              <VStack>
                <Text className="font-tbold text-lg text-primary">
                  Tỷ lệ phần trăm
                </Text>
                <Text className="text-justify font-tregular text-base text-secondary">
                  Bạn sẽ nhận được phần trăm từ mỗi lần{" "}
                  <Text className="font-tbold">
                    người dùng hoàn thành lịch hẹn
                  </Text>
                  . Tỷ lệ phần trăm này sẽ được tính toán dựa trên các điều
                  khoản của hệ thống và sẽ được thông báo cụ thể khi bạn tham
                  gia hệ thống.
                </Text>
              </VStack>

              <VStack>
                <Text className="font-tbold text-lg text-primary">
                  Điều kiện tham gia
                </Text>
                <Text className="text-justify font-tregular text-base text-secondary">
                  Bạn cần chấp nhận các{" "}
                  <Text className="font-tbold">điều khoản thanh toán</Text> và
                  cam kết tham gia hệ thống với mục đích cung cấp{" "}
                  <Text className="font-tbold">dịch vụ tư vấn</Text> cho người
                  dùng. Bạn cũng cần cập nhật đầy đủ thông tin cá nhân, chứng
                  chỉ và lịch làm việc để hệ thống có thể xử lý các yêu cầu đặt
                  lịch.
                </Text>
              </VStack>

              <VStack>
                <Text className="font-tbold text-lg text-primary">
                  Giải quyết tranh chấp
                </Text>
                <Text className="text-justify font-tregular text-base text-secondary">
                  Nếu bạn gặp vấn đề với việc thanh toán, vui lòng liên hệ với
                  bộ phận hỗ trợ của chúng tôi bằng cách gửi email tới{" "}
                  <Text className="font-tbold">monapp.support@gmail.com</Text>{" "}
                  để được giải quyết.
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>

      <Button size="lg" onPress={handleSetup} className="mb-4">
        Xác nhận
      </Button>
    </Container>
  )
}

export default SetupPolicy
