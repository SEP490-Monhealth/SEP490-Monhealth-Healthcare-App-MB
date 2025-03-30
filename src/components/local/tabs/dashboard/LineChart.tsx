import React, { useEffect, useState } from "react"

import { Dimensions } from "react-native"
import Svg, {
  Circle,
  Line,
  Polyline,
  Rect,
  Text as SvgText
} from "react-native-svg"

import { COLORS } from "@/constants/color"

const screenWidth = Dimensions.get("window").width

const formatCurrency = (value: number): string => {
  if (value === 0) return "0"
  if (value >= 1000000) {
    const formattedValue = value / 1000000
    const integerPart = Math.floor(formattedValue)
    const decimalPart = Math.round((formattedValue - integerPart) * 10)
    return decimalPart === 0
      ? `${integerPart}tr`
      : `${integerPart}tr${decimalPart}`
  }
  return `${(value / 1000).toFixed(0)}k`
}

interface LineChartProps {
  date: string
  labels: string[]
  data: { date: string; amount: number }[]
}

export const LineChart = ({ date, data, labels }: LineChartProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(date)
  const [tooltip, setTooltip] = useState<{
    x: number
    y: number
    value: number | null
  } | null>(null)

  const maxBarHeight = 160
  const paddingTop = 40
  const paddingBottom = 20
  const chartHeight = maxBarHeight + paddingBottom + paddingTop

  // Kiểm tra nếu tất cả các giá trị trong data đều là 0
  const allZero = data.every((item) => item.amount === 0)

  // Nếu tất cả đều là 0, đặt maxDataValue mặc định là 2000000 (2tr)
  const maxDataValue = allZero
    ? 2000000
    : Math.max(...data.map((item) => item.amount), 1)

  let step = 100000 // Mốc tiền (100,000 VND)

  if (maxDataValue >= 600000) step = 200000
  if (maxDataValue >= 2000000) step = 500000

  const roundedMaxValue = allZero
    ? 2000000 // Nếu tất cả đều là 0, hiển thị mốc tối đa là 2tr
    : Math.ceil(maxDataValue / step) * step

  const yAxisValues = Array.from(
    { length: Math.min(6, Math.ceil(roundedMaxValue / step) + 1) },
    (_, i) => i * step
  )

  if (!yAxisValues.includes(roundedMaxValue)) yAxisValues.push(roundedMaxValue)

  const getYAxisPosition = (value: number) => {
    return maxBarHeight - (value / roundedMaxValue) * maxBarHeight + paddingTop
  }

  const dynamicPadding = screenWidth * 0.16

  const points = data
    .map((item, index) => {
      const x =
        index * ((screenWidth - dynamicPadding * 2) / (data.length - 1)) +
        dynamicPadding
      const y =
        maxBarHeight -
        (item.amount / roundedMaxValue) * maxBarHeight +
        paddingTop
      return `${x},${y}`
    })
    .join(" ")

  useEffect(() => {
    const index = data.findIndex((item) => item.date === date)
    if (index !== -1) {
      const x =
        index * ((screenWidth - dynamicPadding * 2) / (data.length - 1)) +
        dynamicPadding
      const y =
        maxBarHeight -
        (data[index].amount / roundedMaxValue) * maxBarHeight +
        paddingTop

      setTooltip({ x, y, value: data[index].amount })
    }
  }, [date, data])

  const handlePointPress = (index: number) => {
    const selected = data[index].date
    const x =
      index * ((screenWidth - dynamicPadding * 2) / (data.length - 1)) +
      dynamicPadding
    const y =
      maxBarHeight -
      (data[index].amount / roundedMaxValue) * maxBarHeight +
      paddingTop

    setSelectedDate(selected)
    setTooltip({ x, y, value: data[index].amount })
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
              {formatCurrency(value)}
            </SvgText>
          </React.Fragment>
        )
      })}

      <Polyline
        points={points}
        fill="none"
        stroke={COLORS.primary}
        strokeWidth={2.5}
      />

      {data.map((item, index) => {
        const x =
          index * ((screenWidth - dynamicPadding * 2) / (data.length - 1)) +
          dynamicPadding
        const y =
          maxBarHeight -
          (item.amount / roundedMaxValue) * maxBarHeight +
          paddingTop
        const isToday = item.date === selectedDate
        const pointColor = isToday ? COLORS.primary : COLORS.border

        return (
          <Circle
            key={index}
            cx={x}
            cy={y}
            r={6}
            fill={pointColor}
            onPress={() => handlePointPress(index)}
          />
        )
      })}

      {data.map((_, index) => {
        const x =
          index * ((screenWidth - dynamicPadding * 2) / (data.length - 1)) +
          dynamicPadding

        return (
          <SvgText
            key={`label-${index}`}
            x={x}
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
            x={tooltip.x - 50}
            y={tooltip.y - 30}
            width={50}
            height={30}
            fill="#fff"
            rx={5}
          />
          <SvgText
            x={tooltip.x - 25}
            y={tooltip.y - 10}
            fontFamily="TikTokText-Medium"
            fontSize="12"
            fontWeight="500"
            fill={COLORS.primary}
            textAnchor="middle"
          >
            {formatCurrency(tooltip.value)}
          </SvgText>
        </React.Fragment>
      )}
    </Svg>
  )
}
