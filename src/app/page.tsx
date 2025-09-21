"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function cleanUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Common tracking parameters to remove
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'fbclid', 'gclid', 'msclkid', 'ref', 'referrer', 'campaign_id',
      'mc_cid', 'mc_eid', '_ga', '_gl', 'icid', 'igshid', 'si'
    ];

    // Remove tracking parameters
    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });

    return urlObj.toString();
  } catch (error) {
    // If URL is invalid, return original string
    return url;
  }
}

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [cleanedUrl, setCleanedUrl] = useState("");

  const handleClean = () => {
    if (inputUrl.trim()) {
      const cleaned = cleanUrl(inputUrl.trim());
      setCleanedUrl(cleaned);
    }
  };

  const handleClear = () => {
    setInputUrl("");
    setCleanedUrl("");
  };

  const handleCopy = async () => {
    if (cleanedUrl) {
      try {
        await navigator.clipboard.writeText(cleanedUrl);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Theme toggle placeholder */}
        {/* <div className="flex justify-end">
          <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-foreground"></div>
          </div>
        </div> */}

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Clean URL</h1>
          <p className="text-muted-foreground">
            Remove tracking parameters and unnecessary parts from your URLs
          </p>
        </div>


        {/* Input section */}
        <div className="space-y-4">
          <Textarea
            placeholder="Paste URL here..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="min-h-[120px] resize-none text-lg"
          />

          <div className="flex gap-4">
            <Button
              onClick={handleClean}
              className="flex-1 h-12 text-lg"
              disabled={!inputUrl.trim()}
            >
              Clean URL
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="flex-1 h-12 text-lg"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Output section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Clean URL</h3>
          <div className="relative">
            <Textarea
              value={cleanedUrl}
              readOnly
              className="min-h-[120px] resize-none bg-muted text-lg"
              placeholder="Your cleaned URL will appear here..."
            />
            {cleanedUrl && (
              <Button
                onClick={handleCopy}
                variant="secondary"
                className="absolute bottom-3 right-3 h-10 px-6 text-base"
              >
                Copy
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By <span className="font-medium">Michael Poncardas</span> | Source code{" "}
            <span className="font-medium">GitHub</span>
          </p>
        </div>
      </div>
    </div>
  );
}
