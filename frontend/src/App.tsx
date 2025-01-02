import React, { useState } from 'react'
import EmployeeList from './components/EmployeeList'
import DeviceList from './components/DeviceList'
import { MantineProvider, createTheme } from '@mantine/core'
import { AppShell, Burger, Group, NavLink } from '@mantine/core'
import { IconUsers, IconDevices } from '@tabler/icons-react'
import '@mantine/core/styles.css'

const theme = createTheme({
  primaryColor: 'blue'
})

export default function App() {
  const [opened, setOpened] = useState(false)
  const [showEmployees, setShowEmployees] = useState(true)

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened }
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />
            <h3 style={{ margin: 0 }}>Employee & Device Manager</h3>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar >
          <NavLink
            label="Employees"
            leftSection={<IconUsers size="1.2rem" />}
            active={showEmployees}
            onClick={() => setShowEmployees(true)}
          />
          <NavLink
            label="Devices"
            leftSection={<IconDevices size="1.2rem" />}
            active={!showEmployees}
            onClick={() => setShowEmployees(false)}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          {showEmployees ? <EmployeeList /> : <DeviceList />}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}