import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Tooltip } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
// import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";
// import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";




const SideDrawer = () => {
  
   const  [search, setSearch] = useState("")
   const  [searchResult, setSearchResult] = useState([])
   const  [loading, setLoading] = useState(false)
   const  [loadingChat, setLoadingChat] = useState()
   

    const {user} =ChatState();

    const history=useHistory()

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef()

  
    const logoutHandler=()=>{
      localStorage.removeItem("userInfo");
      history.push("/");
    }
  
  
  return (
    <>
     
     <Box
      
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
     
     >

       <Tooltip label="Search Users to chat" hasArrow  placement="bottom-end">

        <Button variant="ghost" ref={btnRef}  onClick={onOpen}>
           
          <i class="fa fa-search" aria-hidden="true"></i>

          <Text d={{base:"none",md:"flex"}} px="4">
              Search User
          </Text>
    
        </Button>

       </Tooltip>

        <Text fontSize="2xl" fontFamily="Work Sans">
          Dialog Dash
        </Text>

         <div>
          <Menu>
            <MenuButton p={1}>

              <BellIcon fontSize="2xl" m="1" />

            </MenuButton>
            
            <MenuList></MenuList>

          </Menu>

          <Menu>
            <MenuButton  as ={Button}  rightIcon={<ChevronDownIcon/>}>
              <Avatar 
               size="sm"
               cursor="pointer" 
               name={user.name}
               src={user.pic}
              />
            </MenuButton>
            
            <MenuList>
             <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
             </ProfileModal>  
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>

            </MenuList>

          </Menu>


         </div>

     </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </>
  )
};

export default SideDrawer;

