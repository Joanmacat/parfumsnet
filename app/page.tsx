"use client";
import { useState } from "react";
import { Form, Input, Textarea, Button } from "@heroui/react";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  const [submitted, setSubmitted] = useState<any | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [formattedQuery, setFormattedQuery] = useState<string | null>(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const prompt = formData.get("prompt")?.toString() || "";

    // Utilitzem directament el valor del prompt en lloc de query
    const formattedQueryText = `Search for items to buy perfumes and fragrances on Internet, from the following QUERY = '${prompt}'. They must be the same or also others that are similar in the components that form it. Detect the language of the QUERY and the description must be in the language you have detected. Search for correct links that are not 404 NOT FOUND. Return the results in JSON format, specifically the name of the perfume, the link, the short description and the image. Don't return me any explanation, I just want the JSON.`;
    
    setFormattedQuery(formattedQueryText);
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          "HTTP-Referer": "parfumsnet.com",
          "X-Title": "Parfumsnet",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-lite-preview-02-05:free",
          messages: [
            { role: "system", content: formattedQueryText }, // Utilitzem el text directament
            { role: "user", content: prompt }
          ]
        })
      });
      
      const completion = await response.json();
      setSubmitted(completion.choices[0].message.content);
      console.log("Formatted query:", formattedQueryText);
      console.log("Response:", completion.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
    }
};

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Search&nbsp;</span>
        <span className={title({ color: "violet" })}>your&nbsp;</span>
        <br />
        <span className={title()}>
          perfume, in your language, with zero effort.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          And buy it. Simple as that.
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Form className="w-full max-w-md flex flex-col items-center" validationBehavior="native" onSubmit={handleSubmit}>
          <Textarea
            className="w-full"
            label=""
            maxRows={4}
            labelPlacement="outside"
            name="prompt"
            placeholder="What kind of perfume are you looking for?"
            type="text"
            validate={(value) => {
              if (value.length < 3) {
                return "Text must be at least 3 characters long";
              }
              return null;
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-4">
            <Button color="primary" type="submit">
              Search
            </Button>
          </div>
          {submitted && (
            <div className="mt-4 text-center">
              <p>{submitted}</p>
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}