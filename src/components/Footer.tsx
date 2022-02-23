import { Box, Center } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Box
      bg="rgb(33,37,41)"
      color="white"
      mt={20}
      bottom={0}
      right={0}
      left={0}
      position="fixed"
    >
      {" "}
      <Center> Copyrigth © BIT Student 2021 </Center>
    </Box>
  );
};
export default Footer;
