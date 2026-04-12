import { getAllCategories } from '@/lib/sanity';
import Navbar from './Navbar';

export default async function NavbarWrapper() {
    let categories: { name: string; slug: string }[] = [];

    try {
        const all = await getAllCategories();
        categories = all.map((c) => ({ name: c.title, slug: `/products/${c.slug}` }));
    } catch {
        // Sanity unavailable — navbar renders with no product links
    }

    return <Navbar categories={categories} />;
}
