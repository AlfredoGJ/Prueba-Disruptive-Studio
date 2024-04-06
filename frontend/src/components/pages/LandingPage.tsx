import React from "react";
import { Banner } from "../organisms/Banner";
import { MediaCountList } from "../organisms/MediaCount";
import { ContentType } from "../../types/types";

interface ILandingPageProps {
  title: string;
  subtitle: string;
  description?: string;
  mediaCount: ContentType[];
}

export const LandingPage: React.FC<ILandingPageProps> = ({
  title,
  description,
  subtitle,
  mediaCount,
}) => {
  return (
    <main className="">
      <Banner title={title} subtitle={subtitle} description={description} />
      <MediaCountList mediaCount={mediaCount} />
    </main>
  );
};
