import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { ChatType } from "@/schemas/chatSchema"

import { getChatById, getChatsByUserId } from "@/services/chatService"

export const useGetChatsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<ChatType[], Error>({
    queryKey: ["chats-user", userId],
    queryFn: async () => {
      try {
        return await getChatsByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetChatsByConsultantId = (consultantId: string | undefined) => {
  const handleError = useError()

  return useQuery<ChatType[], Error>({
    queryKey: ["chats-consultant", consultantId],
    queryFn: async () => {
      try {
        return await getChatsByUserId(consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetChatById = (chatId: string | undefined) => {
  const handleError = useError()

  return useQuery<ChatType, Error>({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      try {
        return await getChatById(chatId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5
  })
}
