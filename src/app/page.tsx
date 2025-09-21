"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function cleanUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Comprehensive tracking parameters to remove
    const trackingParams = [
      // UTM parameters
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'utm_id', 'utm_campaign_id', 'utm_source_platform',

      // Click tracking
      'fbclid', 'gclid', 'msclkid', 'dclid', 'gbraid', 'wbraid',

      // Referrer tracking
      'ref', 'referrer', 'ref_', 'ref_src', 'ref_url',

      // Campaign tracking
      'campaign_id', 'campaign', 'cmp', 'cmpid', 'campaign_name',

      // Email marketing
      'mc_cid', 'mc_eid', 'ml_subscriber', 'ml_subscriber_hash',

      // Google Analytics
      '_ga', '_gl', '_gac', 'ga_source', 'ga_medium', 'ga_campaign',

      // Social media
      'icid', 'igshid', 'si', 'socialshare', 'share', 'shared',

      // Amazon specific
      '_encoding', 'content-id', 'dib', 'dib_tag', 'keywords',
      'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'qid', 'sr', 'th',
      'pf_rd_p', 'pf_rd_r', 'pf_rd_s', 'pf_rd_t', 'pf_rd_i',
      'tag', 'linkCode', 'camp', 'creative', 'creativeASIN',
      'ascsubtag', 'asc_campaign', 'asc_refurl', 'asc_source',

      // YouTube
      'feature', 'kw', 'si', 'pp', 'app', 'via',

      // Twitter/X
      'ref_src', 'ref_url', 's', 't', 'cn', 'refsrc',

      // LinkedIn
      'trk', 'trkCampaign', 'trkInfo', 'originalSubdomain',

      // Facebook
      'fb_action_ids', 'fb_action_types', 'fb_ref', 'fb_source',

      // TikTok
      'tt_content', 'tt_medium', 'tt_source',

      // Pinterest
      'epik',

      // Reddit
      'share_id', 'context',

      // General tracking
      'source', 'medium', 'content', 'term', 'name',
      'pk_campaign', 'pk_kwd', 'pk_source', 'pk_medium',
      'hsCtaTracking', 'hsa_acc', 'hsa_ad', 'hsa_cam', 'hsa_grp', 'hsa_kw', 'hsa_mt', 'hsa_net', 'hsa_src', 'hsa_tgt', 'hsa_ver',
      'vero_id', 'vero_conv', '_branch_match_id', '_branch_referrer',
      'affiliate', 'affiliate_id', 'aff', 'aff_id', 'affid',
      'zanpid', 'ranMID', 'ranEAID', 'ranSiteID',
      'yclid', 'gclsrc', 'dclsrc', 'msclkid',
      '_kx', 'kxconfid', 'kxuid',
      'spm', 'scm', 'spm_id_from',
      'cvosrc', 'cvo_campaign', 'cvo_crid',
      'wickedid', 'wck', 'wickedsource',
      'at_medium', 'at_campaign', 'at_custom1', 'at_custom2', 'at_custom3', 'at_custom4', 'at_custom5'
    ];

    // Remove tracking parameters
    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });

    // For Amazon URLs, also clean the path to keep only essential parts
    if (urlObj.hostname.includes('amazon.')) {
      const pathParts = urlObj.pathname.split('/');
      const dpIndex = pathParts.findIndex(part => part === 'dp');

      if (dpIndex !== -1 && dpIndex + 1 < pathParts.length) {
        // Keep path up to and including the product ID after 'dp'
        const cleanPath = pathParts.slice(0, dpIndex + 2).join('/');
        urlObj.pathname = cleanPath;
      }
    }

    return urlObj.toString();
  } catch (error) {
    // If URL is invalid, return original string
    return url;
  }
}

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [cleanedUrl, setCleanedUrl] = useState("");
  const [buttonText, setButtonText] = useState("Clean URL");
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleClean = async () => {
    if (inputUrl.trim()) {
      const cleaned = cleanUrl(inputUrl.trim());
      setCleanedUrl(cleaned);

      // Copy to clipboard immediately after cleaning
      try {
        await navigator.clipboard.writeText(cleaned);
        setButtonText("Copied to clipboard!");
        setShowCopiedMessage(true);

        // Reset button text after 3 seconds
        setTimeout(() => {
          setButtonText("Clean URL");
          setShowCopiedMessage(false);
        }, 3000);
      } catch (err) {
        console.error("Failed to copy:", err);
        // If copy fails, just show the cleaned URL without copy feedback
      }
    }
  };

  const handleClear = () => {
    setInputUrl("");
    setCleanedUrl("");
    setButtonText("Clean URL");
    setShowCopiedMessage(false);
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
            className="h-[120px] max-h-[120px] resize-none text-lg overflow-y-auto"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleClean}
              className="w-full sm:flex-1 h-12 text-lg"
              disabled={!inputUrl.trim()}
            >
              {buttonText}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="w-full sm:flex-1 h-12 text-lg"
            >
              Clear
            </Button>
          </div>

          {showCopiedMessage && (
            <div className="text-center text-sm text-green-600 font-medium">
              ✓ URL copied to clipboard!
            </div>
          )}
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
                className="absolute bottom-3 right-3 h-10 px-6 text-base sm:w-auto w-full sm:max-w-none max-w-[calc(100%-1.5rem)]"
              >
                Copy
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By <span className="font-medium">Mchael Poncardas</span> | Source code{" "}
            <span className="font-medium">GitHub</span>
          </p>
        </div>
      </div>
    </div>
  );
}
