import DisplayAllCards from "./_components/display-all-cards";

import SimpleFileUploadJson from "./_components/simple-file-upload-json";
import SimpleRawJson from "./_components/simeple-raw-json";
import SearchPets from "./_components/search-pets";
import SearchById from "./_components/search-by-id";
import SearchTypeAge from "./_components/search-type-age";
import SearchTypeGender from "./_components/search-type-gender";

export default function Home() {
  return (
    <main className="container mx-auto mt-10 bg-gray-200">
      <div className="mb-10">
        <h1 className="text-3xl font-medium">Input your JSON Data:</h1>
        <div className="flex flex-row space-y-10">
          {/* <SimpleGetData /> */}
          {/* <SimpleSendData /> */}
          <SimpleRawJson />
          <SimpleFileUploadJson />
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-medium">
          Perform queried search on type and availability:
        </h1>
        <SearchPets />
        <h1 className="text-3xl font-medium">
          Perform queried search on type and age:
        </h1>
        <SearchTypeAge />
        <h1 className="text-3xl font-medium">
          Perform queried search on type and gender:
        </h1>
        <SearchTypeGender />
        <h1 className="text-3xl font-medium">Search By Id:</h1>
        <SearchById />
      </div>

      <div className="mt-10 pb-10 flex flex-col space-y-5">
        <h1 className="text-3xl font-medium">Displaying All Pets:</h1>
        <DisplayAllCards />
      </div>
    </main>
  );
}
