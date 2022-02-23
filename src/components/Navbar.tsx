import {
  Box,
  Flex,
  Spacer,
  HStack,
  
} from "@chakra-ui/layout";
import { Button} from "@chakra-ui/react";
import GoogleFontLoader from "react-google-font-loader";
import Search from "./Search";
import {  useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import {  SunIcon, MoonIcon } from '@chakra-ui/icons'


const Navbar = () => {
  
  const { toggleColorMode } = useColorMode()
  const icon = useColorModeValue(<MoonIcon/>,<SunIcon/>)

  return (
    <Box mb={50}>
      <Box
        bg="rgb(26,32,44)"
        py={0}
        position="fixed"
        top={0}
        right={0}
        left={0}
      >
        <GoogleFontLoader
          fonts={[
            {
              font: "Monoton",
              weights: [400, "400i"],
            },
            {
              font: "Roboto Mono",
              weights: [400, 700],
            },
          ]}
          subsets={["cyrillic-ext", "greek"]}
        />
        <Flex mx="10vw">
          <a href="/">
            {" "}
         
            <Box
              fontFamily="Monoton"
              bgGradient="linear(to-b, #00e1f1, #e90074)"
              bgClip="text"
              fontSize="2em"
              // fontWeight="599"
            >
              TvMAZE
            </Box>
            
          </a>
          <Spacer />
          <HStack>
          <Button rightIcon={icon} size='sm' onClick={toggleColorMode}/>
          <Search />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
export default Navbar;
