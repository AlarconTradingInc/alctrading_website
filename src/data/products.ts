export interface Product {
    id: string;
    name: string;
    description: string;
}

export interface SubCategory {
    name: string;
    products: Product[];
}

export interface MainCategory {
    name: string;
    description: string;
    slug: string;
    subCategories: SubCategory[];
}

export const productData: MainCategory[] = [
    {
        name: "Metals",
        slug: "metals",
        description: "Military and Aerospace grade metal supplies.",
        subCategories: [
            {
                name: "High Temp Alloys",
                products: [
                    'AMS 5536', 'AMS 5537', 'AMS 5545', 'AMS 5916', 'AMS 5608', 'AMS 5878', 'AMS 5872', 'AMS 5874', 'AMS 5951', 'AMS 5888', 'AMS 5889', 'AMS 5599', 'AMS 5969', 'AMS 5879', 'AMS 5596', 'AMS 5597', 'AMS 5542', 'AMS 5598', 'AMS 5544', 'AMS 5532'
                ].map(p => ({ id: p, name: p, description: "" }))
            },
            {
                name: "Aluminums",
                products: [
                    '2026', '7055-T74511/T76511', '7055-T77511 EXTRUSION', 'C460 (AA2099)', '2024', '2090-T83', '2124', '2324-T39', '6061-T6517050', '7055', '7075', '7150-T7751', '7150-T77511', '7475'
                ].map(p => ({ id: p, name: p, description: "" }))
            }
        ]
    },
    {
        name: "Chemicals",
        slug: "chemicals",
        description: "Military specification chemicals and compounds.",
        subCategories: [
            {
                name: "Specifications & Products",
                products: [
                    'MIL-PRF-3150', 'MIL-PRF-5606', 'MIL-PRF-6081', 'MIL-PRF-6085', 'MIL-PRF-6086', 'MIL-PRF-7808',
                    'MIL-PRF-7870', 'MIL-PRF-8188', 'MIL-PRF-23699', 'MIL-PRF-21260', 'MIL-PRF-32033', 'MIL-PRF-46000',
                    'MIL-PRF-46167', 'MIL-PRF-46170', 'MIL-PRF-63480', 'MIL-PRF-83282', 'MIL-PRF-87252', 'MIL-PRF-9000H',
                    'MIL-P-11414', 'MIL-L-11195', 'MIL-L-10287', 'MIL-L-8937', 'MIL-C-8514', 'MIL-P-7962',
                    'DAPCO 2200', 'DAPCO 2100', 'DAPCO 18-4F', 'DAPCO 1-100', 'ETC-PLANE NAKED PAINT REMOVER'
                ].map(p => ({ id: p, name: p, description: "" }))
            }
        ]
    },
    {
        name: "Parachutes",
        slug: "parachutes",
        description: "Military-grade parachute spare parts.",
        subCategories: [
            {
                name: "Webbing Textiles",
                products: [
                    'MIL-W-4088K', 'MIL-T-5038', 'MIL-W-5625K', 'MIL-W-17337F', 'MIL-T-87130'
                ].map(p => ({ id: p, name: p, description: "" }))
            },
            {
                name: "Parachute Fabrics",
                products: [
                    'MIL-C-44378', 'MIL-C-3395', 'MIL-43805', 'MIL-C-7350', 'MIL-C-7020', 'MIL-C-8020', 'MIL-C-498', 'MIL-C-43375', 'MIL-C-43734', 'MIL-C-7219', 'MIL-C-508', 'MIL-C-10296', 'MIL-C-3953'
                ].map(p => ({ id: p, name: p, description: "" }))
            }
        ]
    },
    {
        name: "DualMirror II Fabrics",
        slug: "dual-mirror-ii",
        description: "High performance fabrics for extreme conditions.",
        subCategories: [
            {
                name: "Molten Metal PPE",
                products: [
                    { name: "DualMirror II 1086", specs: "Preox/Korspun Aramid 19 osy / 650 gsm" },
                    { name: "DualMirror II 1081", specs: "Kospun Aramid 19 osy / 650 gsm" },
                    { name: "DualMirror II 1017", specs: "FR Rayon 17 osy / 570 gsm" },
                    { name: "DualMirror II 1006", specs: "FR Rayon 15 osy / 500 gsm" },
                    { name: "DualMirror II 1100-4", specs: "Preox 15 osy / 500 gsm" }
                ].map(p => ({ id: p.name, name: p.name, description: p.specs }))
            },
            {
                name: "Proximity Firefighting",
                products: [
                    { name: "DualMirror II P-202", specs: "PBI/Aramid 7 osy / 650 gsm" },
                    { name: "DualMirror II K-252", specs: "Aramid 10 osy / 650 gsm" },
                    { name: "DualMirror II 1018", specs: "Beta Glass 15 osy / 500 gsm" },
                    { name: "DualMirror II 1100-4", specs: "Preox 15 osy / 500 gsm" }
                ].map(p => ({ id: p.name, name: p.name, description: p.specs }))
            }
        ]
    },
    {
        name: "Sale Items",
        slug: "sale-items",
        description: "Discounted surplus and legacy inventory.",
        subCategories: [
            {
                name: "Current Inventory",
                products: [
                    { part: "BM80A-300L-050F60", desc: "POWER SUPPLY", mfg: "ASTEC", qty: 10 },
                    { part: "BM80A-300L-022F85", desc: "POWER SUPPLY", mfg: "ASTEC", qty: 10 },
                    { part: "73-317-0124", desc: "DC-DC CONVERTER", mfg: "ASTEC", qty: 4 },
                    { part: "10080389-101", desc: "FLEX BOARD", mfg: "AERO", qty: 40, nsn: "5998-01-604-6189" },
                    { part: "SF0987-6000-08", desc: "SMA MALE TO FEMALE ATT", mfg: "SV MICROWAVE", qty: 20 },
                    { part: "SF1122-6036", desc: "CONNECTOR ADAPT", mfg: "SV MICROWAVE", qty: 19 },
                    { part: "LS-9522M", desc: "DPDT LATCHING RELAY", mfg: "TE CONNECTIVITY", qty: 3 },
                    { part: "1874870-1", desc: "BEARING BALL", mfg: "HONEYWELL", qty: 117 },
                ].map(p => ({ id: p.part, name: p.part, description: `${p.desc} - ${p.mfg} (Qty: ${p.qty})` }))
            }
        ]
    }
];
