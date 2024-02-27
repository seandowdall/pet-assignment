import Image from "next/image";

import AddDataDialog from "./_components/add-data-dialog";
import DisplayAllCards from "./_components/display-all-cards";

import SimpleSendData from "./_components/simple-send-data";
import SimpleGetData from "./_components/simple-get-data";
import SimpleRawJson from "./_components/simeple-raw-json";
import SimpleFileUploadJson from "./_components/simple-file-upload-json";

export default function Home() {
  return (
    <main className="container mx-auto mt-10 bg-green-200">
      {/* <AddDataDialog /> */}
      <SimpleGetData />
      <SimpleSendData />
      <SimpleRawJson />
      <SimpleFileUploadJson />
      {/* <div className="mt-10">
        <DisplayAllCards />
      </div> */}
    </main>
  );
}
