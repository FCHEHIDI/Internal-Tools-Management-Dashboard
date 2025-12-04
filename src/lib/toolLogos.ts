/**
 * Tool Logo Utility
 * Maps tool names to their respective brand logos using external CDN sources
 */

// Map of tool names to logo URLs (using shields.io for brand logos)
const LOGO_MAP: Record<string, string> = {
  // Popular SaaS Tools
  'slack': 'https://cdn.simpleicons.org/slack/4A154B',
  'jira': 'https://cdn.simpleicons.org/jira/0052CC',
  'confluence': 'https://cdn.simpleicons.org/confluence/172B4D',
  'github': 'https://cdn.simpleicons.org/github/181717',
  'gitlab': 'https://cdn.simpleicons.org/gitlab/FC6D26',
  'figma': 'https://cdn.simpleicons.org/figma/F24E1E',
  'notion': 'https://cdn.simpleicons.org/notion/000000',
  'asana': 'https://cdn.simpleicons.org/asana/F06A6A',
  'trello': 'https://cdn.simpleicons.org/trello/0052CC',
  'zoom': 'https://cdn.simpleicons.org/zoom/2D8CFF',
  'microsoft teams': 'https://cdn.simpleicons.org/microsoftteams/6264A7',
  'teams': 'https://cdn.simpleicons.org/microsoftteams/6264A7',
  'google workspace': 'https://cdn.simpleicons.org/google/4285F4',
  'google drive': 'https://cdn.simpleicons.org/googledrive/4285F4',
  'dropbox': 'https://cdn.simpleicons.org/dropbox/0061FF',
  'salesforce': 'https://cdn.simpleicons.org/salesforce/00A1E0',
  'hubspot': 'https://cdn.simpleicons.org/hubspot/FF7A59',
  'mailchimp': 'https://cdn.simpleicons.org/mailchimp/FFE01B',
  'zendesk': 'https://cdn.simpleicons.org/zendesk/03363D',
  'intercom': 'https://cdn.simpleicons.org/intercom/1F8DED',
  'stripe': 'https://cdn.simpleicons.org/stripe/008CDD',
  'paypal': 'https://cdn.simpleicons.org/paypal/00457C',
  'shopify': 'https://cdn.simpleicons.org/shopify/96BF48',
  'adobe': 'https://cdn.simpleicons.org/adobe/FF0000',
  'adobe creative cloud': 'https://yt3.ggpht.com/-QYVbC9TuWuo/AAAAAAAAAAI/AAAAAAAAAAA/qRWo9AJfx60/s900-c-k-no/photo.jpg',
  'monday': 'https://cdn.simpleicons.org/monday/FF3D57',
  'clickup': 'https://cdn.simpleicons.org/clickup/7B68EE',
  'miro': 'https://cdn.simpleicons.org/miro/FFD02F',
  'canva': 'https://img.freepik.com/fotos-premium/icono-ilustracion-logotipo-canva_895118-4434.jpg',
  'linear': 'https://cdn.simpleicons.org/linear/5E6AD2',
  'vercel': 'https://cdn.simpleicons.org/vercel/000000',
  'netlify': 'https://cdn.simpleicons.org/netlify/00C7B7',
  'aws': 'https://cdn.simpleicons.org/amazonaws/232F3E',
  'azure': 'https://cdn.simpleicons.org/microsoftazure/0078D4',
  'docker': 'https://cdn.simpleicons.org/docker/2496ED',
  'kubernetes': 'https://cdn.simpleicons.org/kubernetes/326CE5',
  'datadog': 'https://cdn.simpleicons.org/datadog/632CA6',
  'office 365': 'https://iconape.com/wp-content/files/vl/121686/png/Microsoft_Office_logo__2019-present_.png',
  'microsoft 365': 'https://iconape.com/wp-content/files/vl/121686/png/Microsoft_Office_logo__2019-present_.png',
  'office': 'https://iconape.com/wp-content/files/vl/121686/png/Microsoft_Office_logo__2019-present_.png',
  
  // Company logos - using custom brand images
  'berge group': 'https://images-platform.99static.com/es4K7IxAuYFGsemIi_ZUsyJY3YU=/0x0:2000x2000/500x500/top/smart/99designs-contests-attachments/138/138367/attachment_138367602',
  'mueller and sons': 'https://www.muellersecurity.com/wp-content/uploads/2014/10/shield-icon.png',
  'mueller and sons security': 'https://www.muellersecurity.com/wp-content/uploads/2014/10/shield-icon.png',
  'security hill llc': 'https://thillsecurity.com/images/badge2.png',
  'stiedemann inc': 'https://cdn.simpleicons.org/microsoftoffice/D83B01', // Office-style
};

/**
 * Get logo URL for a tool by name
 * @param toolName - Name of the tool
 * @returns Logo URL or null if not found
 */
export function getToolLogo(toolName: string | undefined | null): string | null {
  if (!toolName) return null;
  
  const normalized = toolName.toLowerCase().trim();
  return LOGO_MAP[normalized] || null;
}

/**
 * Get initials from tool name as fallback
 * @param toolName - Name of the tool
 * @returns First character of the name
 */
export function getToolInitial(toolName: string | undefined | null): string {
  return toolName?.charAt(0)?.toUpperCase() || '?';
}
