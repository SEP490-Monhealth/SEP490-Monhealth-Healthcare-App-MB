import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

type ShowMoreSectionProps = {
  titleMore: string
  titleHidden: string
  children: React.ReactNode
  initiallyVisible?: boolean
}

const ShowMoreSection: React.FC<ShowMoreSectionProps> = ({
  titleMore,
  titleHidden,
  children,
  initiallyVisible = false
}) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible)

  return (
    <View>
      {isVisible && <View>{children}</View>}

      <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
        <Text className="mt-4 text-center font-tmedium text-primary">
          {isVisible ? `${titleHidden}` : `${titleMore}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ShowMoreSection
