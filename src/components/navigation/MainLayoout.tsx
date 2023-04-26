import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { ClientSuspense } from 'rakkasjs';
import { RootHeader } from '../rootlayout/RootHeader';
import { NavbarMinimal } from './Navbar';
import { useMantineColorTheme } from '../../shared/hooks/useMantineColorTheme';

interface mainLayooutProps {
    children: React.ReactNode
}

export function MainLayoout({children}:mainLayooutProps){
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const color_theme = useMantineColorTheme({})
return (
    <ColorSchemeProvider colorScheme={color_theme.colorScheme} 
    toggleColorScheme={color_theme.toggleColorScheme}>
        <MantineProvider theme={{ colorScheme:color_theme.colorScheme }} 
        withGlobalStyles withNormalizeCSS>
    <AppShell
        // styles={{
        //     main: {
        //         background: color_theme.dark ? theme.colors.dark[8] : 'transparent',
        //     },
        // }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
       
            <NavbarMinimal open={!opened} color_theme={color_theme}/>
        }
        aside={
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                    <Text>Application sidebar</Text>
                </Aside>
            </MediaQuery>
        }
        footer={
            <Footer height={60} p="md">
                <footer className="footer flex flex-col md:flex-row items-center justify-center p-2">
                    Application Footer
                </footer>
            </Footer>
        }
        header={
            <Header height={{ base: 50, md: 70 }} p="md">
                <RootHeader/>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>

                    <Text>Application header</Text>
                </div>
            </Header>
        }
    >
        {children}
    </AppShell>
    </MantineProvider>
    </ColorSchemeProvider>
);
}
