/**
 * Convert static upload path to API path for Docker compatibility
 * In Next.js standalone mode with Docker, dynamically generated files in public/uploads
 * are not served automatically. This function converts paths to use the API route.
 * 
 * @param url - Original URL like /uploads/wallpapers/bing/file.jpg
 * @returns API URL like /api/uploads/wallpapers/bing/file.jpg
 */
export function getUploadUrl(url: string | undefined | null): string {
    if (!url) return '';

    // If already using API route, return as-is
    if (url.startsWith('/api/uploads/')) {
        return url;
    }

    // Convert /uploads/... to /api/uploads/...
    if (url.startsWith('/uploads/')) {
        return `/api${url}`;
    }

    // For external URLs or other paths, return as-is
    return url;
}

/**
 * Check if a URL is an upload path that needs conversion
 */
export function isUploadPath(url: string | undefined | null): boolean {
    if (!url) return false;
    return url.startsWith('/uploads/') || url.startsWith('/api/uploads/');
}
