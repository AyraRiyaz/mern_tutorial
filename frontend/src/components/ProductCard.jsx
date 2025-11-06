import { Box, Heading, HStack, IconButton, Image, Text, Input, VStack,Button } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "@/components/ui/toaster";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogCloseTrigger, DialogTitle,DialogFooter } from "./ui/dialog";
import { useState } from "react";


const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.800", "gray.200");
    const bgColor = useColorModeValue("white", "gray.700");
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore();

    const handledeleteProduct = async(pid) =>{
      const {success,message} = await deleteProduct(pid);
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

    }
    setIsDeleteOpen(false);
  }
    const handleUpdatedProduct = async (pid,updatedProduct) => {
      const {success,message} = await updateProduct(pid,updatedProduct);
      if(!success) {
        toaster.create({
              title: "Error",
              description: message,
              type: "error"
            });
          }else{
            toaster.create({
              title: "Success",
              description: "Product updated successfully.",
              type: "success"
            });
          }
          setIsOpen(false);
        }





    return (
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}  
        bg={bgColor}   
      >
        <Image src={product.image} alt={product.name} w="full" h={"48"} objectFit="cover" />
        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
            <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton 
                  aria-label="Edit product"
                  onClick={() => setIsOpen(true)}
                  colorPalette="blue"
                >
                  <FiEdit />
                </IconButton>
                <IconButton 
                  aria-label="Delete product"
                  onClick={() => setIsDeleteOpen(true)} 
                  colorPalette="red"
                >
                  <FiTrash2 />
                </IconButton>
            </HStack>
        </Box>

        <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Product</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
              <VStack spacing={4}>
                <Input 
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                />
                <Input 
                  placeholder="Product Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                />
                <Input 
                  placeholder="Product Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                />
              </VStack>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button colorPalette="blue" onClick={() => handleUpdatedProduct(product._id,updatedProduct)}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>

        <DialogRoot open={isDeleteOpen} onOpenChange={(e) => setIsDeleteOpen(e.open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
              <Text>Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.</Text>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button colorPalette="red" onClick={() => handledeleteProduct(product._id)}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>

      </Box>
    )}

export default ProductCard;``