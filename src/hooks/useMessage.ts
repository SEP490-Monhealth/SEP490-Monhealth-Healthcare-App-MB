import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { CreateMessageType, MessageType } from "@/schemas/messageSchema"

import { createMessage, getMessagesByChatId } from "@/services/messageService"

export const useGetMessagesByChatId = (chatId: string | undefined) => {
  const handleError = useError()

  return useQuery<MessageType[], Error>({
    queryKey: [MonQueryKey.Message.Messages, chatId],
    queryFn: async () => {
      try {
        return await getMessagesByChatId(chatId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateMessage = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, CreateMessageType>({
    mutationFn: async (newData) => {
      try {
        return await createMessage(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Message.Messages]
      })
    }
  })
}
