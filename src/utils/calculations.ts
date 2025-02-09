import { Gender } from "@/constants/enums"

/**
 * Tính các chỉ số BMI, BMR, TDEE, IBW dựa trên thông tin của người dùng.
 * @param weight Cân nặng (kg)
 * @param height Chiều cao (cm)
 * @param age Tuổi (năm)
 * @param gender Giới tính ("Male" hoặc "Female")
 * @param activityLevel Mức độ hoạt động (1.2: ít hoạt động, 1.375: nhẹ, 1.55: trung bình, 1.725: cao, 1.9: rất cao)
 * @returns Một đối tượng chứa các chỉ số: BMI, BMR, TDEE, IBW
 */
export const calculateHealthMetrics = (
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
) => {
  // Tính BMI
  const bmi = calculateBMI(weight, height)

  // Tính BMR (Basal Metabolic Rate)
  const bmr = calculateBMR(weight, height, age, gender)

  // Tính TDEE (Total Daily Energy Expenditure)
  const tdee = calculateTDEE(bmr, activityLevel)

  // Tính IBW (Ideal Body Weight)
  const ibw = calculateIBW(height, gender)

  return {
    bmi,
    bmr,
    tdee,
    ibw
  }
}

/**
 * Tính BMI (Body Mass Index)
 * @param weight Cân nặng (kg)
 * @param height Chiều cao (cm)
 * @returns Chỉ số BMI
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInM = height / 100 // Chuyển chiều cao từ cm sang m
  return weight / (heightInM * heightInM) // Công thức tính BMI
}

/**
 * Tính BMR (Basal Metabolic Rate)
 * @param weight Cân nặng (kg)
 * @param height Chiều cao (cm)
 * @param age Tuổi (năm)
 * @param gender Giới tính ("Male" hoặc "Female")
 * @returns BMR của người dùng
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: Gender
): number => {
  if (gender === Gender.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5 // Công thức Mifflin-St Jeor cho nam
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161 // Công thức Mifflin-St Jeor cho nữ
  }
}

/**
 * Tính TDEE (Total Daily Energy Expenditure)
 * @param bmr BMR (Basal Metabolic Rate)
 * @param activityLevel Mức độ hoạt động (1.2: ít hoạt động, 1.375: nhẹ, 1.55: trung bình, 1.725: cao)
 * @returns TDEE (Lượng calo cần thiết mỗi ngày)
 */
export const calculateTDEE = (
  bmr: number,
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
): number => {
  return bmr * activityLevel // Công thức tính TDEE: BMR * mức độ hoạt động
}

/**
 * Tính IBW (Ideal Body Weight)
 * @param height Chiều cao (cm)
 * @param gender Giới tính ("Male" hoặc "Female")
 * @returns IBW lý tưởng
 */
export const calculateIBW = (height: number, gender: Gender): number => {
  if (gender === Gender.Male) {
    return 50 + 0.91 * (height - 152.4) // Công thức IBW cho nam
  } else {
    return 45.5 + 0.91 * (height - 152.4) // Công thức IBW cho nữ
  }
}

export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  // So sánh tháng và ngày để điều chỉnh nếu sinh nhật chưa qua
  if (
    today.getMonth() < birthDate.getMonth() || // Tháng hiện tại nhỏ hơn tháng sinh
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate()) // Cùng tháng nhưng ngày hiện tại nhỏ hơn ngày sinh
  ) {
    age--
  }

  return age
}
