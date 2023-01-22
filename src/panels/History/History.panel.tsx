import { FC } from "react";

import {
  AppTitle,
  Cell,
  Group,
  Panel,
  PanelHeader,
  Text,
} from "../../components";

import { ReactComponent as Fire18OutlineIcon } from "../../icons/Fire18Outline.svg";
import { ReactComponent as Get18OutlineIcon } from "../../icons/Get18Outline.svg";
import { ReactComponent as Receive18OutlineIcon } from "../../icons/Receive18Outline.svg";
import { ReactComponent as Send18OutlineIcon } from "../../icons/Send18Outline.svg";

export const HistoryPanel: FC = () => {
  return (
    <Panel>
      <Group space={24}>
        <Cell
          before={<Fire18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              + 1 323 AMBR
            </Text>
          }
        >
          Cheque activation
        </Cell>
        <Cell
          before={<Send18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_negative)"
            >
              - 103 AMBR
            </Text>
          }
        >
          Sent to User
        </Cell>
        <Cell
          before={<Get18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              + 1 323 AMBR
            </Text>
          }
        >
          Received from User
        </Cell>
        <Cell
          before={<Receive18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              - 4 132 323 AMBR
            </Text>
          }
        >
          Fire jetton in chat
        </Cell>
        <Cell
          before={<Fire18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              + 1 323 AMBR
            </Text>
          }
        >
          Cheque activation
        </Cell>
        <Cell
          before={<Send18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_negative)"
            >
              - 103 AMBR
            </Text>
          }
        >
          Sent to User
        </Cell>
        <Cell
          before={<Get18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              + 1 323 AMBR
            </Text>
          }
        >
          Received from User
        </Cell>
        <Cell
          before={<Receive18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              - 4 132 323 AMBR
            </Text>
          }
        >
          Fire jetton in chat
        </Cell>
        <Cell
          before={<Fire18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_positive)"
            >
              + 1 323 AMBR
            </Text>
          }
        >
          Cheque activation
        </Cell>
        <Cell
          before={<Send18OutlineIcon />}
          description="EQ...GR9E"
          after={
            <Text
              weight="600"
              size={14}
              lineHeight={"17px"}
              color="var(--color_negative)"
            >
              - 103 AMBR
            </Text>
          }
        >
          Sent to User
        </Cell>
      </Group>
    </Panel>
  );
};
