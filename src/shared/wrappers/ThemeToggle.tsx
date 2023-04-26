import { ActionIcon, ColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

interface ThemeToggleProps {
dark:boolean
toggleColorScheme: (value?: ColorScheme) => void

}

export function ThemeToggle({dark,toggleColorScheme}:ThemeToggleProps){
    return (
    <ActionIcon
        
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme">
        {dark ? <IconSun size="2rem" /> : <IconMoonStars size="2rem" />}
    {/* <button onClick={()=>scheme.toggleColorScheme('dark')}>toggle</button> */}
    </ActionIcon>
);
}
