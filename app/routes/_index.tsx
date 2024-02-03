import { Progress } from '#app/components/ui/progress';

export default function Index() {
  return (
    <div className="container flex flex-col  items-center justify-center p-20 gap-4">
      <Progress value={33} />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        In progress ....
      </h3>
    </div>
  );
}
