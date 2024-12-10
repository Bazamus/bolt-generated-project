import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout({ children }) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1" overflow="auto">
        <Header />
        <Box p="4">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
