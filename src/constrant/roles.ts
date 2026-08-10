export const Roles = {
  ADMIN: "ADMIN",
  STUDENT:"STUDENT",
  TUTOR:"TUTOR"
};
export type Role = (typeof Roles)[keyof typeof Roles];