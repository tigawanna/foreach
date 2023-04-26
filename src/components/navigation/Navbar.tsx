import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem,ColorScheme, ActionIcon, MediaQuery } from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
    IconMoonStars,
    IconSun,
} from '@tabler/icons-react';
import { AppLogo } from '../../shared/wrappers/AppLogo';
import { Link } from 'rakkasjs';


const useStyles = createStyles((theme) => ({
    link: {
        width: rem(50),
        height: rem(50),
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface NavbarLinkProps {
    icon: React.FC<any>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 1 }}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon size="1.5rem" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home', href: '/' },
    { icon: IconUser, label: 'Profile', href: '/profile' },
    { icon: IconSettings, label: 'Settings' },
    // { icon: IconGauge, label: 'Dashboard',href:'/profile' },
    // { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    // { icon: IconCalendarStats, label: 'Releases' },
    // { icon: IconFingerprint, label: 'Security' },
];


interface INavbarProps{
  
    color_theme: {
        colorScheme: ColorScheme;
        toggleColorScheme: (value?: ColorScheme | undefined) => void;
        dark: boolean;
    }
}

export function NavbarMinimal({  color_theme }:INavbarProps){
    const [active, setActive] = useState(2);



    const links = mockdata.map((link, index) => (
        <Link href={link.href} key={link.label}>
        <NavbarLink
          {...link}
          active={index === active}
          onClick={() => setActive(index)}
        />
        </Link>
    ));

    return (
        <MediaQuery largerThan="sm" styles={{ height:'95vh'}}>
        <Navbar 
        width={{ base:'100%' }} height="85vh" p="md" >
            <Center>
                <Link href='/'>
               <AppLogo/>
               </Link>
            </Center>
            
            <Navbar.Section mt={50} grow>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>

             <Navbar.Section >
                <Center>
                    <Tooltip label="theme" position="right">
                        <ActionIcon
                            color={color_theme.dark ? 'yellow' : 'blue'}
                            onClick={() => color_theme.toggleColorScheme()}
                            title="Toggle color scheme">
                            {color_theme.dark ? <IconSun size="2rem" /> : <IconMoonStars size="2rem" />}

                        </ActionIcon>
                    </Tooltip>
                </Center>
            </Navbar.Section>

            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
                    <NavbarLink icon={IconLogout} label="Logout" />
              </Stack>
            </Navbar.Section>


        </Navbar>
        </MediaQuery>
    );
}
