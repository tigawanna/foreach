import { useEffect, useState } from 'react';
import { Burger,ColorSchemeProvider,MantineProvider} from '@mantine/core';
import { NavbarMinimal } from './Navbar';
import { useMantineColorTheme } from '../../shared/hooks/useMantineColorTheme';
import { useMediaQuery } from '@mantine/hooks';

interface mainLayooutProps {
    children: React.ReactNode
}

export function MainLayoout({children}:mainLayooutProps){
  
    const [opened, setOpened] = useState(false);
    const color_theme = useMantineColorTheme({})
 
    const matchesSm = useMediaQuery('(min-width: 768px)');
    useEffect(() => {
        if (matchesSm) {
            setOpened(true)
        }
    }, [matchesSm])

return (
    <ColorSchemeProvider colorScheme={color_theme.colorScheme} 
    toggleColorScheme={color_theme.toggleColorScheme}>
    <MantineProvider theme={{ colorScheme:color_theme.colorScheme }} withGlobalStyles withNormalizeCSS>
    
    <div className='h-full w-full flex flex-col'>
        
        <div 
        style={{backgroundColor:color_theme.dark?"black":""}}
        className='h-12 w-full p-2 md:hidden fixed top-0 z-50 '>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        // color={theme.colors.gray[6]}
                        mr="xl"
                    />
        </div>


        <div className='w-full flex mt-12 md:mt-2  gap-2'>
               {opened&&
               <div style={{ backgroundColor: color_theme.dark ? "black" : "" }} 
                    className='w-20 md:static fixed '>
                    <NavbarMinimal color_theme={color_theme} />
                </div>}
                <div className='h-full w-full '>{children}</div>
        </div>

 
    </div>
<div>
</div>

    </MantineProvider>
    </ColorSchemeProvider>
);
}
