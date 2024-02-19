import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { IconButton } from "@mui/material";

type Anchor = "top" | "left" | "bottom" | "right";

type DrawerProps = {
  DrawerButton: React.ReactNode; // Corrected prop name
  side: Anchor;
  drawerChild: React.ReactNode;
  width?: number | string;
};

export default function DrawerComp({
  DrawerButton,
  side,
  drawerChild,
  width,
}: DrawerProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: width
          ? width
          : anchor === "top" || anchor === "bottom"
          ? "auto"
          : 250,
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {drawerChild}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(side, true)} sx={{ p: "0.6rem" }}>
          {DrawerButton}
        </IconButton>
        <Drawer
          anchor={side}
          open={state[side]}
          onClose={toggleDrawer(side, false)}
        >
          {list(side)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
