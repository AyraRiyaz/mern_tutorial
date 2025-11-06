
import { Link } from 'react-router-dom'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Text
              fontSize = "30"
              fontWeight="bold"
              textTransform={"uppercase"}
              bgGradient="to-r"
              gradientFrom="cyan.400"
              gradientTo="blue.500"
              bgClip="text"
              textAlign="center">
                Current Products
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3}}
              gap={8}
              w="full"
            
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            {products.length==0&&(
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
              No Products Found {" "}
              <Link to ={"/create"}>
                <Text as="span" color="blue.500" textDecoration="underline">
                  Create a new product
                </Text>
              
              </Link>
            </Text>
            )}
      </VStack>
    </Container>
  )
}

export default HomePage