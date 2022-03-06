import { Message } from "element-plus";

declare module "@vue/runtime-core" {
  $message: typeof Message
}