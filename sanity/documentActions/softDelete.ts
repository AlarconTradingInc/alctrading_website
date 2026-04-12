import { TrashIcon, UndoIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import type { DocumentActionProps, DocumentActionDescription } from 'sanity';

const API_VERSION = '2024-01-01';

/**
 * SOFT DELETE ACTION
 * Directly patches both the published document AND its draft (if it exists)
 * to set isDeleted: true. Bypasses the draft→publish cycle to avoid race conditions.
 * Only visible when the document is NOT already soft-deleted.
 */
export function SoftDeleteAction(props: DocumentActionProps): DocumentActionDescription | null {
    const client = useClient({ apiVersion: API_VERSION });

    const doc = props.published ?? props.draft;
    const isDeleted = (doc as { isDeleted?: boolean } | null)?.isDeleted === true;

    if (isDeleted) return null;

    return {
        label: 'Soft Delete',
        icon: TrashIcon,
        tone: 'critical',
        onHandle: async () => {
            // Patch the published version directly
            await client
                .patch(props.id)
                .set({ isDeleted: true })
                .commit({ autoGenerateArrayKeys: true });

            // Delete the draft so Studio shows a clean published-only state
            // (patching the draft was leaving a "Draft" badge and confusing the action visibility)
            await client
                .delete(`drafts.${props.id}`)
                .catch(() => { /* no draft existed — safe to ignore */ });

            props.onComplete();
        },
    };
}

/**
 * RESTORE ACTION
 * Directly patches both the published document AND its draft to set isDeleted: false.
 * Only visible when the document IS soft-deleted.
 */
export function RestoreAction(props: DocumentActionProps): DocumentActionDescription | null {
    const client = useClient({ apiVersion: API_VERSION });

    const doc = props.published ?? props.draft;
    const isDeleted = (doc as { isDeleted?: boolean } | null)?.isDeleted === true;

    if (!isDeleted) return null;

    return {
        label: 'Restore',
        icon: UndoIcon,
        tone: 'positive',
        onHandle: async () => {
            // Restore the published version directly
            await client
                .patch(props.id)
                .set({ isDeleted: false })
                .commit({ autoGenerateArrayKeys: true });

            // Delete the draft for the same reason — keeps Studio state clean
            await client
                .delete(`drafts.${props.id}`)
                .catch(() => { /* no draft existed — safe to ignore */ });

            props.onComplete();
        },
    };
}
