import React from "react"

import { Dimensions } from "react-native"
import Svg, { Line, Polyline, Text as SvgText } from "react-native-svg"

import { COLORS } from "@/constants/color"

import { MonthlyTransactionType } from "@/schemas/reportSchema"

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

const screenWidth = Dimensions.get("window").width

interface IncomeExpenseChartProps {
  data: MonthlyTransactionType
  labels: string[]
}

export const IncomeExpenseChart = ({
  data,
  labels
}: IncomeExpenseChartProps) => {
  const maxBarHeight = 160
  const paddingTop = 40
  const paddingBottom = 20
  const chartHeight = maxBarHeight + paddingBottom + paddingTop

  const allZero = [...data.income, ...data.expense].every(
    (item) => item.amount === 0
  )

  const maxDataValue = allZero
    ? 2000000
    : Math.max(
        ...data.income.map((item) => item.amount),
        ...data.expense.map((item) => item.amount),
        1
      )

  let step = 100000

  if (maxDataValue >= 600000) step = 200000
  if (maxDataValue >= 2000000) step = 500000

  const roundedMaxValue = allZero
    ? 2000000
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

  const getPoints = (data: { month: string; amount: number }[]) =>
    data
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

  const incomePoints = getPoints(data.income)
  const expensePoints = getPoints(data.expense)

  return (
    <Svg width={screenWidth} height={chartHeight}>
      {/* Trục Y */}
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

      {/* Đường income */}
      <Polyline
        points={incomePoints}
        fill="none"
        stroke={COLORS.primary}
        strokeWidth={2.5}
      />

      {/* Đường expense */}
      <Polyline
        points={expensePoints}
        fill="none"
        stroke={COLORS.destructive}
        strokeWidth={2.5}
      />

      {/* Label trục X */}
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
    </Svg>
  )
}
