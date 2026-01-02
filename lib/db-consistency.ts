/**
 * Database Consistency Check & Repair Utilities
 * 
 * This module provides functions to detect and fix data inconsistencies:
 * - Orphaned sites: Sites with parentId pointing to non-existent folders
 * - Orphaned category references: Sites referencing non-existent categories
 */

import { prisma } from '@/lib/prisma';

export interface ConsistencyReport {
    orphanedSites: number;
    orphanedCategories: number;
    repaired: boolean;
    details: string[];
}

/**
 * Check and optionally repair database consistency issues
 * @param autoRepair - If true, automatically fix issues found
 * @returns ConsistencyReport with details of issues found/fixed
 */
export async function checkDatabaseConsistency(autoRepair: boolean = false): Promise<ConsistencyReport> {
    const report: ConsistencyReport = {
        orphanedSites: 0,
        orphanedCategories: 0,
        repaired: autoRepair,
        details: []
    };

    try {
        // 1. Get all sites and folders
        const sites = await prisma.site.findMany();
        const folders = sites.filter(s => s.type === 'folder');
        const folderIds = new Set(folders.map(f => f.id));

        // 2. Get all category names
        const categories = await prisma.category.findMany();
        const categoryNames = new Set(categories.map(c => c.name));

        // 3. Find orphaned sites (parentId points to non-existent folder)
        const orphanedSites = sites.filter(s => s.parentId && !folderIds.has(s.parentId));

        if (orphanedSites.length > 0) {
            report.orphanedSites = orphanedSites.length;
            const orphanParentIds = [...new Set(orphanedSites.map(s => s.parentId))];
            report.details.push(`Found ${orphanedSites.length} orphaned sites referencing ${orphanParentIds.length} deleted folder(s)`);

            if (autoRepair) {
                // Fix: Set parentId to null
                await prisma.site.updateMany({
                    where: { id: { in: orphanedSites.map(s => s.id) } },
                    data: { parentId: null }
                });
                report.details.push(`Repaired: Moved ${orphanedSites.length} orphaned sites to root level`);
            }
        }

        // 4. Find sites with non-existent category references
        const orphanedCatSites = sites.filter(s => s.category && !categoryNames.has(s.category));

        if (orphanedCatSites.length > 0) {
            report.orphanedCategories = orphanedCatSites.length;
            const orphanCats = [...new Set(orphanedCatSites.map(s => s.category))];
            report.details.push(`Found ${orphanedCatSites.length} sites referencing ${orphanCats.length} non-existent category(s): ${orphanCats.join(', ')}`);

            if (autoRepair && categories.length > 0) {
                // Fix: Move to first available category
                const defaultCategory = categories[0].name;
                await prisma.site.updateMany({
                    where: { id: { in: orphanedCatSites.map(s => s.id) } },
                    data: { category: defaultCategory }
                });
                report.details.push(`Repaired: Moved ${orphanedCatSites.length} sites to category "${defaultCategory}"`);
            }
        }

        if (report.orphanedSites === 0 && report.orphanedCategories === 0) {
            report.details.push('Database consistency check passed - no issues found');
        }

        console.log('[DB Consistency]', report.details.join('; '));
        return report;

    } catch (error) {
        console.error('[DB Consistency] Error during check:', error);
        report.details.push(`Error during consistency check: ${error}`);
        return report;
    }
}

/**
 * Run consistency check with auto-repair on application startup
 * This is a silent operation that logs results to console
 */
export async function runStartupConsistencyCheck(): Promise<void> {
    console.log('[DB Consistency] Running startup consistency check...');
    const report = await checkDatabaseConsistency(true);

    if (report.orphanedSites > 0 || report.orphanedCategories > 0) {
        console.log('[DB Consistency] Issues found and repaired:', report);
    } else {
        console.log('[DB Consistency] No issues found');
    }
}
