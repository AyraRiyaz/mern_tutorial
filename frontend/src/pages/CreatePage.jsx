import { Box, Button, Container, Heading, Input, Toast, VStack } from '@chakra-ui/react';
import React from 'react'
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: '',
    image: ''
  });

  const { createProduct } = useProductStore();
  const handleCreateProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    if(!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error"
      });
    }else{
      toaster.create({
        title: "Success",
        description: message,
        type: "success"
      });
      setNewProduct({
        name: '',
        price: '',
        image: ''
      });
    }
  };
    return <Container maxW="container.md">
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box w={"full"} bg={useColorModeValue("gray.100", "gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
             placeholder='Product Name'
             name='name'
             value={newProduct.name}
             onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
             width="full"
            />
            <Input
             placeholder='Price'
             name='price'
             type='number'
             value={newProduct.price}
             onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
             width="full"
            />
            <Input
             placeholder='Image URL'
             name='image'
             value={newProduct.image}
             onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
             width="full"
            />
            <Button colorScheme="blue" onClick={handleCreateProduct} width="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
}

export default CreatePage;
            