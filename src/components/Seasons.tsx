import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
    Box,
    HStack,
    ListItem,
    Text,
    UnorderedList,
    VStack,
  } from "@chakra-ui/layout";
  import { Image } from "@chakra-ui/image";

interface ShowsSeasons {
  id: string;
  url: string;
  episodeOrder: number;
  number: number
  image: {
    medium: string;
    original: string;
  };
}
const defaultShow: any = [];

const Seasons = () => {
  const [seasons, setSeasons]: [
    ShowsSeasons[],
    (seasons: ShowsSeasons[]) => void
  ] = useState(defaultShow);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get<any>(`https://api.tvmaze.com/shows/${id}/seasons`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000,
      })
      .then((response) => {
        setSeasons(response.data);
      })      
  }, [id]);

  return ( <UnorderedList listStyleType="none">
  {seasons.map((season, index:number) => (
    <ListItem key={season.id} py={1}>
      <HStack>
        <Box>
          <Image
            src={season.image ? season.image.medium : "https://tophatsoft.ro/wp-content/uploads/2019/03/picture_coming_soon.jpg" }
            borderRadius="full"
            boxSize="40px"
          />
        </Box>
        <VStack align="left" spacing={0}>
          <Text>
            {" "}
            <a href={season.url} target="_blank"  rel="noreferrer">
             Season {season.number}
            </a>
          </Text>
          <Text fontSize="0.8em" as="em">
              <a href={season.url} target="_blank"  rel="noreferrer"> Episodes: {season.episodeOrder ? season.episodeOrder : "TBA"}</a> 
          </Text>
        </VStack>
      </HStack>
    </ListItem>
  ))}
</UnorderedList>)
};

export default Seasons;
