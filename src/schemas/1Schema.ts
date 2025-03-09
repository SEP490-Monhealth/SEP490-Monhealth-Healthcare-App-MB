import { z } from "zod"

// Enums
const UserRoleEnum = z.enum(["User", "Member", "Consultant", "Admin"])
const SubscriptionStatusEnum = z.enum(["Active", "Expired"])
const GenderEnum = z.enum(["Male", "Female"])
const GoalTypeEnum = z.enum(["WeightLoss", "Maintenance", "WeightGain"])
const GoalStatusEnum = z.enum(["Abandoned", "Active", "Completed"])
const CategoryTypeEnum = z.enum(["Food", "Workout"])
const MealTypeEnum = z.enum(["Breakfast", "Lunch", "Dinner", "Snack"])
const ExerciseTypeEnum = z.enum(["Time", "Reps"])
const WorkoutTypeEnum = z.enum(["Warmup", "Workout"])
const DifficultyLevelEnum = z.enum(["Easy", "Medium", "Hard"])
const ScheduleTypeEnum = z.enum(["Recurring", "OneTime"])
const RecurringDayEnum = z.enum([
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
])
const TimeSlotStatusEnum = z.enum(["Available", "Unavailable", "Booked"])
const BookingStatusEnum = z.enum([
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled"
])
const PaymentStatusEnum = z.enum(["Pending", "Completed", "Failed", "Refunded"])
const TransactionTypeEnum = z.enum([
  "Earning",
  "Withdrawal",
  "Refund",
  "Fee",
  "Bonus"
])
const TransactionStatusEnum = z.enum([
  "Pending",
  "Completed",
  "Failed",
  "Cancelled"
])
const NotificationTypeEnum = z.enum([
  "System",
  "Reminder",
  "Booking",
  "Payment",
  "Goal",
  "Message"
])
const MessageTypeEnum = z.enum(["Text", "Image", "File", "Video"])
const MessageStatusEnum = z.enum(["Sent", "Delivered", "Read"])

// UUID validation
const uuidSchema = z.string().uuid()

// Base schemas for common fields
const timestampFields = {
  createdAt: z.date(),
  updatedAt: z.date()
}

const auditFields = {
  ...timestampFields,
  createdBy: uuidSchema,
  updatedBy: uuidSchema
}

// Users schema
export const UserSchema = z.object({
  userId: uuidSchema,
  fullName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  password: z.string().min(6),
  avatarUrl: z.string().url().optional().nullable(),
  role: UserRoleEnum.default("User"),
  status: z.boolean().default(true),
  ...auditFields
})

// UserSubscriptions schema
export const UserSubscriptionSchema = z.object({
  userSubscriptionId: uuidSchema,
  userId: uuidSchema,
  subscriptionId: uuidSchema,
  startedAt: z.date(),
  expiresAt: z.date(),
  status: SubscriptionStatusEnum.default("Active"),
  ...timestampFields
})

// Subscriptions schema
export const SubscriptionSchema = z.object({
  subscriptionId: uuidSchema,
  subscriptionName: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().positive(),
  durationDays: z.number().int().positive(),
  features: z.string().min(1),
  maxBookings: z.number().int().nonnegative().default(0),
  status: z.boolean().default(true),
  ...auditFields
})

// Metrics schema
export const MetricSchema = z.object({
  metricId: uuidSchema,
  userId: uuidSchema,
  dateOfBirth: z.date(),
  gender: GenderEnum,
  height: z.number().positive(),
  weight: z.number().positive(),
  activityLevel: z.number().positive(),
  bmi: z.number().nonnegative().default(0),
  bmr: z.number().nonnegative().default(0),
  tdee: z.number().nonnegative().default(0),
  ibw: z.number().nonnegative().default(0),
  ...timestampFields
})

