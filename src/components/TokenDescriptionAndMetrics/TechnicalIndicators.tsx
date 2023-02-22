import React from "react";

import { TokenInformationSvg } from "../CommonSvg";
import Card from "../common/Card";
import TokenMetricsRow from "./TokenMetricsRow";

const TechnicalIndicators = ({ technicalIndicators }): JSX.Element => (
  <Card title="Technical Indicators" icon={<TokenInformationSvg />}>
    <div>
      <TokenMetricsRow
        title="RSI"
        secondTitle="Week"
        value={technicalIndicators.rsi}
        secondValue={technicalIndicators.rsiDelta}
        hasTooltip
        tooltipText=""
      />
      <div className="opacity-25 my-4 border-b-1 border-foreground-dark dark:border-foreground" />
      <TokenMetricsRow
        title="Social Volume"
        secondTitle="Week"
        value={technicalIndicators.socialVolume}
        secondValue={technicalIndicators.socialVolumeDelta}
        hasTooltip
        tooltipText="How present the project is on social media"
      />
      <div className="opacity-25 my-4 border-b-1 border-foreground-dark dark:border-foreground" />
      <TokenMetricsRow
        title="Social Sentiment"
        secondTitle="Trend"
        value={technicalIndicators.socialSentiment}
        secondValue={technicalIndicators.socialSentimentTrend}
        isTrend
      />
      <div className="opacity-25 my-4 border-b-1 border-foreground-dark dark:border-foreground" />
      <TokenMetricsRow
        title="Social Sentiment"
        secondTitle="Trend"
        value={technicalIndicators.socialSentiment2}
        secondValue={technicalIndicators.socialSentimentTrend2}
        isTrend
      />
    </div>
  </Card>
);

export default TechnicalIndicators;
