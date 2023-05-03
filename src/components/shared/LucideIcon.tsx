import { LucideIcon,LucideProps } from 'lucide-react'

interface LucideIconProps {
Icon:LucideIcon
}

export function IconWrapper({ Icon, ...props }: LucideIconProps & LucideProps){
return ( <Icon {...props}/>);
}
