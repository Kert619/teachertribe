import type { BaseGroup, BaseUser } from "@/types/common";

export interface Group extends BaseGroup {
  user: BaseUser;
}
