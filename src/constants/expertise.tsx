import { ExpertiseType } from "@/schemas/expertiseSchema"

export const sampleExpertiseGroupData = [
  {
    groupId: "fa1829d2-d941-499e-b0b1-3767a65994af",
    name: "Dinh dưỡng",
    expertise: [
      {
        expertiseId: "7a61f09f-f999-44fd-8973-105e22df1401",
        name: "Dinh dưỡng lâm sàng"
      },
      {
        expertiseId: "44d9ffb3-a8b8-407b-975c-99e6f6146bc9",
        name: "Dinh dưỡng thể thao"
      },
      {
        expertiseId: "63100127-6781-4385-a1df-b21cae459bdb",
        name: "Dinh dưỡng tiền sản và sau sinh"
      }
    ]
  },
  {
    groupId: "9fe5f2ba-7ddc-47a9-bc3e-1e740f5334da",
    name: "Bệnh lý",
    expertise: [
      {
        expertiseId: "c5d7a490-e25e-4ae6-a6db-2d637e6630de",
        name: "Tiểu đường"
      },
      { expertiseId: "67188399-9f09-4b74-9eb3-31ff82734850", name: "Tim mạch" },
      { expertiseId: "d762370d-3b36-45f6-ae15-bbe4c2b9bf8a", name: "Ung thư" }
    ]
  },
  {
    groupId: "50a39049-3278-4b94-9dfc-af4f32275f48",
    name: "Phục hồi",
    expertise: [
      {
        expertiseId: "c32b7429-13df-4aa0-b32d-705d1050de5f",
        name: "Phục hồi sau phẫu thuật/chấn thương"
      },
      {
        expertiseId: "6c6a7d90-1c16-44ae-9b2a-b3addfe55dbc",
        name: "Vật lý trị liệu"
      }
    ]
  },
  {
    groupId: "2d3436ef-2013-4453-a308-9a3d8edb3498",
    name: "Tâm lý",
    expertise: [
      {
        expertiseId: "fdb9b159-8cd5-4a4b-9879-1a140365c207",
        name: "Stress & Lo âu"
      },
      { expertiseId: "8ad55299-b566-47e8-a9a0-1997e893e153", name: "Trầm cảm" },
      {
        expertiseId: "5912320d-f6ab-493a-8631-891048f965e7",
        name: "Rối loạn giấc ngủ"
      }
    ]
  },
  {
    groupId: "091e5636-19ad-4a5c-bd67-8b02a6524a0c",
    name: "Thể chất",
    expertise: [
      {
        expertiseId: "82e1e76a-99fb-43b4-84e1-d11376b487b8",
        name: "Huấn luyện cá nhân"
      },
      {
        expertiseId: "939cf420-f669-464e-bb2d-74a2c61b1d6f",
        name: "Yoga/Pilates"
      }
    ]
  },
  {
    groupId: "22e6d54f-8f96-4f38-b30c-59352276e122",
    name: "Cân nặng",
    expertise: [
      { expertiseId: "5fa7d647-9ede-4180-99d3-fc10f54dd459", name: "Giảm cân" },
      {
        expertiseId: "f28d1cdc-925e-4ff5-b6db-520de542bc0a",
        name: "Tăng cân lành mạnh"
      }
    ]
  },
  {
    groupId: "24f72ab7-d294-42c4-9385-de809a7efc8a",
    name: "Lối sống",
    expertise: [
      {
        expertiseId: "768178b4-2241-4914-9309-74f89462eddc",
        name: "Cai thuốc lá/rượu"
      },
      {
        expertiseId: "0131b574-2c27-477b-af1f-5abbb7dd08a4",
        name: "Quản lý giấc ngủ"
      }
    ]
  }
]

export const sampleExpertiseData: ExpertiseType[] = [
  // 1
  {
    expertiseId: "7a61f09f-f999-44fd-8973-105e22df1401",
    name: "Dinh dưỡng lâm sàng",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 2
  {
    expertiseId: "44d9ffb3-a8b8-407b-975c-99e6f6146bc9",
    name: "Dinh dưỡng thể thao",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 3
  {
    expertiseId: "63100127-6781-4385-a1df-b21cae459bdb",
    name: "Dinh dưỡng tiền sản và sau sinh",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 4
  {
    expertiseId: "c5d7a490-e25e-4ae6-a6db-2d637e6630de",
    name: "Tiểu đường",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 5
  {
    expertiseId: "67188399-9f09-4b74-9eb3-31ff82734850",
    name: "Tim mạch",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 6
  {
    expertiseId: "d762370d-3b36-45f6-ae15-bbe4c2b9bf8a",
    name: "Ung thư",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 7
  {
    expertiseId: "c32b7429-13df-4aa0-b32d-705d1050de5f",
    name: "Phục hồi sau phẫu thuật/chấn thương",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 8
  {
    expertiseId: "6c6a7d90-1c16-44ae-9b2a-b3addfe55dbc",
    name: "Vật lý trị liệu",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 9
  {
    expertiseId: "fdb9b159-8cd5-4a4b-9879-1a140365c207",
    name: "Stress & Lo âu",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 10
  {
    expertiseId: "8ad55299-b566-47e8-a9a0-1997e893e153",
    name: "Trầm cảm",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 11
  {
    expertiseId: "5912320d-f6ab-493a-8631-891048f965e7",
    name: "Rối loạn giấc ngủ",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 12
  {
    expertiseId: "82e1e76a-99fb-43b4-84e1-d11376b487b8",
    name: "Huấn luyện cá nhân",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 13
  {
    expertiseId: "939cf420-f669-464e-bb2d-74a2c61b1d6f",
    name: "Yoga/Pilates",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 14
  {
    expertiseId: "5fa7d647-9ede-4180-99d3-fc10f54dd459",
    name: "Giảm cân",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 15
  {
    expertiseId: "f28d1cdc-925e-4ff5-b6db-520de542bc0a",
    name: "Tăng cân lành mạnh",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 16
  {
    expertiseId: "768178b4-2241-4914-9309-74f89462eddc",
    name: "Cai thuốc lá/rượu",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  },
  // 17
  {
    expertiseId: "0131b574-2c27-477b-af1f-5abbb7dd08a4",
    name: "Quản lý giấc ngủ",
    createdAt: "2025-01-06T00:00:00",
    updatedAt: "2025-01-06T00:00:00"
  }
]
