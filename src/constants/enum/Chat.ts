import { z } from "zod"

export enum MessageTypeEnum {
  Text,
  Image,
  File,
  Video
}

export enum MessageStatusEnum {
  Sent,
  Delivered,
  Read
}

export const MessageTypeSchemaEnum = z.nativeEnum(MessageTypeEnum)
export const MessageStatusSchemaEnum = z.nativeEnum(MessageStatusEnum)