// Goals schema
export const GoalSchema = z.object({
  goalId: uuidSchema,
  userId: uuidSchema,
  goalType: GoalTypeEnum,
  caloriesRatio: z.number().positive(),
  weightGoal: z.number().positive(),
  caloriesGoal: z.number().nonnegative().default(0),
  proteinGoal: z.number().nonnegative().default(0),
  carbsGoal: z.number().nonnegative().default(0),
  fatGoal: z.number().nonnegative().default(0),
  fiberGoal: z.number().nonnegative().default(0),
  sugarGoal: z.number().nonnegative().default(0),
  waterIntakesGoal: z.number().nonnegative().default(0),
  workoutDurationGoal: z.number().nonnegative().default(0),
  caloriesBurnedGoal: z.number().nonnegative().default(0),
  status: GoalStatusEnum.default("Active"),
  ...timestampFields
})

// Categories schema
export const CategorySchema = z.object({
  categoryId: uuidSchema,
  categoryType: CategoryTypeEnum,
  categoryName: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  ...timestampFields
})

// UserCategories schema
export const UserCategorySchema = z.object({
  userCategoryId: uuidSchema,
  userId: uuidSchema,
  categoryId: uuidSchema,
  ...timestampFields
})

// UserAllergies schema
export const UserAllergySchema = z.object({
  userAllergyId: uuidSchema,
  userId: uuidSchema,
  allergyId: uuidSchema,
  ...timestampFields
})

// FoodAllergies schema
export const FoodAllergySchema = z.object({
  foodAllergyId: uuidSchema,
  foodId: uuidSchema,
  allergyId: uuidSchema,
  ...timestampFields
})

// Allergies schema
export const AllergySchema = z.object({
  allergyId: uuidSchema,
  allergyName: z.string().min(1),
  description: z.string().optional(),
  ...timestampFields
})

// Foods schema
export const FoodSchema = z.object({
  foodId: uuidSchema,
  userId: uuidSchema,
  categoryId: uuidSchema,
  mealType: z.any().refine((val) => typeof val === "object", {
    message: "mealType must be a JSON object"
  }),
  dishType: z.any().refine((val) => typeof val === "object", {
    message: "dishType must be a JSON object"
  }),
  foodName: z.string().min(1),
  description: z.string().min(1),
  views: z.number().int().nonnegative().default(0),
  isPublic: z.boolean().default(false),
  status: z.boolean().default(true),
  ...auditFields
})

// Nutrition schema
export const NutritionSchema = z.object({
  nutritionId: uuidSchema,
  foodId: uuidSchema,
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  fiber: z.number().nonnegative(),
  sugar: z.number().nonnegative(),
  saturatedFat: z.number().nonnegative().optional(),
  unsaturatedFat: z.number().nonnegative().optional(),
  cholesterol: z.number().nonnegative().optional(),
  sodium: z.number().nonnegative().optional(),
  potassium: z.number().nonnegative().optional(),
  calcium: z.number().nonnegative().optional(),
  iron: z.number().nonnegative().optional(),
  vitaminA: z.number().nonnegative().optional(),
  vitaminB1: z.number().nonnegative().optional(),
  vitaminB2: z.number().nonnegative().optional(),
  vitaminB3: z.number().nonnegative().optional(),
  vitaminC: z.number().nonnegative().optional(),
  vitaminD: z.number().nonnegative().optional(),
  vitaminE: z.number().nonnegative().optional(),
  ...auditFields
})

// FoodPortions schema
export const FoodPortionSchema = z.object({
  foodPortionId: uuidSchema,
  foodId: uuidSchema,
  portionId: uuidSchema,
  ...timestampFields
})

// Portions schema
export const PortionSchema = z.object({
  portionId: uuidSchema,
  portionSize: z.string().min(1),
  portionWeight: z.number().positive(),
  measurementUnit: z.string().min(1),
  ...auditFields
})

// MealFoods schema
export const MealFoodSchema = z.object({
  mealFoodId: uuidSchema,
  mealId: uuidSchema,
  foodId: uuidSchema,
  portionId: uuidSchema,
  quantity: z.number().int().positive(),
  isCompleted: z.boolean().default(false),
  ...timestampFields
})

