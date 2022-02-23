import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {
  Box,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Center } from "@chakra-ui/react";
import Cast from "../components/Cast";
import Seasons from "../components/Seasons";

interface ShowPro {
  id: number;
  name: string;
  genres: string;
  summary: string;
  image: {
    original: string;
    medium: string;
  };
}
const defaultShow: any = [];

const Show = ({ props }: any) => {
  const [show, setShow]: [ShowPro, (show: ShowPro) => void] =
    useState(defaultShow);
  const { id } = useParams();
  const replaceOnce = require("replace-once");
  useEffect(() => {
    axios
      .get<any>(`https://api.tvmaze.com/shows/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000,
      })
      .then((response) => {
        setShow(response.data);
      })
  }, [id]);
  

  return (
    <Box mb={10}>
      <Center>
        <Text fontSize="1.7em" fontWeight="bold">
          {show.name}
        </Text>
      </Center>
      <SimpleGrid minChildWidth="280px" spacing={10} my={10}>
        <GridItem aria-rowspan={2} maxWidth="500px">
          <Image src={show.image ? show.image.original : "https://tophatsoft.ro/wp-content/uploads/2019/03/picture_coming_soon.jpg"} borderRadius="20px"/>
        </GridItem>
        <GridItem>
          <Center>
            <Text as="b" mb={2}> CAST </Text>
          </Center>
          <Cast/>       
        </GridItem>
        <GridItem><Center><Text as="b" mb={2}> SEASONS </Text></Center>
            <Seasons/>
        </GridItem>
      </SimpleGrid>
      <GridItem>
          <Text as="b">DESRIPTION:</Text>
        <Text>
          {show.summary
            ? replaceOnce(
                show.summary,
                ["<p>", "</p>", "<b>", "</b>"],
                ["", "", "", ""],
                "gi"
              )
            : ""}
        </Text>
      </GridItem>
    </Box>
  );
};
export default Show;
