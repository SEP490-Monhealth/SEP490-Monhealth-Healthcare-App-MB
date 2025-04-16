import React, { useEffect } from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Button,
  Chip,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { sampleAllergiesData } from "@/constants/data/allergies"

import { useStorage } from "@/contexts/StorageContext"

import {
  useGetAllergiesByUserId,
  useUpdateUserAllergy
} from "@/hooks/useAllergy"

import {
  UpdateUserAllergyType,
  updateUserAllergySchema
} from "@/schemas/allergySchema"

function UpdateUserAllergyScreen() {
  const router = useRouter()
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { addAllergies } = useStorage()

  const allergiesData = sampleAllergiesData

  const { data: userAllergiesData, isLoading: isUserAllergiesLoading } =
    useGetAllergiesByUserId(userId)

  // console.log(userAllergiesData)

  const { mutate: updateUserAllergy } = useUpdateUserAllergy()

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUserAllergyType>({
    resolver: zodResolver(updateUserAllergySchema),
    defaultValues: {
      allergies: []
    }
  })

  useEffect(() => {
    if (userAllergiesData) {
      const selectedAllergies = userAllergiesData.map((allergy) => allergy.name)
      setValue("allergies", selectedAllergies)
    }
  }, [userAllergiesData, setValue])

  const selectedAllergies = watch("allergies") || []

  const handleSelectAllergies = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      setValue(
        "allergies",
        selectedAllergies.filter((item) => item !== allergy)
      )
    } else {
      setValue("allergies", [...selectedAllergies, allergy])
    }
  }

  const onSubmit = async (data: UpdateUserAllergyType) => {
    // console.log(JSON.stringify(data, null, 2))

    updateUserAllergy(
      { userId, updatedData: data },
      {
        onSuccess: () => {
          addAllergies(data.allergies)
          router.back()
        }
      }
    )
  }

  if (!userAllergiesData || isUserAllergiesLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Cập nhật dị ứng" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={12} className="pb-12">
            {allergiesData?.map((allergy) => (
              <Chip
                key={allergy.allergyId}
                size="lg"
                border
                borderWidth={2}
                label={allergy.name}
                description={allergy.description}
                selected={selectedAllergies.includes(allergy.name)}
                onPress={() => handleSelectAllergies(allergy.name)}
              />
            ))}
          </VStack>
        </ScrollArea>

        <Button onPress={handleSubmit(onSubmit)} className="mb-4">
          Cập nhật
        </Button>
      </Content>
    </Container>
  )
}

export default UpdateUserAllergyScreen
