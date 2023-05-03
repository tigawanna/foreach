import { Button } from "@/src/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"






export function CardWithForm() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Framework</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                    <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    )
}
