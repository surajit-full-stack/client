import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState, useRef } from "react";
import { http } from "../../Axiox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface User {
  userName: string;
  profilePicture:string;
  userId: number;
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export default function AutocompleteSearch() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly User[]>([]);
  const [value, setValue] = useState<String>();
  const loading = open && options.length === 0;
  const debounceRef = useRef<number | null>(null);
  const navi = useNavigate();
  const debounce = (func: (query: string) => void, time: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(func, time);
  };

  const searchName = (query: string) => {
    debounce(() => {
      if (!!!query) return;

      http
        .get("user-autocomplete/" + query, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setOptions(data);
        })
        .catch(() => {
          toast.error("Something went wrong . try again");
        });
    }, 1200);
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  console.log("options", options, open, loading);
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        id="asynchronous-demo"
        //   sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) =>
          option.userName === value.userName
        }
        onChange={(_, newValue) => {
          navi(`/profile/${newValue?.userName}`);
        }}
        getOptionLabel={(option) => option.userName}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <StyledInputBase
              {...params.inputProps}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (e.nativeEvent.inputType !== "deleteContentBackward")
                  searchName(e.target.value);
              }}
              placeholder="Search…"
            />
          </div>
        )}
        renderOption={(props, option) => (
            <li {...props}>
              <img
                src={option.n} // Replace with the actual property containing the image URL
                alt={`Avatar of ${option.userName}`}
                style={{
                  marginRight: '10px', // Adjust the styling as needed
                  width: '20px', // Adjust the styling as needed
                  height: '20px', // Adjust the styling as needed
                  borderRadius: '50%', // Adjust the styling as needed
                }}
              />
              {option.userName}
            </li>
          )}
      />
    </Search>
  );
}
