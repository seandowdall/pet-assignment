"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const isBrowser = typeof window !== "undefined";
const fileFallback = z.any();

const formSchema = z.object({
  singleJsonObject: z.string().optional(),
  jsonFile: isBrowser ? z.instanceof(FileList).optional() : fileFallback,
});

type FormValues = z.infer<typeof formSchema>;

const DataForm: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, register, reset, watch } = methods;

  const onSubmit = async (data: FormValues) => {
    const url = process.env.NEXT_PUBLIC_URL || "";

    if (data.singleJsonObject) {
      try {
        const jsonObject = JSON.parse(data.singleJsonObject);
        console.log("Single JSON Object:", jsonObject);

        // const response = await axios.put(`${url}/pets`, jsonObject, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // console.log("Server Response:", response.data);

        // TODO: Provide user feedback about successful submission
      } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Failed to send JSON data:", error);
        // TODO: Provide user feedback about failure
      }
    }

    if (data.jsonFile && data.jsonFile.length > 0) {
      const file = data.jsonFile[0];
      const formData = new FormData();
      formData.append("jsonFile", file);

      try {
        // const response = await axios.put(url, formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // console.log("Server Response:", response.data);
        // TODO: Provide user feedback about successful file submission
      } catch (error) {
        console.error("Failed to send JSON file:", error);
        // TODO: Provide user feedback about failure
      }
    }

    reset();
  };

  const jsonFileValue = watch("jsonFile");

  return (
    <div className="p-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <div className="flex flex-col space-y-2">
              <FormLabel>Single JSON Object</FormLabel>
              <FormControl>
                <textarea
                  {...register("singleJsonObject")}
                  className="border p-2"
                  placeholder='Enter a single JSON object here. Example: {"name": "Max", "type": "Dog"}'
                />
              </FormControl>
            </div>

            <FormDescription>
              Paste a single JSON object related to a pet.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>JSON File</FormLabel>
            <FormControl>
              <Input type="file" {...register("jsonFile")} accept=".json" />
            </FormControl>
            <FormDescription>
              Upload a file containing multiple JSON objects related to pets.
            </FormDescription>
            <FormMessage />
          </FormItem>

          {jsonFileValue && jsonFileValue.length > 0 && (
            <div>
              <strong>Uploaded File:</strong> {jsonFileValue[0].name}
            </div>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default DataForm;
