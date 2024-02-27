import Image from "next/image";
import InputData from "./_components/input-data";
import AddDataDialog from "./_components/add-data-dialog";

export default function Home() {
  return (
    <main>
      <AddDataDialog />
      <InputData />
    </main>
  );
}
