import React from "react"

import { Dimensions } from "react-native"
import Svg, { Circle, Line, Polyline, Text as SvgText } from "react-native-svg"

import { COLORS } from "@/constants/color"

import { toFixed } from "@/utils/formatters"

const screenWidth = Dimensions.get("window").width

interface LineChartProps {
  date: string
  labels: string[]
  data: { date: string; weight: number }[]
}

export const LineChart = ({ date, labels, data }: LineChartProps) => {
  const maxBarHeight = 160
  const paddingTop = 40
  const paddingBottom = 20
  const chartHeight = maxBarHeight + paddingBottom + paddingTop

  const allZero = data.every((item) => item.weight === 0)

  const minDataValue = allZero
    ? 0
    : Math.min(...data.map((item) => item.weight))
  const maxDataValue = allZero
    ? 100
    : Math.max(...data.map((item) => item.weight))

  let step = 5

  const chartMin = Math.max(0, Math.floor(minDataValue / step) * step - step)
  const chartMax = Math.ceil(maxDataValue / step) * step + step

  const yAxisValues = []
  for (let i = chartMin; i <= chartMax; i += step) {
    yAxisValues.push(i)
  }

  const limitedYAxisValues =
    yAxisValues.length > 6
      ? yAxisValues.filter(
          (_, i) =>
            i % Math.ceil(yAxisValues.length / 6) === 0 ||
            i === yAxisValues.length - 1
        )
      : yAxisValues

  const getYAxisPosition = (value: number) => {
    return (
      maxBarHeight -
      ((value - chartMin) / (chartMax - chartMin)) * maxBarHeight +
      paddingTop
    )
  }

  const dynamicPadding = screenWidth * 0.16

  const getPoints = (dataPoints: { date: string; weight: number }[]) => {
    return dataPoints
      .map((item, index) => {
        const x =
          index *
            ((screenWidth - dynamicPadding * 2) / (dataPoints.length - 1)) +
          dynamicPadding
        const y =
          maxBarHeight -
          ((item.weight - chartMin) / (chartMax - chartMin)) * maxBarHeight +
          paddingTop
        return `${x},${y}`
      })
      .join(" ")
  }

  const polylinePoints = getPoints(data)

  const selectedIndex = data.findIndex((item) => item.date === date)
  const selectedPoint =
    selectedIndex !== -1
      ? {
          x:
            selectedIndex *
              ((screenWidth - dynamicPadding * 2) / (data.length - 1)) +
            dynamicPadding,
          y:
            maxBarHeight -
            ((data[selectedIndex].weight - chartMin) / (chartMax - chartMin)) *
              maxBarHeight +
            paddingTop,
          value: data[selectedIndex].weight
        }
      : null

  return (
    <Svg width={screenWidth} height={chartHeight}>
      {limitedYAxisValues.map((value, index) => {
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
              {`${toFixed(value)}kg`}
            </SvgText>
          </React.Fragment>
        )
      })}

      <Polyline
        points={polylinePoints}
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
          ((item.weight - chartMin) / (chartMax - chartMin)) * maxBarHeight +
          paddingTop
        const isSelected = item.date === date
        const pointColor = isSelected ? COLORS.primary : COLORS.border

        return <Circle key={index} cx={x} cy={y} r={4} fill={pointColor} />
      })}

      {labels.map((label, index) => {
        const x =
          index * ((screenWidth - dynamicPadding * 2) / (labels.length - 1)) +
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
            {label}
          </SvgText>
        )
      })}

      {selectedPoint && (
        <React.Fragment>
          <Circle
            cx={selectedPoint.x}
            cy={selectedPoint.y}
            r={5}
            fill={COLORS.primary}
          />
          <SvgText
            x={selectedPoint.x}
            y={selectedPoint.y - 12}
            fontFamily="TikTokText-Medium"
            fontSize="12"
            fontWeight="600"
            fill={COLORS.primary}
            textAnchor="middle"
          >
            {toFixed(selectedPoint.value)}
          </SvgText>
        </React.Fragment>
      )}
    </Svg>
  )
}
