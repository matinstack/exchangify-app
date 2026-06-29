export const handleTitle = (pathname: string) => {
  switch (pathname) {
    case "/app/dashboard":
      return "Track all your expenses and financial activity.";

    case "/app/transactions":
      return "View, search, and manage all your transactions.";

    case "/app/bills-and-subscriptions":
      return "Keep track of recurring bills and subscriptions.";

    case "/app/goals":
      return "Set savings goals and monitor your progress.";

    case "/app/cards":
      return "Manage your payment cards in one place.";

    case "/app/analytics":
      return "Analyze your spending with detailed insights.";

    case "/app/activity-log":
      return "Review recent account activity and history.";

    case "/app/help-and-support":
      return "Get help, find answers, and contact support.";

    case "/app/settings":
      return "Customize your account and application preferences.";

    case "/app/profile":
      return "View and update your personal information.";

    default:
      return "Welcome back!";
  }
};
