import React, { useCallback, useEffect } from "react"

import { Dimensions } from "react-native"
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg"

import { COLORS } from "@/constants/color"

import { WeeklyMealType } from "@/schemas/reportSchema"

const screenWidth = Dimensions.get("window").width
const AnimatedRect = Animated.createAnimatedComponent(Rect)

const AnimatedBar = ({
  x,
  barWidth,
  maxBarHeight,
  paddingTop,
  value,
  maxValue,
  isSelected,
  onPress,
  minBarHeight,
  dateString
}: {
  x: number
  barWidth: number
  maxBarHeight: number
  paddingTop: number
  value: number
  maxValue: number
  isSelected: boolean
  onPress: (dateString: string) => void
  minBarHeight: number
  dateString: string
}) => {
  const animatedHeight = useSharedValue(0)

  useEffect(() => {
    const targetHeight =
      value === 0 ? minBarHeight : value * (maxBarHeight / maxValue)

    animatedHeight.value = withTiming(targetHeight, {
      duration: 500,
      easing: Easing.out(Easing.ease)
    })

    return () => {
      cancelAnimation(animatedHeight)
    }
  }, [value, maxValue, maxBarHeight, animatedHeight, minBarHeight])

  const animatedProps = useAnimatedProps(() => ({
    height: animatedHeight.value,
    y: maxBarHeight - animatedHeight.value + paddingTop
  }))

  const barColor = isSelected ? COLORS.primary : COLORS.border
  const touchableHeight = 48
  const touchableY = maxBarHeight - touchableHeight + paddingTop

  const handlePress = useCallback(() => {
    onPress(dateString)
  }, [onPress, dateString])

  return (
    <React.Fragment>
      {value === 0 && (
        <Rect
          x={x}
          y={touchableY}
          width={barWidth}
          height={touchableHeight}
          fill="transparent"
          onPress={handlePress}
        />
      )}
      <AnimatedRect
        x={x}
        width={barWidth}
        fill={barColor}
        rx={8}
        animatedProps={animatedProps}
        onPress={value > 0 ? handlePress : undefined}
      />
    </React.Fragment>
  )
}

interface BarChartProps {
  labels: string[]
  data: WeeklyMealType[]
  selectedDate: string
  onSelectDate?: (selectedDate: string) => void
}

export const BarChart = ({
  data,
  labels,
  selectedDate,
  onSelectDate
}: BarChartProps) => {
  const barWidth = 28
  const spacing = 14
  const maxBarHeight = 160
  const paddingTop = 40
  const paddingBottom = 20
  const chartHeight = maxBarHeight + paddingBottom + paddingTop
  const minBarHeight = 2
  const dynamicPadding = screenWidth * 0.16

  const maxDataValue = Math.max(...data.map((item) => item.calories), 1)
  let step = 100
  if (maxDataValue >= 600) step = 200
  if (maxDataValue >= 2000) step = 500
  const roundedMaxValue = Math.ceil(maxDataValue / step) * step

  const yAxisValues = []
  for (let i = 0; i <= Math.min(5, Math.ceil(roundedMaxValue / step)); i++) {
    yAxisValues.push(i * step)
  }
  if (!yAxisValues.includes(roundedMaxValue)) {
    yAxisValues.push(roundedMaxValue)
  }

  const getYAxisPosition = useCallback(
    (value: number) => {
      return (
        maxBarHeight - (value / roundedMaxValue) * maxBarHeight + paddingTop
      )
    },
    [roundedMaxValue]
  )

  const handleBarPress = useCallback(
    (dateString: string) => {
      if (onSelectDate) {
        onSelectDate(dateString)
      }
    },
    [onSelectDate]
  )

  return (
    <Svg width={screenWidth} height={chartHeight}>
      {yAxisValues.map((value, index) => {
        const y = getYAxisPosition(value)
        return (
          <React.Fragment key={`axis-${index}`}>
            <Line
              x1={8}
              y1={y}
              x2={screenWidth - dynamicPadding + 12}
              y2={y}
              stroke={COLORS.border}
              strokeWidth={1}
            />
            <SvgText
              x={12}
              y={y - 4}
              fontFamily="TikTokText-Medium"
              fontSize="12"
              fontWeight="600"
              fill={COLORS.primary}
              textAnchor="start"
            >
              {value}
            </SvgText>
          </React.Fragment>
        )
      })}

      {data.map((item, index) => {
        const x = index * (barWidth + spacing) + dynamicPadding
        const dateString = item.date.split("T")[0]
        const isSelected = dateString === selectedDate

        return (
          <AnimatedBar
            key={`bar-${index}-${dateString}`}
            x={x}
            barWidth={barWidth}
            maxBarHeight={maxBarHeight}
            paddingTop={paddingTop}
            value={item.calories}
            maxValue={roundedMaxValue}
            isSelected={isSelected}
            onPress={handleBarPress}
            minBarHeight={minBarHeight}
            dateString={dateString}
          />
        )
      })}

      {labels.map((label, index) => {
        const x = index * (barWidth + spacing) + dynamicPadding
        return (
          <SvgText
            key={`label-${index}`}
            x={x + barWidth / 2}
            y={chartHeight}
            fontFamily="TikTokText-Medium"
            fontSize="12"
            fontWeight="500"
            fill={COLORS.primary}
            textAnchor="middle"
          >
            {label}
          </SvgText>
        )
      })}
    </Svg>
  )
}
