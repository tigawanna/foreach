import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem,ColorScheme } from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import { AppLogo } from '../../shared/wrappers/AppLogo';
import { ThemeToggle } from '../../shared/wrappers/ThemeToggle';
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
        <Tooltip label={label} position="right" transitionProps={{ duration: 10 }}>
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
    open:boolean
    color_theme: {
        colorScheme: ColorScheme;
        toggleColorScheme: (value?: ColorScheme | undefined) => void;
        dark: boolean;
    }
}

export function NavbarMinimal({ open, color_theme }:INavbarProps){
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
        <Navbar  width={{ base: 80 }} p="md" hidden={open}>
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
                    <ThemeToggle 
                    dark={color_theme.dark} 
                    toggleColorScheme={color_theme.toggleColorScheme}
                    />
                </Center>
            </Navbar.Section>
            <Navbar.Section>
                
                <Stack justify="center" spacing={0}>
                    
                    <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
                    <NavbarLink icon={IconLogout} label="Logout" />
              
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
