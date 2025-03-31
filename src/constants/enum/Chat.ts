import { z } from "zod"

export enum MessageTypeEnum {
  Sent,
  Received
}

export const MessageTypeSchemaEnum = z.nativeEnum(MessageTypeEnum)
