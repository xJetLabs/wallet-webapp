import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cx from "classnames";

import { isMobile } from "../../constants";

import { formatNumber } from "../../utils";

import { ROUTE_NAMES } from "../../router/constants";

import {
  myTonBalanceSelector,
  myUnverifiedBalancesSelector,
  myVerifiedBalancesSelector,
  totalAmountsSelector,
  totalTONValueSelector,
  totalUSDValueSelector,
} from "../../store/reducers/user/user.selectors";

import {
  ActionText,
  Avatar,
  Button,
  Cell,
  Group,
  Input,
  Link,
  Panel,
  Text,
} from "../../components";

import { ReactComponent as History24OutlineIcon } from "../../icons/History24Outline.svg";
import { ReactComponent as Settings24OutlineIcon } from "../../icons/Settings24Outline.svg";
import { ReactComponent as Send24OutlineIcon } from "../../icons/Send24Outline.svg";
import { ReactComponent as Receive24OutlineIcon } from "../../icons/Receive24Outline.svg";
import { ReactComponent as Chains20OutlineIcon } from "../../icons/Chains20Outline.svg";
import { ReactComponent as Search17OutlineIcon } from "../../icons/Search17Outline.svg";
import { ReactComponent as Menu24OutlineIcon } from "../../icons/Menu24Outline.svg";

import ton from "../../images/ton.jpeg";

import styles from "./Home.module.css";

