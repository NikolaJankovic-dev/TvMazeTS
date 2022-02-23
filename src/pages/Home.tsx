import { Image } from "@chakra-ui/image";
import { SimpleGrid, Box, Center } from "@chakra-ui/layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ShowsType {
  id: number;
  name: string;
  image: { medium: string; original: string };
}

const defaultShow: ShowsType[] = [];

const Home = () => {
  const [top, setTop]: [ShowsType[], (top: ShowsType[]) => void] =
    useState(defaultShow);


  useEffect(() => {
    axios
      .get<ShowsType[]>("https://api.tvmaze.com/shows", {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setTop(response.data);
      });
  }, []);
  //   const handleClick = (e:number) =>{
  //       navigate(e)
  //   }

  return (
    <Box>
      <SimpleGrid minChildWidth="260px" spacing="20px" mb={10}>
        {top.slice(0, 50).map((show) => (
          <Box key={show.id} props={show.id} _hover={{fontWeight: "semibold"}}>
            <Center>
              <Link to={`/show/${show.id}`}>
                <Image
                // minchildWidth="260px" 
                  src={show.image.medium}
                  minWidth={260}
                  my="auto"
                  mt="16px"
                  borderTop="solid 2px rgb(33,37,41)"
                  borderLeft="solid 2px rgb(33,37,41)"
                  borderRight="solid 2px rgb(33,37,41)"
                  borderTopLeftRadius={10}
                  borderTopRightRadius={10}
                  objectFit="cover"
                />{" "}
              </Link>
            </Center>
            <Center>
              <Link to={`/show/${show.id}`}>
                <Box
                  width={260}
                  borderBottom="solid 2px rgb(33,37,41)"
                  borderLeft="solid 2px rgb(33,37,41)"
                  borderRight="solid 2px rgb(33,37,41)"
                  borderBottomLeftRadius={10}
                  borderBottomRightRadius={10}

                >
                  <Center> {show.name}</Center>
                </Box>
              </Link>
            </Center>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
