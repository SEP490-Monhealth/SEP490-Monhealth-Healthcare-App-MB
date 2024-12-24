import React, { useState } from "react"

import { View } from "react-native"

const DatePicker: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(27)
  const [selectedMonth, setSelectedMonth] = useState<string>("T8")
  const [selectedYear, setSelectedYear] = useState<number>(2003)

  const days: number[] = Array.from({ length: 31 }, (_, i) => i + 1)
  const months: string[] = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12"
  ]
  const years: number[] = Array.from({ length: 100 }, (_, i) => 2004 - i)

  return <View></View>
}

export default DatePicker