// Meals schema
export const MealSchema = z.object({
  mealId: uuidSchema,
  userId: uuidSchema,
  dailyMealId: uuidSchema,
  mealType: MealTypeEnum,
  ...timestampFields
})

// DailyMeals schema
export const DailyMealSchema = z.object({
  dailyMealId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,
  totalCalories: z.number().nonnegative().default(0),
  totalProteins: z.number().nonnegative().default(0),
  totalCarbs: z.number().nonnegative().default(0),
  totalFat: z.number().nonnegative().default(0),
  totalFiber: z.number().nonnegative().default(0),
  totalSugar: z.number().nonnegative().default(0),
  ...timestampFields
})

// WaterReminders schema
export const WaterReminderSchema = z.object({
  waterReminderId: uuidSchema,
  userId: uuidSchema,
  waterReminderName: z.string().min(1),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
  volume: z.number().positive(),
  isRecurring: z.boolean().default(false),
  isDrunk: z.boolean().default(false),
  status: z.boolean().default(true),
  ...timestampFields
})

// DailyWaterIntakes schema
export const DailyWaterIntakeSchema = z.object({
  dailyWaterIntakeId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,
  totalVolume: z.number().nonnegative().optional(),
  ...timestampFields
})

// Exercises schema
export const ExerciseSchema = z.object({
  exerciseId: uuidSchema,
  userId: uuidSchema,
  exerciseType: ExerciseTypeEnum,
  exerciseName: z.string().min(1),
  instructions: z.string().min(1),
  caloriesPerMinute: z.number().positive(),
  status: z.boolean().default(true),
  ...auditFields
})

// WorkoutExercises schema
export const WorkoutExerciseSchema = z.object({
  workoutExerciseId: uuidSchema,
  workoutId: uuidSchema,
  exerciseId: uuidSchema,
  order: z.number().int().positive(),
  durationSeconds: z.number().int().positive(),
  reps: z.number().int().positive(),
  isCompleted: z.boolean().default(false),
  ...timestampFields
})

// Workouts schema
export const WorkoutSchema = z.object({
  workoutId: uuidSchema,
  userId: uuidSchema,
  categoryId: uuidSchema,
  workoutType: WorkoutTypeEnum,
  workoutName: z.string().min(1),
  description: z.string().min(1),
  difficultyLevel: DifficultyLevelEnum,
  durationMinutes: z.number().positive(),
  caloriesBurned: z.number().positive(),
  views: z.number().int().nonnegative().default(0),
  isPublic: z.boolean().default(false),
  status: z.boolean().default(true),
  ...auditFields
})

// Activities schema
export const ActivitySchema = z.object({
  activityId: uuidSchema,
  userId: uuidSchema,
  dailyActivityId: uuidSchema,
  workoutId: uuidSchema,
  ...timestampFields
})

// DailyActivities schema
export const DailyActivitySchema = z.object({
  dailyActivityId: uuidSchema,
  userId: uuidSchema,
  goalId: uuidSchema,
  totalDuration: z.number().nonnegative().default(0),
  totalCaloriesBurned: z.number().nonnegative().default(0),
  ...timestampFields
})

// Consultants schema
export const ConsultantSchema = z.object({
  consultantId: uuidSchema,
  userId: uuidSchema,
  expertiseId: uuidSchema,
  bio: z.string().min(1),
  experience: z.number().int().positive(),
  ratingCount: z.number().int().nonnegative().default(0),
  averageRating: z.number().nonnegative().default(0),
  views: z.number().int().nonnegative().default(0),
  isVerified: z.boolean().default(false),
  status: z.boolean().default(false),
  ...timestampFields
})

// Expertise schema
export const ExpertiseSchema = z.object({
  expertiseId: uuidSchema,
  expertiseName: z.string().min(1),
  description: z.string().optional(),
  ...timestampFields
})

