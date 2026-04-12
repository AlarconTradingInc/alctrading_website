import { category } from './category';
import { product } from './product';

/**
 * Schema registry — all document types must be registered here.
 * Order determines the sidebar display order in Sanity Studio.
 */
export const schemaTypes = [category, product];
