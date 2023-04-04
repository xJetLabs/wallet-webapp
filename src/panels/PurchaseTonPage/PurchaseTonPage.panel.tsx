import { FC, useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { App } from "../../App";
import { ROUTE_NAMES } from "../../router/constants";
import { getFiatRates } from "../../api";
import { SwapDataContext } from "../../providers/SwapDataContextProvider";
import { ReactComponent as Switch15OutlineIcon } from "../../icons/Switch15Outline.svg";
import {
	availableFiatsSelector
  } from "../../store/reducers/user/user.selectors";

import { userActions } from "../../store/reducers";
import { Checkbox } from 'antd';



import {
	AppTitle,
	BlockHeader,
	Button,
	Group,
	Input,
	Panel,
	Select,
	Text,
} from "../../components";
import styles from "./PurchaseTonPage.module.css";
import { userInfo } from "os";

export const PurchaseTonPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let availableFiats = useSelector(availableFiatsSelector);
  
  const { setData, ...data }: any = useContext(SwapDataContext);
  const { selectedTokens } = data;
  let outAmount: string = "", inAmount: string = "";

  const navigateToSelect = (position: string) => {
    navigate(ROUTE_NAMES.FIAT_SELECT, {
      state: {
        position,
      },
    });
  };

  const calculateOutput = (e: any) => {
	inAmount = e.target.value;
	for (let i = 0; i < availableFiats.length; i++) {
		if (availableFiats[i].base_symbol.toLowerCase() == selectedTokens.first.toLowerCase()) {
			outAmount = (Number(e.target.value.replace(",", ".")) / availableFiats[i].price).toFixed(2).toString();
		} else {
			outAmount = "0";
		}
	}
	document.getElementsByTagName("input")[1].setAttribute("value", outAmount);
  };

  const purchaseDisabled = () => {
	if (inAmount == "" || inAmount == "0")
		return true;

	try {
		if (parseInt(outAmount) <= 0) {
			return true;
		}
	} catch { return true; }

	// for (let i = 0; i < availableFiats.length; i++) {
	// 	if (availableFiats[i].base_symbol.toLowerCase() == selectedTokens.first.toLowerCase()) {
	// 		if (availableFiats[i].minAmount > parseInt(inAmount)) {
	// 			return true;
	// 		}
	// 	}
	// }

	if (availableFiats[0].minAmount > parseInt(inAmount)) {
		return true;
	}

	return false;
  };

  const purchase = () => {
    navigate(ROUTE_NAMES.BUY_TON_STEP1, {
      state: {
		currency: selectedTokens.first,
		inAmount: parseFloat(inAmount),
        outAmount: parseFloat(outAmount),
      },
    });
  };

  const PurchaseSecondTokenLoader: FC = () => {
	return (
	  <ContentLoader
		speed={2}
		width={67}
		height={17}
		backgroundColor="var(--background_content)"
		foregroundColor="var(--background_block)"
	  >
		<rect x="0" y="0" rx="6" ry="6" width="67" height="17" />
	  </ContentLoader>
	);
  };

  useEffect(() => {
    const getDedustTokensRequest = async () => {
	  	const fiatRates = await getFiatRates();

		if (!("rub" in fiatRates)) throw new Error("No RUB rate");
		const newAvailableFiats = [
			{ base_symbol: "RUB", last_price: 10000, price: fiatRates.rub, minAmount: 500 }
		];
		dispatch(userActions.setAvailableFiats(newAvailableFiats));
		
		setTimeout(() => {
			setData((prev: any) => ({
				...prev,
				selectedTokens: {
					...prev.selectedTokens,
					first: newAvailableFiats[0]?.base_symbol,
					second: "TON",
					priceInTon: 0,
				},
				allTokens: newAvailableFiats,
			}));
		}, 1000);
    };

    getDedustTokensRequest();
  }, [setData]);

  return (
	<Panel>
	  <Group space={24}>
		<Group space={12}>
		  <AppTitle screenName="Fiat Exchange"></AppTitle><br />
		  <Input
			placeholder="From"
			type={"string"}
			onChange={calculateOutput}
			after={
			  <Select
				value="RUB"
				onClick={() => {
				  navigateToSelect("first");
				}}
			  />
			}
		  />
		  <Input
			placeholder="To"
			type={"string"}
			disabled={true}
			after={
			  !selectedTokens.second ? (
				<PurchaseSecondTokenLoader />
			  ) : (
				<Select
				  value="TON"
				  disabled={true}
				/>
			  )
			}
		  />
		  <div
		  	style={{ 
				width: "94%",
				margin: "auto",
			 }}
		  >
			<Text>Amount of cryptocurrency to receive is calculated only after the payment is processed. Minimum amount for deposit is 500 RUB.</Text>
			<br /><br /><br />
			<Checkbox style={{ fontSize: "16px" }}>I agree to <a href="https://xjet.app/terms" target={"_blank"}>terms of use</a></Checkbox>
		  </div>
		<Group space={12}>
		  <Button
			size="m" onClick={purchase}
			disabled={purchaseDisabled()}
		  >
		  	Buy with a card 
		  </Button>
		</Group>
	  </Group>
	  </Group>
	</Panel>
  );
};
