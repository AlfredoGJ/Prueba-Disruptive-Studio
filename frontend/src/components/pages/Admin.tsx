import React from "react";
import { Tabs } from "../molecules/Tabs/Tabs";
import { ContentAdmin } from "../organisms/ContentAdmin";
import { TopicsAdmin } from "../organisms/TopicsAdmin";
import UsersAdmin from "../organisms/UsersAdmin";

interface Props {
  // Define your props here
}

const mediaCount = [
  { name: "Video", count: 100, description: "Video eo eo" },
  { name: "Text", count: 200, description: "Text not your ex" },
  { name: "Image", count: 300, description: "Image in all the people" },
];

const Admin: React.FC<Props> = (props) => {
  let tabData = [
    {
      title: "Content Admin",
      tabUI: <div>Content Admin</div>,
      panelUI: <ContentAdmin />,
    },
    {
      title: "Topics Admin",
      tabUI: <div>Topics Admin</div>,
      panelUI: <TopicsAdmin />,
    },
    {
      title: "Users Admin",
      tabUI: <div>Users Admin</div>,
      panelUI: <UsersAdmin />,
    },
  ];

  return (
    <div>
      <Tabs tabsData={tabData}></Tabs>
    </div>
  );
};

export default Admin;
