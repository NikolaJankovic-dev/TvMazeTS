import { Input } from "@chakra-ui/input";
import { Image } from "@chakra-ui/image";

import { Box, ListItem, UnorderedList, HStack } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";

interface ShowsType {
  show: {
    id: number;
    name: string;
    image: { medium: string; original: string };
  };
}

const defaultShow: ShowsType[] = [];

const Search = () => {
  const [show, setShow]: [ShowsType[], (show: ShowsType[]) => void] =
    useState(defaultShow);
  const [searchTerm, setSearchTerm]: [string, (searchTerm: string) => void] =
    useState("");
  let searchValue: any = document.getElementById("search");
  const [visiblity1, setVisibility1] = useState<boolean>(true);
  const handleBlur = () => {
    const timer = setTimeout(() => {
      setVisibility1(false);
    }, 100);
    return () => clearTimeout(timer);
  };
  const handleClick = () => {
    setVisibility1(true);
  };
  const handleChange = () => {
    if (!searchValue) return;
    setSearchTerm(searchValue.value);
  };

  useEffect(() => {
    axios
      .get<ShowsType[]>(`https://api.tvmaze.com/search/shows?q=${searchTerm}`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setShow(response.data);
      });
  });
  //
  return (
    <Box mx="auto">
      <Box mx="auto" color="white" onBlur={handleBlur}>
        <Input
          ml={1}
          my={1}
          type="text"
          placeholder="search"
          id="search"
          onChange={handleChange}
          autoComplete="off"
          onClick={handleClick}
        />
      </Box>
      <UnorderedList
        position="absolute"
        right="10vw"
        top="47px"
        listStyleType="none"
        width="214px"
        bg="rgb(26,32,44)"
        style={
          visiblity1 ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        {show.slice(0, 10).map((tv) => (
          <a href={`/show/${tv.show.id}`}>
            {" "}
            <ListItem
              style={
                visiblity1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              key={tv.show.id}
              border="1px black solid"
              p={2}
              _hover={{ bg: "black", color: "white" }}
            >
              {" "}
              <HStack>
                <Image
                  src={
                    tv.show.image
                      ? tv.show.image.medium
                      : "https://i.stack.imgur.com/7aSGv.png"
                  }
                  boxSize="24px"
                  borderRadius="full"
                />
                <Box>{tv.show.name}</Box>
              </HStack>
            </ListItem>
          </a>
        ))}
      </UnorderedList>
    </Box>
  );
};
export default Search;
