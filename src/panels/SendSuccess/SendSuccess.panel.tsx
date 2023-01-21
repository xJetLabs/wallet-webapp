import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  ActionText,
  AppTitle,
  Button,
  Group,
  Panel,
  PanelHeader,
} from "../../components";

import { ReactComponent as Settings24OutlineIcon } from "../../icons/Settings24Outline.svg";
import { ReactComponent as Back24OutlineIcon } from "../../icons/Back24Outline.svg";

export const SendSuccessPanel: FC = () => {
  const navigate = useNavigate();

  return (
    <Panel
      header={
        <PanelHeader
          before={
            <Button
              before={<Back24OutlineIcon />}
              mode={"transparent_with_accent_text"}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          after={
            <Button
              before={<Settings24OutlineIcon />}
              mode={"transparent_with_accent_text"}
              onClick={() => {
                navigate("/settings", {
                  replace: true,
                });
              }}
            />
          }
        >
          <AppTitle screenName="Send" />
        </PanelHeader>
      }
      centerVertical
    >
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
