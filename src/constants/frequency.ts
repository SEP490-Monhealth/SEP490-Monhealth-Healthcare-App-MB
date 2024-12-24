import { Calendar, Calendar2, CalendarCircle, CalendarRemove } from "iconsax-react-native"

export type FrequencyActivityType = {
  title: string
  icon: React.ElementType
}

export const frequencyActivityData: FrequencyActivityType[] = [
  {
    title: "0 buổi / tuần",
    icon: CalendarRemove
  },
  {
    title: "1 - 3 buổi / tuần",
    icon: Calendar2
  },
  {
    title: "3 - 5 buổi / tuần",
    icon: Calendar
  },
  {
    title: "6 - 7 buổi / tuần",
    icon: CalendarCircle
  }
]
