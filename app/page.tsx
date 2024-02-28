import DisplayAllCards from "./_components/display-all-cards";

import SimpleSendData from "./_components/simple-send-data";
import SimpleGetData from "./_components/simple-get-data";

import SimpleFileUploadJson from "./_components/simple-file-upload-json";
import SimpleRawJson from "./_components/simeple-raw-json";
import SearchPets from "./_components/search-pets";

export default function Home() {
  return (
    <main className="container mx-auto mt-10 bg-gray-200">
      <div className="flex flex-row space-y-10">
        <SimpleGetData />
        <SimpleSendData />
        <SimpleRawJson />
        <SimpleFileUploadJson />
      </div>
      <div>
        <SearchPets />
      </div>

      <div className="mt-10 pb-10">
        <DisplayAllCards />
      </div>
    </main>
  );
}
