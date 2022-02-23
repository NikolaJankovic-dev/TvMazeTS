import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import {
  Box,
  Center,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

interface ShowCast {
  character: {
    name: string;
    id: number;
    url: string;
    image: {
      medium: string;
      original: string;
    };
  };
  person: {
    id: number;
    name: string;
    url: string;
    image: {
      medium: string;
      original: string;
    };
  };
}
const defaultShow: any = [];

const Cast = () => {
  const [cast, setCast]: [ShowCast[], (cast: ShowCast[]) => void] =
    useState(defaultShow);
 
  const { id } = useParams();
  useEffect(() => {
    axios
      .get<any>(`https://api.tvmaze.com/shows/${id}/cast`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000,
      })
      .then((response) => {
        setCast(response.data);
      })
      
  }, [id]);

  return (
    <Fragment>{cast.length === 0 ? (<Center><Text>TBA</Text></Center>) : (
      <UnorderedList listStyleType="none">
        
        {cast.slice(0, 10).map((showsCast) => (
          <ListItem key={showsCast.person.id} py={1}>
            <HStack>
              <Box>
                <Image
                  src={
                    showsCast.character.image
                      ? showsCast.character.image.medium
                      : "https://tophatsoft.ro/wp-content/uploads/2019/03/picture_coming_soon.jpg"
                  }
                  borderRadius="full"
                  boxSize="40px"
                />
              </Box>
              <VStack align="left" spacing={0}>
                <Text>
                  {" "}
                  {showsCast.person.name ? (
                    <a href={showsCast.person.url} target="_blank" rel="noreferrer">
                      {showsCast.person.name}
                    </a>
                  ) : (
                    "Unknown"
                  )}
                </Text>
                <Text fontSize="0.8em" as="em">
                  as{" "}
                  <a href={showsCast.character.url} target="_blank" rel="noreferrer">
                    {" "}
                    {showsCast.character.name}
                  </a>
                </Text>
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>)}
    </Fragment>
  );
};
export default Cast;
