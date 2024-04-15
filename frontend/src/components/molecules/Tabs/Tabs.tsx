import { Tab } from "@headlessui/react";
import { TabItem } from "../../atoms/Tab/TabItem";
import { TabData } from "../../../types/types";

interface TabsProps {
  tabsData: TabData[];
}

export const Tabs = ({ tabsData }: TabsProps) => {
  return (
    <div className="w-full  sm:px-0">
      <Tab.Group >
        <Tab.List className="flex border-gray-600 border w-full">
          {tabsData.map((tabitem) => (
            <TabItem title={tabitem.title}>{tabitem.tabUI}</TabItem>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabsData.map((tabitem, idx) => (
            <Tab.Panel
              key={idx}
              className="p-3"
            >
              {tabitem.panelUI}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