export const HomePanel: FC = () => {
  const [cachedTotalAmounts, setCachedTotalAmounts] = useState(null);
  const [searchValue, setSearchValue] = useState<null | string>(null);
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);

  const navigate = useNavigate();

  const myVerifiedBalances = useSelector(myVerifiedBalancesSelector);
  const myUnverifiedBalances = useSelector(myUnverifiedBalancesSelector);
  const myTonBalance = useSelector(myTonBalanceSelector);
  const totalTONValue = useSelector(totalTONValueSelector);
  const totalUSDValue = useSelector(totalUSDValueSelector);
  const totalAmounts = useSelector(totalAmountsSelector);

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (cachedTotalAmounts === null) {
      setCachedTotalAmounts(totalAmounts);

      return;
    }

    if (Number(totalAmounts) > Number(cachedTotalAmounts)) {
      try {
        window.navigator.vibrate([70, 150, 70, 150, 70]);
      } catch (e) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
        setTimeout(() => {
          (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(
            "light"
          );
          setTimeout(() => {
            (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(
              "light"
            );
          }, 200);
        }, 200);
      }

      setCachedTotalAmounts(totalAmounts);
    } else {
      setCachedTotalAmounts(totalAmounts);
    }
  }, [totalAmounts, cachedTotalAmounts]);

  const navigateToSend = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SEND_SELECT);
  };

  const navigateToReceive = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.RECEIVE);
  };

  const navigateToHistory = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.HISTORY);
  };

  const navigateToSettings = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.SETTINGS);
  };

  const navigateToMenu = () => {
    try {
      window.navigator.vibrate(70);
    } catch (e) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    navigate(ROUTE_NAMES.MENU);
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const verifiedBalances = useMemo(() => {
    if (!searchValue) {
      return myVerifiedBalances;
    }

    return myVerifiedBalances.filter((v: any) => {
      return (
        v?.currency.toLowerCase().startsWith(searchValue) ||
        v?.name.toLowerCase().startsWith(searchValue)
      );
    });
  }, [myVerifiedBalances, searchValue]);

  const unverifiedBalances = useMemo(() => {
    if (!searchValue) {
      return myUnverifiedBalances;
    }

    return myUnverifiedBalances.filter((v: any) => {
      return (
        v?.currency.toLowerCase().startsWith(searchValue) ||
        v?.name.toLowerCase().startsWith(searchValue)
      );
    });
  }, [myUnverifiedBalances, searchValue]);

  return (
    <Panel
      className={cx({
        [styles.__panel_mobile]: isMobile,
      })}
    >
      <Group space={24}>
        <Group
          space={24}
          className={cx(styles.__balance_group, {
            [styles.__balance_group_focused]: searchInputFocused,
          })}
        >
          <ActionText
            top="Total balance"
            middle={`${formatNumber(totalTONValue || 0)} TON`}
            bottom={`≈ ${formatNumber(totalUSDValue || 0, {
              minimumFractionDigits: 3,
            })} $`}
            className={styles.__action_text}
          />
          <Group space={24} className={styles.__button_group}>
            <Group space={12}>
              <div className={styles.__buttonGroup_main}>
                <Button
                  stretched
                  before={<Send24OutlineIcon />}
                  mode={"secondary_with_accent_text"}
                  onClick={navigateToSend}
                >
                  Send
                </Button>
                <Button
                  stretched
                  before={<Receive24OutlineIcon />}
                  mode={"secondary_with_accent_text"}
                  onClick={navigateToReceive}
                >
                  Receive
                </Button>
              </div>
              <div className={styles.__buttonGroup}>
                <Button
                  stretched
                  before={<Menu24OutlineIcon />}
                  mode={"secondary_with_accent_text"}
                  onClick={navigateToMenu}
                >
                  More
                </Button>
                <Button
                  stretched
                  before={<History24OutlineIcon />}
                  mode={"secondary_with_accent_text"}
                  onClick={navigateToHistory}
                >
                  Histroy
                </Button>
                <Button
                  stretched
                  before={<Settings24OutlineIcon />}
                  mode={"secondary_with_accent_text"}
                  onClick={navigateToSettings}
                >
                  Settings
                </Button>
              </div>
            </Group>
            <Input
              placeholder="Search..."
              onChange={onSearchInputChange}
              after={<Search17OutlineIcon color="var(--accent)" />}
              className={styles.__search_input}
              onFocus={() => setSearchInputFocused(true)}
              onBlur={() => setSearchInputFocused(false)}
            />
          </Group>
        </Group>
        {myTonBalance ? renderJettonItem(myTonBalance, -1) : null}
        {verifiedBalances.length > 0 ? (
          <Group space={12}>
            <Text
              weight={"600"}
              size={14}
              lineHeight={"17px"}
              color={"var(--accent)"}
            >
              JETTONS
            </Text>
            {verifiedBalances.map((v: any, i: number) => {
              return renderJettonItem(v, i);
            })}
          </Group>
        ) : null}
        {unverifiedBalances.length > 0 ? (
          <Group space={12}>
            <Text
              weight={"600"}
              size={14}
              lineHeight={"17px"}
              color={"var(--accent)"}
            >
              UNVERIFIED
            </Text>
            {unverifiedBalances.map((v: any, i: number) => {
              return renderJettonItem(v, i);
            })}
          </Group>
        ) : null}
      </Group>
    </Panel>
  );
};

const renderJettonItem = (v: any, i: number) => {
  if (!v) {
    return null;
  }

  const image = v.currency === "ton" ? ton : v.image;
  const USDPrice = v?.values?.usd;
  const ProjectURL = v?.url;
  const urlTarget = ProjectURL?.startsWith("https://t.me/")
    ? "_self"
    : "_blank";

  return (
    <Link href={ProjectURL} target={urlTarget} withCursor>
      <Cell
        key={`Jetton_${i}`}
        before={
          <Avatar fallbackName={v.currency.slice(0, 1)} size={42} src={image} />
        }
        after={
          <>
            <Text
              weight={"600"}
              size={14}
              lineHeight={"17px"}
              color={"var(--accent)"}
            >
              {formatNumber(v?.amount || 0)} {v.currency.toUpperCase()}
            </Text>
            {USDPrice ? (
              <Text
                weight={"400"}
                size={14}
                lineHeight={"17px"}
                color={"var(--color_gray_color)"}
              >
                ≈ $ {formatNumber(USDPrice)}
              </Text>
            ) : null}
          </>
        }
        afterStyles={{
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div className={styles.__jetton_with_url_title}>
          {v.name}{" "}
          {ProjectURL ? <Chains20OutlineIcon color="var(--accent)" /> : null}
        </div>
      </Cell>
    </Link>
  );
};
