import {
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  FolderTree,
  Goal,
  LogIn,
  LogOut,
  Palette,
  User,
  UserPlus,
  Wallet,
  KeyRound,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

export const activityConfig = {
  signup: {
    label: "Sign Up",
    description: "Created a new account",
    icon: UserPlus,
    status: "success",
  },

  login: {
    label: "Login",
    description: "Signed in successfully",
    icon: LogIn,
    status: "success",
  },

  logout: {
    label: "Logout",
    description: "Signed out",
    icon: LogOut,
    status: "success",
  },

  password_changed: {
    label: "Password Changed",
    description: "Updated account password",
    icon: KeyRound,
    status: "success",
  },

  card_created: {
    label: "Created Card",
    description: "Created a new card",
    icon: CreditCard,
    status: "success",
  },

  card_updated: {
    label: "Updated Card",
    description: "Updated card",
    icon: Pencil,
    status: "success",
  },

  card_deleted: {
    label: "Deleted Card",
    description: "Deleted card",
    icon: Trash2,
    status: "warning",
  },

  transaction_created: {
    label: "Created Transaction",
    description: "Added a transaction",
    icon: Plus,
    status: "success",
  },

  transaction_updated: {
    label: "Updated Transaction",
    description: "Updated a transaction",
    icon: Pencil,
    status: "success",
  },

  transaction_deleted: {
    label: "Deleted Transaction",
    description: "Deleted a transaction",
    icon: Trash2,
    status: "warning",
  },

  budget_created: {
    label: "Created Budget",
    description: "Created a budget",
    icon: Wallet,
    status: "success",
  },

  budget_updated: {
    label: "Updated Budget",
    description: "Updated budget",
    icon: Pencil,
    status: "success",
  },

  budget_deleted: {
    label: "Deleted Budget",
    description: "Deleted budget",
    icon: Trash2,
    status: "warning",
  },

  goal_created: {
    label: "Created Goal",
    description: "Created a goal",
    icon: Goal,
    status: "success",
  },

  goal_updated: {
    label: "Updated Goal",
    description: "Updated goal",
    icon: Pencil,
    status: "success",
  },

  goal_completed: {
    label: "Goal Completed",
    description: "Completed a goal",
    icon: CheckCircle2,
    status: "success",
  },

  category_created: {
    label: "Created Category",
    description: "Created category",
    icon: FolderTree,
    status: "success",
  },

  category_updated: {
    label: "Updated Category",
    description: "Updated category",
    icon: Pencil,
    status: "success",
  },

  category_deleted: {
    label: "Deleted Category",
    description: "Deleted category",
    icon: Trash2,
    status: "warning",
  },

  profile_updated: {
    label: "Updated Profile",
    description: "Updated profile",
    icon: User,
    status: "success",
  },

  currency_changed: {
    label: "Currency Changed",
    description: "Changed currency",
    icon: CircleDollarSign,
    status: "success",
  },

  theme_changed: {
    label: "Theme Changed",
    description: "Changed application theme",
    icon: Palette,
    status: "success",
  },
} as const;
