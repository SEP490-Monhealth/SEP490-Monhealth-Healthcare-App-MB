import React, { useEffect, useState } from "react"

import { Dimensions } from "react-native"
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg"

import { COLORS } from "@/constants/color"

const screenWidth = Dimensions.get("window").width

const AnimatedRect = Animated.createAnimatedComponent(Rect)

interface BarChartProps {
  date: string
  labels: string[]
  data: { date: string; calories: number }[]
}

export const BarChart = ({ date, data, labels }: BarChartProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(date)
  const [tooltip, setTooltip] = useState<{
    x: number
    y: number
    value: number | null
  } | null>(null)

  const barWidth = 28
  const spacing = 14
  const maxBarHeight = 160
  const paddingTop = 40
  const paddingBottom = 20
  const chartHeight = maxBarHeight + paddingBottom + paddingTop

  const maxDataValue = Math.max(...data.map((item) => item.calories), 1)

  let step = 100

  if (maxDataValue >= 600) step = 200
  if (maxDataValue >= 2000) step = 500

  const roundedMaxValue = Math.ceil(maxDataValue / step) * step

  const yAxisValues = Array.from(
    { length: Math.min(6, Math.ceil(roundedMaxValue / step) + 1) },
    (_, i) => i * step
  )

  if (!yAxisValues.includes(roundedMaxValue)) yAxisValues.push(roundedMaxValue)

  const getYAxisPosition = (value: number) => {
    return maxBarHeight - (value / roundedMaxValue) * maxBarHeight + paddingTop
  }

  const dynamicPadding = screenWidth * 0.16

  const animatedHeights = data.map(() => useSharedValue(0))

  useEffect(() => {
    data.forEach((value, index) => {
      animatedHeights[index].value = withTiming(
        value.calories * (maxBarHeight / roundedMaxValue),
        {
          duration: 500,
          easing: Easing.out(Easing.ease)
        }
      )
    })
  }, [data])

  const handleBarPress = (index: number) => {
    const selected = data[index].date
    const x = index * (barWidth + spacing) + dynamicPadding
    const y = maxBarHeight - animatedHeights[index].value + paddingTop

    setSelectedDate(selected)
    setTooltip({ x, y, value: data[index].calories })
  }

  return (
    <Svg width={screenWidth} height={chartHeight}>
      {yAxisValues.map((value, index) => {
        const y = getYAxisPosition(value)

        return (
          <React.Fragment key={index}>
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
        const isToday = item.date === selectedDate
        const barColor = isToday ? COLORS.primary : COLORS.border

        const animatedProps = useAnimatedProps(() => ({
          height: animatedHeights[index].value,
          y: maxBarHeight - animatedHeights[index].value + paddingTop
        }))

        return (
          <AnimatedRect
            key={index}
            x={x}
            width={barWidth}
            fill={barColor}
            rx={8}
            animatedProps={animatedProps}
            onPress={() => handleBarPress(index)}
          />
        )
      })}

      {data.map((_, index) => {
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
            {labels[index]}
          </SvgText>
        )
      })}

      {tooltip && tooltip.value !== null && (
        <React.Fragment>
          <Rect
            x={tooltip.x - 65}
            y={tooltip.y - 20}
            width={80}
            height={30}
            fill="#fff"
            rx={5}
          />
          <SvgText
            x={tooltip.x - 40}
            y={tooltip.y + 0}
            fontFamily="TikTokText-Medium"
            fontSize="12"
            fontWeight="500"
            fill={COLORS.primary}
            textAnchor="middle"
          >
            {tooltip.value} kcal
          </SvgText>
        </React.Fragment>
      )}
    </Svg>
  )
}
