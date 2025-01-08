import { Text, View } from "react-native"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

interface ActivityTabProps {
  onLoading: (isLoading: boolean) => void
}

export const ActivityTab = ({ onLoading }: ActivityTabProps) => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  return (
    <View className="mt-6 h-full">
      <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

      <Text>asd</Text>
    </View>
  )
}
