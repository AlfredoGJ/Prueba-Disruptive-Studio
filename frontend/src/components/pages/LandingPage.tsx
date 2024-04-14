import React, { useEffect } from "react";
import { Banner } from "../organisms/Banner";
import { MediaCountList } from "../organisms/MediaCount";
import { ContentType } from "../../types/types";
import { useAPI } from "../../hooks/useAPI";
import { UserContext } from "../../context/UserContext";

interface ILandingPageProps {}

export const LandingPage: React.FC<ILandingPageProps> = ({}) => {
  const [call, , response, error] = useAPI({
    endpoint: "getPostsSummary",
    useAuth: true,
  });
  const [media, setMedia] = React.useState<ContentType[]>([]);

  useEffect(() => {
    if (response) {
      setMedia(response.data);
    }
  }, [response]);

  useEffect(() => {
    call("", "", [{ groupBy: "type" }]);
  }, []);

  const userContext = React.useContext(UserContext);

  console.log(`User: ${userContext}`);

  return (
    <main className="">
      <Banner
        title="Welcome"
        subtitle="Disruptive Media Library"
        description="Here you can find lots of media from a lot of interesting topics"
      />
      <MediaCountList mediaCount={media} />
    </main>
  );
};
