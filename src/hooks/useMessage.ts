import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CreateMessageType, MessageType } from "@/schemas/messageSchema"

import { createMessage, getMessagesByChatId } from "@/services/messageService"

interface MessageResponse {
  messages: MessageType[]
  totalPages: number
  totalItems: number
}

export const useGetMessagesByChatId = (
  chatId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<MessageResponse, Error>({
    queryKey: ["messages", chatId, page, limit],
    queryFn: async () => {
      try {
        return await getMessagesByChatId(chatId, page, limit)
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
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    }
  })
}
