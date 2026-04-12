import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { SoftDeleteAction, RestoreAction } from './documentActions/softDelete';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!;

/**
 * Sanity Studio configuration for Alarcon Trading.
 *
 * Studio is served at /studio via Next.js App Router.
 * Ensure the following environment variables are set before launching:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_READ_TOKEN  (server-side only)
 */
export default defineConfig({
    name:    'alctrading-studio',
    title:   'Alarcon Trading — CMS',
    basePath: '/studio',

    projectId,
    dataset,

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        S.listItem()
                            .title('Categories')
                            .id('categories')
                            .child(
                                S.documentList()
                                    .title('All Categories')
                                    .filter('_type == "category" && !isDeleted'),
                            ),
                        S.listItem()
                            .title('Products — All')
                            .id('products-all')
                            .child(
                                S.documentList()
                                    .title('All Active Products')
                                    .filter('_type == "product" && !isDeleted'),
                            ),
                        S.divider(),
                        S.listItem()
                            .title('🗑 Soft-Deleted Items')
                            .id('deleted')
                            .child(
                                S.list()
                                    .title('Soft-Deleted')
                                    .items([
                                        S.listItem()
                                            .title('Deleted Categories')
                                            .child(
                                                S.documentList()
                                                    .title('Deleted Categories')
                                                    .filter('_type == "category" && isDeleted == true'),
                                            ),
                                        S.listItem()
                                            .title('Deleted Products')
                                            .child(
                                                S.documentList()
                                                    .title('Deleted Products')
                                                    .filter('_type == "product" && isDeleted == true'),
                                            ),
                                    ]),
                            ),
                    ]),
        }),

        visionTool(), // GROQ query playground — dev use only
    ],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (prev) => [
            // Keep all default actions except the destructive built-in delete
            ...prev.filter((action) => action.action !== 'delete'),
            // Add soft delete (hides when already deleted) and restore (shows when deleted)
            SoftDeleteAction,
            RestoreAction,
        ],
    },
});
