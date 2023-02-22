import React from "react";
import moment from "moment/moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import Card from "../../common/Card";

import { formatNumber } from "../../../utils";
import {
  AddWatchListButton,
  CardTokenLink,
  ChainLogo,
  dateFormat,
  getCap,
  getChainLogo,
  LoadingLineWave,
  PLACEHOLDER,
  RenderMetric,
  ScoreColor,
  TokenTags,
} from "./tokenUtils";

import "swiper/css";
import "swiper/css/navigation";
import { TooltipPosY } from "../../common/Tooltip";

const CardList = ({ rows, chains, isLoading, nextPage, onWatchListClick }) => (
  <div className="w-full relative">
    {isLoading && <LoadingLineWave />}
    <Swiper
      modules={[Navigation]}
      spaceBetween={25}
      slidesPerView={1}
      navigation
      onReachEnd={() => nextPage()}
    >
      {rows?.map((row, index) => {
        const {
          id,
          score,
          presale_stop,
          kyc,
          audit,
          vc_backed,
          presale_market_cap_usd,
          token,
          amount_raised,
          token_distribution,
        } = row;

        const key = `${id}:${index}`;

        return (
          <SwiperSlide key={key}>
            <CardTokenLink tokenId={id}>
              <div className="text-xs md:text-sm cursor-pointer">
                <Card>
                  <div className="px-6">
                    <div className="flex justify-between pb-4 mb-4 text-text-primary dark:text-text-primary-dark border-b-1 border-opacity-20 border-text-secondary">
                      <div className="flex gap-2">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={token?.logo}
                          alt="token logo"
                        />
                        <div className="flex flex-col justify-center">
                          <p className="leading-5">
                            {token?.name || PLACEHOLDER}
                          </p>
                          <p className="leading-4 text-text-secondary dark:text-text-secondary-dark">
                            {token?.symbol || PLACEHOLDER}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-end">
                        <span>Dash Score</span>
                        <div
                          className={`rounded bg-highlight dark:bg-highlight-dark text-sm py-2 px-3 h-full flex flex-col justify-between ${ScoreColor(
                            score?.total
                          )}`}
                        >
                          {score?.total > 0 ? score?.total : PLACEHOLDER}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>End date</div>
                        <div>
                          {(presale_stop &&
                            moment(presale_stop, dateFormat)?.format(
                              "YYYY-MM-DD"
                            )) ||
                            PLACEHOLDER}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>Presale Market Cap</div>
                        <div>
                          {presale_market_cap_usd
                            ? `$ ${formatNumber(+presale_market_cap_usd)}`
                            : PLACEHOLDER}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>Hard Cap</div>
                        <div>{getCap(row, "hard")}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>Amount Rised</div>
                        <div>
                          {amount_raised
                            ? `$ ${formatNumber(+amount_raised)}`
                            : PLACEHOLDER}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>Social Following</div>
                        <div>
                          {token?.social_metrics?.followers?.count ? (
                            <RenderMetric
                              count={+token.social_metrics.followers.count}
                              change={+token.social_metrics.followers.change}
                            />
                          ) : (
                            PLACEHOLDER
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>Social Interactions</div>
                        <div>
                          {token?.social_metrics?.mentions?.count ? (
                            <RenderMetric
                              count={+token.social_metrics.mentions.count}
                              change={+token.social_metrics.mentions.change}
                            />
                          ) : (
                            PLACEHOLDER
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end mt-5">
                        <div className="flex flex-col items-center gap-2">
                          {token?.chains ? (
                            <ChainLogo
                              chain={token.chains[0]?.symbol}
                              logo={token.chains[0]?.logo}
                            />
                          ) : (
                            <ChainLogo chain="Own" logo={token?.logo} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-5">
                      <div>
                        <div className="flex flex-wrap gap-y-1 gap-x-1">
                          <TokenTags
                            audit={audit}
                            vcBacked={vc_backed}
                            kyc={kyc}
                            tokenDistribution={token_distribution}
                            tooltipYPos={TooltipPosY.Top}
                          />
                        </div>
                      </div>
                      <div>
                        <AddWatchListButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onWatchListClick(row.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </CardTokenLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  </div>
);

export default CardList;
