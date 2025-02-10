"use client";
import { useState } from "react";
import { Form, Textarea, Button } from "@heroui/react";

import { title, subtitle } from "@/components/primitives";
import PerfumeModal from "@/components/modals/perfumeModal";
import Skeleton from "@/components/skeleton";

interface PerfumeData {
  name: string;
  description: string;
  link: string;
  image: string;
}

export default function Home() {
  const [submitted, setSubmitted] = useState<PerfumeData[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt")?.toString().trim() || "";

    if (prompt.length < 3) {
      console.error("Query too short");

      return;
    }

    const formattedQuery = `Return a JSON array with perfume details (name, link, description, image) for the given QUERY: '${query}'. Detect the language of QUERY and ensure descriptions match it. Links must be valid. No explanations, only JSON.`;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
            "HTTP-Referer": "parfumsnet.com",
            "X-Title": "Parfumsnet",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-lite-preview-02-05:free",
            messages: [
              { role: "system", content: formattedQuery },
              { role: "user", content: prompt },
            ],
          }),
        },
      );

      const completion = await response.json();
      const content = completion.choices[0]?.message?.content?.trim();

      if (!content) throw new Error("Invalid response format");

      // Elimina cometes innecessàries i caràcters estranys
      const cleanedContent = content.replace(/^```json|```$/g, "").trim();

      let parsedContent: PerfumeData[];

      try {
        parsedContent = JSON.parse(cleanedContent);
        if (!Array.isArray(parsedContent))
          throw new Error("Response is not a JSON array");
      } catch (error) {
        console.error("Error parsing JSON:", error);

        return;
      }

      setSubmitted(parsedContent);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center">
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
        <Form
          className="w-full flex flex-col"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Textarea
            className="w-full"
            maxRows={4}
            name="prompt"
            placeholder="What kind of perfume are you looking for?"
            validate={(value) =>
              value.length < 3
                ? "Text must be at least 3 characters long"
                : null
            }
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-4">
            <Button color="primary" isLoading={loading} type="submit">
              Search
            </Button>
          </div>
          {loading && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index}/>
              ))}
            </div>
          )}
          {!loading && submitted && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {submitted.map((perfume, index) => (
                <div key={index} className="mb-4">
                  <a
                    className="text-blue-600 mt-2 block"
                    href={perfume.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <PerfumeModal perfumeData={perfume} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}
