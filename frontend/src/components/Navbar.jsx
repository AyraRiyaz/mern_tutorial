import { Button, Container,Flex,HStack,Text } from "@chakra-ui/react"
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return <Container maxW="2000px" px={4} >
    <Flex 
      alignItems="center"
      justifyContent="space-between"
      h={16}
      flexDir={{
        base: "column",
        sm:"row"
      }}>

    

    <Text
      fontSize = {{base:"50", sm:"28"}}
      fontWeight="bold"
      textTransform={"uppercase"}
      bgGradient="to-r"
      gradientFrom="cyan.400"
      gradientTo="blue.500"
      bgClip="text" >
        <Link to="/">PRODUCT STORE</Link>
    </Text>

    <HStack spacing ={2} textAlign="center">
      <Link to ='/create'>
      <Button>
        <FaPlusSquare  fontSize={15}/>
      </Button>
      </Link>

      <Button onClick={toggleColorMode}>
        {colorMode ==="light" ? <IoMoon /> : <LuSun />}
      </Button>

      
    </HStack>


  </Flex>

  </Container>
}

export default Navbar;