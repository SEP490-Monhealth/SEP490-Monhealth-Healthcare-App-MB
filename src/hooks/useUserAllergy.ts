import { useMutation } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CreateUserAllergyType } from "@/schemas/allergySchema"

import { createUserAllergy } from "@/services/userAllergyService"

export const useCreateUserAllergy = () => {
  const handleError = useError()

  return useMutation<string, Error, CreateUserAllergyType>({
    mutationFn: async (newData) => {
      try {
        return await createUserAllergy(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
