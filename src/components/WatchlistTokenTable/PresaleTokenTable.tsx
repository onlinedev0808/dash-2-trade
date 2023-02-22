/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { RotatingSquare } from "react-loader-spinner";

import { formatNumber } from "../../utils";
import { ShieldSvg } from "../CommonSvg";
import { ChainLogo, ScoreColor } from "../PresaleTokenTable/common/tokenUtils";

const Tag = ({ text, className, icon }) => (
  <span
    className={`flex p-1 pb-1 gap-1 items-center rounded-sm bg-green text-[.63rem] text-navigation-background dark:text-primary ${className}`}
  >
    {icon && <div className="min-w-3 w-3">{icon}</div>} {text}
  </span>
);

const PLACEHOLDER = "-";
const dateFormat = "YYYY.MM.DD";

const PresaleTable = ({
  rows,
  editMode,
  selectedTokens,
  setSelectedTokens,
  loading,
}) => (
  <>
    <table className="table-fixed min-w-[90.625rem]">
      <thead className="">
        <tr className="h-[3.2rem] text-text-primary dark:text-text-primary-dark text-sm leading-4 text-text-secondary border-y-2 border-[#313135]">
          <th className="w-[5%] text-left font-medium ">#</th>
          <th className="w-[5%] text-left font-medium ">Logo</th>
          <th className="w-[10%] text-left font-medium ">Symbol</th>
          <th className="w-[10%] text-left font-medium ">Name</th>
          <th className="w-[7%] text-left font-medium ">Dash Score</th>
          <th className="w-[12%] text-left font-medium ">End Date</th>
          <th className="w-[10%] text-left font-medium">Tags</th>
          <th className="w-[8%] text-left font-medium ">Amount Raised</th>
          <th className="w-[8%] text-left font-medium">Hard Cap</th>
          <th className="w-[7%] text-left font-medium ">Presale Marketcap</th>
          <th className="w-[6.5%] text-left font-medium ">Social Following</th>
          <th className="w-[6.55%] text-left font-medium ">
            Social Interaction
          </th>
          <th className="w-[7%] text-left font-medium ">Chain</th>
        </tr>
      </thead>

      {!loading && (
        <tbody>
          {rows.map((row, index) => {
            const {
              id,
              score,
              presale_stop,
              kyc,
              audit,
              vc_backed,
              presale_market_cap_usd,
              amount_raised,
              token,
              token_distribution,
            } = row;

            // let scoreColor =
            //   " text-text-secondary dark:text-text-secondary-dark";

            // if (score >= 0 && score < 50) scoreColor = " text-red";
            // else if (score >= 70) scoreColor = " text-green";
            // else scoreColor = " text-[#C6A656]";

            const getCap = (type) => {
              const cap = row[`${type}cap`];

              if (!cap) return PLACEHOLDER;

              return (
                <div className="flex items-center gap-2">
                  {formatNumber(+cap)}

                  {/* <span>{cap_currency}</span> */}
                </div>
              );
            };

            const selected = selectedTokens.includes(id);
            const handleSelect = (selected) => {
              const tokens = [...selectedTokens];
              if (selected) {
                tokens.push(id);
                setSelectedTokens(tokens);
              } else {
                setSelectedTokens(tokens.filter((token) => token !== id));
              }
            };

            return (
              <Link
                href={{
                  pathname: `/presale-token-info`,
                  query: {
                    tokenId: id, // pass the token id
                  },
                }}
              >
                <tr key={id}>
                  <td
                    className="text-sm text-[#9194A6] flex items-center gap-x-2 h-[3.2rem]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {editMode &&
                      (selected ? (
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          className="w-5 h-5 text-text-primary dark:text-text-primary-dark cursor-pointer"
                          onClick={() => handleSelect(false)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="w-5 h-5 text-text-primary dark:text-text-primary-dark cursor-pointer"
                          onClick={() => handleSelect(true)}
                        />
                      ))}
                    <span>{index + 1}</span>
                  </td>
                  <td className="text-sm text-[#9194A6] pl-2">
                    <img
                      className="w-8 rounded-full"
                      src={token?.logo}
                      alt="Token"
                    />
                  </td>

                  <td className="">{token?.symbol || PLACEHOLDER}</td>

                  <td className="">{token?.name || PLACEHOLDER}</td>

                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    <div
                      className={`flex items-center justify-center rounded-lg bg-highlight dark:bg-highlight-dark w-11 h-11 ${ScoreColor(
                        score?.total
                      )}`}
                    >
                      {score?.total > 0 ? score?.total : PLACEHOLDER}
                    </div>
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {(presale_stop &&
                      moment(presale_stop, dateFormat).format("YYYY-MM-DD")) ||
                      PLACEHOLDER}
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    <div className="flex flex-wrap gap-y-1 gap-x-1">
                      {audit && (
                        <Tag
                          icon={audit ? <ShieldSvg /> : null}
                          text="Audit"
                          className={`${audit ? "bg-green" : "bg-orange"}`}
                        />
                      )}
                      {vc_backed && (
                        <Tag
                          icon={vc_backed ? <ShieldSvg /> : null}
                          text="VC"
                          className={`${vc_backed ? "bg-green" : "bg-orange"}`}
                        />
                      )}
                      {kyc && (
                        <Tag
                          icon={kyc ? <ShieldSvg /> : null}
                          text="External KYC"
                          className={` ${kyc ? "bg-green" : "bg-orange"}`}
                        />
                      )}
                    </div>
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {amount_raised
                      ? `$ ${formatNumber(+amount_raised)}`
                      : PLACEHOLDER}
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {getCap("hard")}
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {presale_market_cap_usd
                      ? `$ ${formatNumber(+presale_market_cap_usd)}`
                      : PLACEHOLDER}
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {(token?.social_metrics?.followers.count &&
                      formatNumber(+token.social_metrics.followers.count)) ??
                      PLACEHOLDER}
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {(token?.social_metrics?.mentions.count &&
                      formatNumber(+token.social_metrics.mentions.count)) ??
                      PLACEHOLDER}
                  </td>
                  <td className="text-sm text-text-primary dark:text-text-primary-dark truncate">
                    {token?.chains?.[0]?.symbol ? (
                      <ChainLogo
                        chain={token?.chains?.[0]?.symbol}
                        logo={token?.chains?.[0]?.logo}
                      />
                    ) : (
                      <ChainLogo chain="Own" logo={token?.logo} />
                    )}
                  </td>
                </tr>
              </Link>
            );
          })}
        </tbody>
      )}
    </table>
    {!loading && !rows?.length && (
      <div className="text-center mt-4 text-base text-text-secondary dark:text-text-secondary-dark">
        No Presale Tokens
      </div>
    )}
    {loading && (
      <div className="flex flex-col text-text-secondary dark:text-text-secondary-dark text-center w-fit my-auto">
        <RotatingSquare ariaLabel="rotating-square" visible color="grey" />
        <p>Loading...</p>
      </div>
    )}
  </>
);

export default PresaleTable;
