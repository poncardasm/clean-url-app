export function cleanUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Comprehensive tracking parameters to remove
    const trackingParams = [
      // UTM parameters
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'utm_id', 'utm_campaign_id', 'utm_source_platform', 'utm_name',
      'utm_creative_format', 'utm_marketing_tactic',

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
      'icid', 'igshid', 'igsh', 'si', 'socialshare', 'share', 'shared',

      // Amazon specific
      '_encoding', 'content-id', 'dib', 'dib_tag', 'keywords', 'crid', 'sprefix',
      'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'qid', 'sr', 'th',
      'pf_rd_p', 'pf_rd_r', 'pf_rd_s', 'pf_rd_t', 'pf_rd_i',
      'tag', 'linkCode', 'camp', 'creative', 'creativeASIN',
      'ascsubtag', 'asc_campaign', 'asc_refurl', 'asc_source',

      // YouTube
      'feature', 'kw', 'si', 'pp', 'app', 'via',

      // Twitter/X
      'ref_src', 'ref_url', 's', 't', 'cn', 'refsrc',

      // LinkedIn
      'trk', 'trkCampaign', 'trkInfo', 'originalSubdomain', 'miniProfileUrn', 'lipi',

      // Facebook
      'fb_action_ids', 'fb_action_types', 'fb_ref', 'fb_source',

      // TikTok
      'tt_content', 'tt_medium', 'tt_source',

      // Pinterest
      'epik',

      // Reddit
      'share_id', 'context',

      // Search and e-commerce tracking
      'queryId', 'index', 'objectIDs', 'query', 'queryID', 'searchId',
      'search_id', 'search_query', 'search_term', 'search_source',
      'algolia', 'algoliaSource', 'algoliaQueryID',
      'elasticSearch', 'searchQuery', 'searchTerm',

      // General tracking
      'source', 'medium', 'content', 'term',
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
  } catch {
    // If URL is invalid, return original string
    return url;
  }
}
