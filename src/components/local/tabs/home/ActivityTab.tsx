import { Text, View } from "react-native"

interface ActivityTabProps {
  onLoading: (isLoading: boolean) => void
}

export const ActivityTab = ({ onLoading }: ActivityTabProps) => {
  return (
    <View className="mt-4">
      <Text>asd</Text>
    </View>
  )
}
