import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ActionText, Button, Group, Panel } from "../../components";

export const SendSuccessPanel: FC = () => {
  const navigate = useNavigate();

  return (
    <Panel centerVertical>
      <Group space={24}>
        <ActionText
          top="Successfully sent"
          middle="3.53 TON"
          bottom="EQBdawd..dawwdDW"
        />
        <Button
          size={"m"}
          mode={"secondary"}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Group>
    </Panel>
  );
};
