import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1" p="4" overflowY="auto">
        {children}
      </Box>
    </Flex>
  )
}

export default Layout
