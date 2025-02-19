export enum RoleEnum {
  User,
  Member,
  Consultant,
  Admin
}

// Setup - Goal
export enum GenderEnum {
  Male,
  Female
}

export enum TypeGoalEnum {
  WeightLoss,
  Maintenance,
  WeightGain,
  MuscleGain
}

export enum StatusGoalEnum {
  Abandoned,
  Active,
  Completed
}

export enum TypeCategoryEnum {
  Food,
  Workout
}

// Food - Meal
export enum TypeFoodEnum {
  Carbs,
  Protein,
  Vegetables,
  Soup,
  Dessert,
  Drink,
  Snacks
}

export enum TypeMealEnum {
  Breakfast,
  Lunch,
  Dinner,
  Snack
}

export enum TypeDishEnum {
  MainDish,
  SideDish,
  Soup,
  Dessert,
  Drink
}

// Exercise - Workout
export enum LevelDifficultyEnum {
  Easy,
  Medium,
  Hard
}

export enum TypeWorkoutEnum {
  Warmup,
  Workout
}

// Schedule - Service - Booking
// export enum ServiceEnum {
//   Online,
//   Offline
// }

export enum StatusScheduleEnum {
  Available,
  Unavailable,
  Booked
}

export enum StatusBookingEnum {
  Pending,
  Confirmed,
  Cancelled
}
