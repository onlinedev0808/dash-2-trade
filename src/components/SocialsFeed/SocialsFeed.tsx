/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { IMediumPost, ITwitterPost, SocialsEnum } from "./types";
import MediumItem from "./MediumItem";
import RadioGroup from "../MarketOverview/RadioGroup";
import TwitterItem from "./TwitterItem";
import Card from "../common/Card";

const DEFAULT_OPTIONS = [
  {
    value: SocialsEnum.Twitter,
    text:
      SocialsEnum.Twitter[0].toUpperCase() + SocialsEnum.Twitter.substring(1),
  },
  {
    value: SocialsEnum.Medium,
    text: SocialsEnum.Medium[0].toUpperCase() + SocialsEnum.Medium.substring(1),
  },
];

interface ISocialsFeedProps {
  tokenId: number;
  amount?: number;
}

const SocialsFeed = ({
  tokenId,
  amount = 10,
}: ISocialsFeedProps): JSX.Element => {
  const [twitterPosts, setTwitterPosts] = useState<ITwitterPost[]>([]);
  const [mediumPosts, setMediumPosts] = useState<IMediumPost[]>([]);

  const [socialName, setSocialName] = useState(DEFAULT_OPTIONS[0]);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioSwitch = (value) => {
    setSocialName(value);
  };

  const fetchPosts = async (social, id, limit) => {
    const queryParameters: string[] = [];

    if (id) queryParameters.push(`tokenId=${id}`);
    if (limit) queryParameters.push(`limit=${limit}`);
    let url = `/api/backend/posts/${social}`;

    if (queryParameters.length) {
      url += "?";
      const params = queryParameters.join("&");
      url += params;
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const twitterData = await fetchPosts(
        SocialsEnum.Twitter,
        tokenId,
        amount
      );

      const mediumData = await fetchPosts(SocialsEnum.Medium, tokenId, amount);
      const activeTab =
        twitterData?.length > 0 ? DEFAULT_OPTIONS[0] : DEFAULT_OPTIONS[1];

      let activeOptions;
      if (twitterData?.length && !mediumData?.length) {
        activeOptions = [{ ...DEFAULT_OPTIONS[0] }];
      } else if (!twitterData?.length && mediumData?.length) {
        activeOptions = [{ ...DEFAULT_OPTIONS[1] }];
      }
      if (activeOptions) setOptions(activeOptions);

      setTwitterPosts(twitterData);
      setMediumPosts(mediumData);
      setSocialName(activeTab);
    };

    fetchData();
  }, [tokenId, amount]);

  if (!twitterPosts?.length && !mediumPosts?.length) {
    return null;
  }

  const posts =
    socialName.value === SocialsEnum.Twitter ? twitterPosts : mediumPosts;

  return (
    <Card>
      <RadioGroup
        options={options}
        selected={socialName}
        setSelected={handleRadioSwitch}
        color="secondary"
        className="
          mb-6
          [&_.rb-text]:text-base
          "
      />
      <div className="md:basis-0 md:grow md:max-h-full max-h-60 overflow-auto cursor-grab">
        {posts?.map((post: IMediumPost | ITwitterPost, idx) => (
          <div key={idx}>
            {idx > 0 && <hr className="my-4 border-border-primary" />}
            {socialName.value === SocialsEnum.Medium && (
              <MediumItem post={post as IMediumPost} />
            )}
            {socialName.value === SocialsEnum.Twitter && (
              <TwitterItem post={post as ITwitterPost} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SocialsFeed;
