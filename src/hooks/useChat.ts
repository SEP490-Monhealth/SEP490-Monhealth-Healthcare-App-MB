import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import {
  ChatType,
  CreateChatMonAIType,
  CreateChatType
} from "@/schemas/chatSchema"

import {
  createChat,
  createChatMonAI,
  getChatById,
  getChatsByConsultantId,
  getChatsByUserId
} from "@/services/chatService"

interface ChatResponse {
  chats: ChatType[]
  totalPages: number
  totalItems: number
}

export const useGetChatsByUserId = (
  userId: string | undefined,
  page: number,
  limit?: number,
  search?: string
) => {
  const handleError = useError()

  return useQuery<ChatResponse, Error>({
    queryKey: [MonQueryKey.Chat.UserChats, userId],
    queryFn: async () => {
      try {
        return await getChatsByUserId(userId, page, limit, search)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetChatsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  search?: string
) => {
  const handleError = useError()

  return useQuery<ChatResponse, Error>({
    queryKey: [MonQueryKey.Chat.ConsultantChats, consultantId],
    queryFn: async () => {
      try {
        return await getChatsByConsultantId(consultantId, page, limit, search)
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
    queryKey: [MonQueryKey.Chat.Chat, chatId],
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

export const useCreateChat = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<
    { message: string; data: { chatId: string } },
    Error,
    CreateChatType
  >({
    mutationFn: async (newData) => {
      try {
        return await createChat(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Chat.UserChats] })
    }
  })
}

export const useCreateChatMonAI = () => {
  const handleError = useError()

  return useMutation<string, Error, CreateChatMonAIType>({
    mutationFn: async (newData) => {
      try {
        return await createChatMonAI(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
