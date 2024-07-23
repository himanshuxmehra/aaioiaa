import { useContext } from "react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card"
import { Label } from "./ui/label.tsx"
import { AppContext } from "../Context.ts"
import { Skeleton } from "./ui/skeleton.tsx"

export function ModelCard(props: { model: string }) {
  const { reply, isLoading } = useContext(AppContext);
  return (
    <Card className="w-[350px] h-[350px]">
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <br />
            <Label htmlFor="framework">{props.model}</Label>
          </div>

          <div className="flex flex-col space-y-1.5">
            {/* { isLoading[props.model as keyof typeof isLoading] ?<> 
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" /></> :
            <>
            {reply.map((item: any, index: number) => {
              if(item.model === props.model) 
              return (<div key={index} className="flex flex-col space-y-1.5">
                <p>
                  {item.response}
                </p>
                <hr />
              </div>)
            })}
            </>} */}
            {reply.map((item: any, index: number) => {
              if (item.model === props.model)
                return (<div key={index} className="flex flex-col space-y-1.5">
                  <p>
                    {item.response}
                  </p>
                  <hr />
                </div>)
            })}
          </div>

        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}

      </CardFooter>
    </Card>
  )
}
