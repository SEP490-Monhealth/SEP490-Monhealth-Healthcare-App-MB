import { useMutation, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { CreateMessageType } from "@/schemas/messageSchema"

import { createMessage } from "@/services/messageService"

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
