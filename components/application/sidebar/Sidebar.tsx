import Navigation from "./Navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Receipt,
  Goal,
  IdCard,
  ChartNoAxesCombinedIcon,
  FileClock,
  MessageCircleQuestionIcon,
  LogOut,
  Settings,
} from "lucide-react";

const generalNavigationData = {
  header: "General",
  link: [
    {
      name: "Dashboard",
      href: "/app/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Transactions",
      href: "/app/transactions",
      icon: <ArrowLeftRight size={20} />,
    },
    {
      name: "Bills & Subscriptions",
      href: "/app/bills-and-subscriptions",
      icon: <Receipt size={20} />,
    },
    {
      name: "Goals",
      href: "/app/goals",
      icon: <Goal size={20} />,
    },
    {
      name: "Cards",
      href: "/app/cards",
      icon: <IdCard size={20} />,
    },
  ],
};

const toolsNavigationData = {
  header: "Tools",
  link: [
    {
      name: "Analytics",
      href: "/app/analytics",
      icon: <ChartNoAxesCombinedIcon size={20} />,
    },
    {
      name: "Activity Log",
      href: "/app/activity-log",
      icon: <FileClock size={20} />,
    },
  ],
};

const otherNavigationData = {
  header: "Other",
  link: [
    {
      name: "Help & Support",
      href: "/app/help-and-support",
      icon: <MessageCircleQuestionIcon size={20} />,
    },
    {
      name: "Settings",
      href: "/app/settings",
      icon: <Settings size={20} />,
    },
    {
      name: "Log Out",
      href: "/app/logout",
      icon: <LogOut size={20} />,
    },
  ],
};

const Sidebar = () => {
  return (
    <nav>
      <Navigation
        header={generalNavigationData.header}
        link={generalNavigationData.link}
      />
      <Navigation
        header={toolsNavigationData.header}
        link={toolsNavigationData.link}
      />
      <Navigation
        header={otherNavigationData.header}
        link={otherNavigationData.link}
        separator={false}
      />
    </nav>
  );
};

export default Sidebar;
