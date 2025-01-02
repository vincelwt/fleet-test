import React, { useState } from 'react'
import EmployeeList from './components/EmployeeList'
import DeviceList from './components/DeviceList'
import { MantineProvider, createTheme, useMantineColorScheme, useComputedColorScheme } from '@mantine/core'
import { AppShell, Burger, Group, NavLink, ActionIcon } from '@mantine/core'
import { IconUsers, IconDevices, IconSun, IconMoon } from '@tabler/icons-react'
import '@mantine/core/styles.css'

const theme = createTheme({
  primaryColor: 'blue'
})

export default function App() {
  const [opened, setOpened] = useState(false)
  const [showEmployees, setShowEmployees] = useState(true)

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
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
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={() => setOpened(!opened)}
                hiddenFrom="sm"
                size="sm"
              />
              <h3 style={{ margin: 0 }}>Employee & Device Manager</h3>
            </Group>
            <ColorSchemeToggle />
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

function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === 'light' ? (
        <IconMoon size="1.2rem" stroke={1.5} />
      ) : (
        <IconSun size="1.2rem" stroke={1.5} />
      )}
    </ActionIcon>
  )
}