// ESM script

async function main() {
    try {
        // 1. Get Sites
        console.log('Fetching sites...');
        const sitesRes = await fetch('http://localhost:3000/api/init');
        if (!sitesRes.ok) throw new Error(`Failed to fetch sites: ${sitesRes.status} `);
        const data = await sitesRes.json();
        const sites = data.sites;
        console.log(`Found ${sites.length} sites.`);

        if (sites.length === 0) return;

        // Filter for auto sites with valid URL
        const targetSite = sites.find(s => (s.iconType === 'auto' || !s.iconType) && s.url && s.url.startsWith('http'));
        if (!targetSite) {
            console.log('No valid auto sites found.');
            return;
        }

        console.log(`Testing sync for site: ${targetSite.name} (${targetSite.id}) - URL: ${targetSite.url}`);

        // 2. Trigger Sync
        const syncRes = await fetch('http://localhost:3000/api/admin/cache-icons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ siteIds: [targetSite.id] })
        });

        if (!syncRes.ok) throw new Error(`Sync failed: ${syncRes.status} `);
        const result = await syncRes.json();
        console.log('Sync Result:', JSON.stringify(result, null, 2));

    } catch (e) {
        console.error(e);
    }
}

main();
