import { StyleSheet, View } from "react-native"

import { Text } from "@/components/nativewindui/Text"

export default function EditScreenInfo({ path }: { path: string }) {
  const title = "Open up the code for this screen:"
  const description = "Change any of the text, save the file, and your app will automatically update."

  return (
    <View style={styles.getStartedContainer}>
      <Text variant="heading" className="text-center">
        {title}
      </Text>
      <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
        <Text>{path}</Text>
      </View>
      <Text variant="body" className="text-center">
        {description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  helpContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    textAlign: "center"
  },
  homeScreenFilename: {
    marginVertical: 7
  }
})
