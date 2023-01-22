import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Panel } from "../../components";

import { ReactComponent as LogoIcon } from "../../icons/Logo.svg";

import styles from "./Load.module.css";

export const LoadPanel: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home", {
        replace: true,
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Panel centerVertical centerHorizontal>
      <LogoIcon className={styles.logo_animation} color={"var(--accent)"} />
    </Panel>
  );
};
