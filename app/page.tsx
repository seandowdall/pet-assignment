import Image from "next/image";

import AddDataDialog from "./_components/add-data-dialog";
import DisplayAllCards from "./_components/display-all-cards";
import SimpleInputData from "./_components/simple-input-data";
import SimpleSendData from "./_components/simple-send-data";

export default function Home() {
  return (
    <main className="container mx-auto mt-10">
      {/* <AddDataDialog /> */}
      <SimpleInputData />
      <SimpleSendData />
      {/* <div className="mt-10">
        <DisplayAllCards />
      </div> */}
    </main>
  );
}
