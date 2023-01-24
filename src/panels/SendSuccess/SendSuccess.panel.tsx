import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ActionText, Button, Group, Panel } from "../../components";
import { formatNumber } from "../../utils";

export const SendSuccessPanel: FC = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const formatToken = (token: string) => {
    if (!token) {
      return "";
    }

    if (token.length < 16) {
      return token;
    }

    const [beforeCopy, afterCopy] = [token.slice(), token.slice()];

    const before = beforeCopy.slice(0, 6);
    const after = afterCopy.slice(-7);

    return `${before}...${after}`;
  };

  return (
    <Panel centerVertical>
      <Group space={24}>
        <ActionText
          top="Successfully sent"
          middle={`${formatNumber(
            state?.amount || 0
          )} ${state?.currency?.toUpperCase()}`}
          bottom={formatToken(state?.receiverToken || "")}
        />
        <Button
          size={"m"}
          mode={"secondary"}
          onClick={() => {
            navigate(-3);
          }}
        >
          Back
        </Button>
      </Group>
    </Panel>
  );
};
