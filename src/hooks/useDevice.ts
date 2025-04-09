import { useMutation } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CreateDeviceType } from "@/schemas/deviceSchema"

import { createDevice } from "@/services/deviceService"

export const useCreateDevice = () => {
  const handleError = useError()

  return useMutation<string, Error, CreateDeviceType>({
    mutationFn: async (newData) => {
      try {
        return await createDevice(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
