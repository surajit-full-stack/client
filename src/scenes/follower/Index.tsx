import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Followers from "./Follower";
import { Suggestion } from "./Suggestion";
import Followings from "./Following";
import { apiStore } from "../../state/api";
import { useParams } from "react-router-dom";

export default function Index() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  const { getFollowers, getFollowings, getFollowersSuggestion } = apiStore();
  const { userId } = useParams();

  useEffect(() => {
    const uidAsNum: number = parseInt(userId as string);
    getFollowers(uidAsNum);
    getFollowings(uidAsNum);
    getFollowersSuggestion();
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1", margin: "5rem 0" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Followers" value="1" />
            <Tab label="Followings" value="2" />
            <Tab label="Others" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {" "}
          <Followers />{" "}
        </TabPanel>
        <TabPanel value="2">
          <Followings />
        </TabPanel>
        <TabPanel value="3">
          {" "}
          <Suggestion />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