// Certificates schema
export const CertificateSchema = z.object({
  certificateId: uuidSchema,
  consultantId: uuidSchema,
  expertiseId: uuidSchema,
  certificateNumber: z.string().optional(),
  certificateName: z.string().min(1),
  issueDate: z.date(),
  issuedBy: z.string().min(1),
  expiryDate: z.date(),
  imageUrls: z.any().refine((val) => Array.isArray(val), {
    message: "imageUrls must be a JSON array"
  }),
  isVerified: z.boolean().default(false),
  ...timestampFields
})

// Schedules schema
export const ScheduleSchema = z
  .object({
    scheduleId: uuidSchema,
    consultantId: uuidSchema,
    scheduleType: ScheduleTypeEnum,
    recurringDay: RecurringDayEnum.optional(),
    specificDate: z.date().optional(),
    ...timestampFields
  })
  .refine(
    (data) => {
      if (data.scheduleType === "Recurring") {
        return data.recurringDay !== undefined
      } else if (data.scheduleType === "OneTime") {
        return data.specificDate !== undefined
      }
      return false
    },
    {
      message:
        "recurringDay is required for Recurring schedules, specificDate is required for OneTime schedules"
    }
  )

// ScheduleExceptions schema
export const ScheduleExceptionSchema = z.object({
  exceptionId: uuidSchema,
  scheduleId: uuidSchema,
  date: z.date(),
  reason: z.string().min(1),
  ...timestampFields
})

// ScheduleTimeSlots schema
export const ScheduleTimeSlotSchema = z.object({
  scheduleTimeSlotId: uuidSchema,
  scheduleId: uuidSchema,
  timeSlotId: uuidSchema,
  status: TimeSlotStatusEnum.default("Available"),
  ...timestampFields
})

// TimeSlots schema
export const TimeSlotSchema = z.object({
  timeSlotId: uuidSchema,
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
  ...timestampFields
})

// Bookings schema
export const BookingSchema = z.object({
  bookingId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,
  scheduleTimeSlotId: uuidSchema,
  notes: z.string().optional(),
  cancellationReason: z.string().optional(),
  status: BookingStatusEnum.default("Pending"),
  ...auditFields
})

// Reviews schema
export const ReviewSchema = z.object({
  reviewId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,
  bookingId: uuidSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
  ...timestampFields
})

// Payments schema
export const PaymentSchema = z.object({
  paymentId: uuidSchema,
  userId: uuidSchema,
  subscriptionId: uuidSchema,
  amount: z.number().int().positive(),
  status: PaymentStatusEnum.default("Pending"),
  ...auditFields
})

// Wallets schema
export const WalletSchema = z.object({
  walletId: uuidSchema,
  consultantId: uuidSchema,
  balance: z.number().nonnegative().default(0),
  status: z.boolean().default(true),
  ...timestampFields
})

// Transactions schema
export const TransactionSchema = z.object({
  transactionId: uuidSchema,
  walletId: uuidSchema,
  bookingId: uuidSchema,
  transactionType: TransactionTypeEnum,
  description: z.string().optional(),
  amount: z.number().nonzero(),
  balanceBefore: z.number().nonnegative(),
  balanceAfter: z.number().nonnegative(),
  status: TransactionStatusEnum.default("Pending"),
  ...auditFields
})

// Notifications schema
export const NotificationSchema = z.object({
  notificationId: uuidSchema,
  userId: uuidSchema,
  referenceId: uuidSchema,
  notificationType: NotificationTypeEnum,
  title: z.string().min(1),
  content: z.string().min(1),
  actionUrl: z.string().url().optional(),
  isRead: z.boolean().default(false),
  ...timestampFields
})

// Chats schema
export const ChatSchema = z.object({
  chatId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,
  lastMessage: z.string().optional(),
  ...timestampFields
})

// Messages schema
export const MessageSchema = z.object({
  messageId: uuidSchema,
  chatId: uuidSchema,
  senderId: uuidSchema,
  receiverId: uuidSchema,
  messageType: MessageTypeEnum,
  content: z.string().min(1),
  status: MessageStatusEnum.default("Sent"),
  ...timestampFields
})
