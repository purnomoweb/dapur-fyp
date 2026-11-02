export interface RecipeBase {
  id: string;
  slug: string;
  title: string;
  category: 'makanan-utama' | 'minuman-kekinian' | 'cemilan-jajanan' | 'kue-dessert';
  categoryLabel: string;
  summary: string;
  sourceViral: string;
  imageKey: 'chocolate-moist-cake' | 'seblak' | 'matcha' | 'cireng' | 'cromboloni';
  tableOfContents: { id: string; label: string }[];
  ingredientGroups: {
    groupName: string;
    items: string[];
  }[];
  instructions: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  criticalNotes: {
    title: string;
    description: string;
  }[];
  productLinks: {
    productId: string;
    productName: string;
    externalUrl: string;
  }[];
  tags: string[];
}

export const CATEGORIES = [
  { id: 'semua', label: 'Semua Kategori' },
  { id: 'makanan-utama', label: 'Makanan Utama' },
  { id: 'minuman-kekinian', label: 'Minuman Kekinian' },
  { id: 'cemilan-jajanan', label: 'Cemilan & Jajanan' },
  { id: 'kue-dessert', label: 'Kue & Dessert' },
] as const;

export const RAW_RECIPES: RecipeBase[] = [
  {
    id: 'chocolate-moist-cake',
    slug: 'resep-chocolate-moist-cake-tanpa-telur',
    title: 'Resep Chocolate Moist Cake (Kek Ketagih) Tanpa Telur',
    category: 'kue-dessert',
    categoryLabel: 'Kue & Dessert',
    summary: 'Ini dia! Chocolate Moist Cake atau yang disebut dengan Kek Ketagih.',
    sourceViral: 'Viral Medsos Garut',
    imageKey: 'chocolate-moist-cake',
    tableOfContents: [
      { id: 'bahan', label: 'Bahan-Bahan' },
      { id: 'cara-pembuatan', label: 'Cara Pembuatan' },
      { id: 'catatan', label: 'Catatan (Wajib Dibaca)' },
      { id: 'kebutuhan-dapur', label: 'Kebutuhan Dapur' },
    ],
    ingredientGroups: [
      {
        groupName: 'Bahan Cake',
        items: [
          '240 ml susu cair',
          '140 gram gula pasir',
          '60 ml minyak sayur',
          '1/4 sdt garam',
          '150 gram tepung terigu serbaguna',
          '50 gram cokelat bubuk',
          '1 sdt baking powder',
          '1 sdt bubuk kopi',
        ],
      },
      {
        groupName: 'Bahan Cokelat Ganache',
        items: [
          '250 gram susu cair',
          '1 sdt agar-agar bubuk plain',
          '250 gram dark chocolate compound',
          '1 sdt mentega atau margarin',
        ],
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Membuat Minyak Bawang',
        description: 'Campurkan susu cair dan gula, lalu aduk rata.',
      },
      {
        stepNumber: 2,
        title: 'Meracik Bumbu di Mangkok',
        description: 'Masukkan minyak sayur, lalu aduk rata kembali.',
      },
      {
        stepNumber: 3,
        title: 'Merebus Mie',
        description: 'Masukkan tepung terigu, coklat bubuk, baking powder, garam, dan bubuk kopi, lalu aduk rata.',
      },
    ],
    criticalNotes: [
      {
        title: 'Gunakan Mie Basah Kenyal',
        description: 'Mie basah memiliki tekstur kenyal lentur yang dapat mengikat racikan saus kental dengan lebih baik dibanding mie instan kering.',
      },
      {
        title: 'Jangan Terlalu Lama Mematangkan Bawang',
        description: 'Matikan kompor saat bawang baru berwarna kuning muda, karena panas sisa minyak masih terus mematangkan bawang.',
      },
      {
        title: 'Keseimbangan Manis Gurih',
        description: 'Rasa khas mie jebew berasal dari perpaduan seimbang antara pedas cabai dan rasa legit kecap manis.',
      },
    ],
    productLinks: [
      {
        productId: 'chili-flakes-kasar',
        productName: 'Chili Flakes Cabai Kasar Grade A',
        externalUrl: 'https://shopee.co.id/search?keyword=chili+flakes+kasar',
      },
      {
        productId: 'wajan-granit-anti-lengket',
        productName: 'Wajan Granit Anti-Lengket',
        externalUrl: 'https://shopee.co.id/search?keyword=wajan+granit+anti+lengket',
      },
    ],
    tags: ['Mie', 'Pedas', 'Garut'],
  },
  {
    id: 'seblak-coet-rafael',
    slug: 'seblak-coet-rafael-original-kencur',
    title: 'Seblak Coet Rafael Original Kencur Segar',
    category: 'makanan-utama',
    categoryLabel: 'Makanan Utama',
    summary: 'Resep viral Rafael Tan. Kerupuk mawar putih rebus disiram sambal kencur mentah dan minyak panas mendidih langsung di atas cobek batu.',
    sourceViral: 'Viral Medsos Rafael',
    imageKey: 'seblak',
    tableOfContents: [
      { id: 'bahan', label: 'Bahan-Bahan' },
      { id: 'cara-pembuatan', label: 'Cara Pembuatan' },
      { id: 'catatan', label: 'Catatan (Wajib Dibaca)' },
      { id: 'kebutuhan-dapur', label: 'Kebutuhan Dapur' },
    ],
    ingredientGroups: [
      {
        groupName: 'Bahan Utama',
        items: [
          '150 gram kerupuk mawar putih mentah',
          'Air bersih untuk merebus',
          '1 sdm minyak goreng agar kerupuk tidak saling menempel',
        ],
      },
      {
        groupName: 'Bahan Bumbu Ulek Cobek',
        items: [
          '4 ruas kencur segar kupas bersih',
          '4 siung bawang putih',
          '15 buah cabai rawit hijau',
          '5 buah cabai rawit merah',
          '1 sdt garam',
          '1/2 sdt gula pasir',
          '1 sdt kaldu jamur atau penyedap rasa',
          '1 batang daun bawang, iris halus',
        ],
      },
      {
        groupName: 'Bahan Minyak Siraman',
        items: [
          '60 ml minyak goreng bersih (dipanaskan hingga benar-benar panas)',
        ],
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Merebus Kerupuk Mawar',
        description: 'Didihkan air dan 1 sdm minyak di panci. Masukkan kerupuk mawar. Rebus selama 7-10 menit sampai kerupuk lunak dan kenyal. Angkat dan tiriskan airnya hingga tuntas.',
      },
      {
        stepNumber: 2,
        title: 'Mengulek Bumbu di Cobek',
        description: 'Di atas cobek batu, ulek kencur, bawang putih, cabai rawit hijau, cabai rawit merah, garam, gula, dan kaldu jamur hingga bertekstur kasar.',
      },
      {
        stepNumber: 3,
        title: 'Menyiram Minyak Mendidih',
        description: 'Panaskan minyak di wajan hingga benar-benar berasap tipis. Siram minyak mendidih langsung ke atas ulekan bumbu di cobek. Masukkan irisan daun bawang lalu aduk rata.',
      },
      {
        stepNumber: 4,
        title: 'Mencampur Kerupuk',
        description: 'Masukkan kerupuk rebus yang masih hangat ke dalam cobek. Aduk hingga seluruh permukaan kerupuk berlumur bumbu kencur pedas.',
      },
    ],
    criticalNotes: [
      {
        title: 'Minyak Harus Benar-Benar Panas',
        description: 'Minyak panas berfungsi mematangkan bumbu kencur dan bawang putih mentah agar aromanya keluar dan tidak berbau langu.',
      },
      {
        title: 'Gunakan Cobek Batu Asli',
        description: 'Cobek batu asli kuat menahan siraman minyak mendidih tanpa risiko retak atau melunturkan serpihan semen.',
      },
      {
        title: 'Tiriskan Kerupuk Sampai Kering',
        description: 'Sisa air pada kerupuk rebus dapat membuat bumbu encer dan menyebabkan letupan minyak saat diaduk.',
      },
    ],
    productLinks: [
      {
        productId: 'cobek-batu-merapi',
        productName: 'Cobek Batu Alami Gunung Merapi',
        externalUrl: 'https://shopee.co.id/search?keyword=cobek+batu+merapi+asli',
      },
    ],
    tags: ['Seblak', 'Kencur', 'Cobek'],
  },
  {
    id: 'matcha-cloud-latte',
    slug: 'matcha-cloud-cold-foam-latte',
    title: 'Matcha Cloud Cold Foam Latte Ala Cafe Viral',
    category: 'minuman-kekinian',
    categoryLabel: 'Minuman Kekinian',
    summary: 'Minuman estetik berlapis khas cafe yang viral di media sosial. Lapisan matcha hijau murni berpadu dengan susu dingin dan cold foam awan lembut di atasnya.',
    sourceViral: 'Viral Medsos Cafe Trend',
    imageKey: 'matcha',
    tableOfContents: [
      { id: 'bahan', label: 'Bahan-Bahan' },
      { id: 'cara-pembuatan', label: 'Cara Pembuatan' },
      { id: 'catatan', label: 'Catatan (Wajib Dibaca)' },
      { id: 'kebutuhan-dapur', label: 'Kebutuhan Dapur' },
    ],
    ingredientGroups: [
      {
        groupName: 'Bahan Larutan Matcha',
        items: [
          '2 sdt bubuk pure matcha ceremonial tanpa gula',
          '50 ml air hangat suhu 75-80°C',
          '1.5 sdm sirup gula atau madu',
        ],
      },
      {
        groupName: 'Bahan Dasar Minuman',
        items: [
          '150 ml susu cair full cream dingin',
          'Es batu secukupnya',
        ],
      },
      {
        groupName: 'Bahan Cloud Foam (Lapisan Atas)',
        items: [
          '50 ml whipping cream cair dingin',
          '25 ml susu cair dingin',
          '1 sdm sirup vanila atau susu kental manis',
          'Sejumput sea salt / garam halus',
        ],
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Melarutkan Bubuk Matcha',
        description: 'Ayak bubuk matcha ke dalam mangkuk kecil. Tuangkan air hangat 75-80°C. Aduk atau kocok menggunakan frother hingga larut sempurna tanpa gumpalan.',
      },
      {
        stepNumber: 2,
        title: 'Membuat Cloud Foam Lembut',
        description: 'Campurkan whipping cream dingin, susu dingin, sirup vanila, dan sejumput garam di wadah terpisah. Kocok menggunakan hand frother selama 20-30 detik hingga teksturnya mengental lembut.',
      },
      {
        stepNumber: 3,
        title: 'Menyusun Lapisan di Gelas',
        description: 'Isi gelas dengan es batu. Tuang susu full cream dingin, lalu masukkan larutan matcha pekat di atasnya.',
      },
      {
        stepNumber: 4,
        title: 'Menambahkan Foam Awan',
        description: 'Tuang foam krim lembut perlahan di permukaan paling atas gelas.',
      },
    ],
    criticalNotes: [
      {
        title: 'Ayak Bubuk Matcha Terlebih Dahulu',
        description: 'Bubuk matcha mudah menggumpal. Pengayakan memastikan larutan matcha halus tanpa butiran kasar.',
      },
      {
        title: 'Whipping Cream Wajib Dingin',
        description: 'Krim yang tidak dingin akan gagal mengembang menjadi foam awan dan akan langsung larut ke dalam susu.',
      },
    ],
    productLinks: [
      {
        productId: 'matcha-ceremonial-uji',
        productName: 'Pure Ceremonial Matcha Powder',
        externalUrl: 'https://shopee.co.id/search?keyword=pure+ceremonial+matcha+powder',
      },
      {
        productId: 'hand-frother-mini',
        productName: 'Hand Frother Elektrik Mini',
        externalUrl: 'https://shopee.co.id/search?keyword=hand+frother+elektrik+mini',
      },
      {
        productId: 'gelas-borosilikat-estetik',
        productName: 'Gelas Kaca Borosilikat Estetik',
        externalUrl: 'https://shopee.co.id/search?keyword=gelas+borosilikat+estetik+cafe',
      },
    ],
    tags: ['Matcha', 'Minuman Kafe', 'Cold Foam'],
  },
  {
    id: 'cireng-salju-rujak',
    slug: 'cireng-salju-krispi-bumbu-rujak',
    title: 'Cireng Salju Renyah Bumbu Rujak Pedas Manis',
    category: 'cemilan-jajanan',
    categoryLabel: 'Cemilan & Jajanan',
    summary: 'Camilan aci goreng favorit medsos. Kulit luar putih krispi merekah bak salju, bagian dalam lembut tidak alot, dicocol sambal rujak manis pedas.',
    sourceViral: 'Viral Medsos Jajanan',
    imageKey: 'cireng',
    tableOfContents: [
      { id: 'bahan', label: 'Bahan-Bahan' },
      { id: 'cara-pembuatan', label: 'Cara Pembuatan' },
      { id: 'catatan', label: 'Catatan (Wajib Dibaca)' },
      { id: 'kebutuhan-dapur', label: 'Kebutuhan Dapur' },
    ],
    ingredientGroups: [
      {
        groupName: 'Bahan Biang',
        items: [
          '50 gram tepung tapioka',
          '200 ml air bersih',
          '4 siung bawang putih, haluskan',
          '1 sdt garam',
          '1 sdt kaldu bubuk',
          '1/2 sdt merica',
          '2 batang daun bawang, iris halus',
        ],
      },
      {
        groupName: 'Bahan Tepung Kering',
        items: [
          '180 gram tepung tapioka kering',
        ],
      },
      {
        groupName: 'Bahan Bumbu Rujak',
        items: [
          '100 gram gula aren murni, sisir halus',
          '8 buah cabai rawit merah',
          '1 siung bawang putih',
          '2 sdm air asam jawa',
          '1/2 sdt garam',
          '50 ml air matang hangat',
        ],
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Memasak Biang Aci',
        description: 'Campurkan bahan biang di panci. Aduk rata sebelum menyalakan kompor. Masak dengan api kecil sambil terus diaduk hingga cairan mengental menjadi lem bening kenyal. Matikan api.',
      },
      {
        stepNumber: 2,
        title: 'Mencampur Biang ke Tepung Kering',
        description: 'Tuang adonan biang panas ke dalam wadah tepung kering. Balik-balik dan cubit perlahan menggunakan ujung jari hingga berbulir. Jangan diuleni seperti adonan roti.',
      },
      {
        stepNumber: 3,
        title: 'Membentuk dan Menggoreng',
        description: 'Bentuk adonan menjadi pipih ringan tanpa ditekan terlalu padat. Masukkan ke dalam minyak bersuhu sedang yang cukup banyak. Goreng hingga kulit cireng mengapung dan krispi.',
      },
      {
        stepNumber: 4,
        title: 'Meracik Bumbu Rujak',
        description: 'Ulek cabai rawit, bawang putih, garam, lalu campurkan gula aren cair dan air asam jawa. Aduk hingga kental dan sajikan bersama cireng hangat.',
      },
    ],
    criticalNotes: [
      {
        title: 'Jangan Menguleni Adonan Terlalu Kuat',
        description: 'Menguleni adonan cireng akan membuat tekstur akhirnya keras dan alot saat dingin. Cukup cubit-campur ringan saja.',
      },
      {
        title: 'Gunakan Gula Aren Murni',
        description: 'Gula aren murni menghasilkan cocolan saus rujak yang legit harum dan berwarna pekat gelap.',
      },
    ],
    productLinks: [
      {
        productId: 'gula-aren-murni-organik',
        productName: 'Gula Aren Batok Kelapa Murni',
        externalUrl: 'https://shopee.co.id/search?keyword=gula+aren+batok+kelapa+murni',
      },
      {
        productId: 'wajan-granit-anti-lengket',
        productName: 'Wajan Granit Anti-Lengket',
        externalUrl: 'https://shopee.co.id/search?keyword=wajan+granit+anti+lengket',
      },
    ],
    tags: ['Cireng', 'Jajanan', 'Bumbu Rujak'],
  },
  {
    id: 'cromboloni-pastry-cokelat',
    slug: 'cromboloni-viral-pastry-dark-chocolate',
    title: 'Cromboloni Crispy Laminated Chocolate Ganache',
    category: 'kue-dessert',
    categoryLabel: 'Kue & Dessert',
    summary: 'Pastry spiral viral perpaduan croissant dan bomboloni. Kulit renyah berlapis dengan isian lelehan dark chocolate ganache melimpah.',
    sourceViral: 'Viral Medsos Pastry',
    imageKey: 'cromboloni',
    tableOfContents: [
      { id: 'bahan', label: 'Bahan-Bahan' },
      { id: 'cara-pembuatan', label: 'Cara Pembuatan' },
      { id: 'catatan', label: 'Catatan (Wajib Dibaca)' },
      { id: 'kebutuhan-dapur', label: 'Kebutuhan Dapur' },
    ],
    ingredientGroups: [
      {
        groupName: 'Bahan Pastry',
        items: [
          '2 lembar danish pastry sheet siap pakai (kondisi dingin)',
          '1 butir kuning telur dicampur 1 sdm susu untuk olesan',
          'Mentega tawar untuk olesan cetakan ring',
        ],
      },
      {
        groupName: 'Bahan Dark Chocolate Ganache',
        items: [
          '150 gram dark cooking chocolate, cincang',
          '120 ml whipping cream cair',
          '15 gram butter tawar',
        ],
      },
      {
        groupName: 'Bahan Topping',
        items: [
          '80 gram dark chocolate leleh',
          'Chocolate curls atau remahan kacang almond',
        ],
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Menggulung Pastry',
        description: 'Potong lembaran pastry sheet memanjang selebar 3-4 cm. Gulung strip secara melingkar rapi hingga berdiameter sekitar 8 cm.',
      },
      {
        stepNumber: 2,
        title: 'Proofing dalam Ring Mold',
        description: 'Letakkan gulungan adonan di dalam ring mold bundar diameter 10 cm di atas loyang beralas baking paper. Diamkan selama 40-50 menit hingga mengembang.',
      },
      {
        stepNumber: 3,
        title: 'Memanggang dengan Loyang Penindih',
        description: 'Olesi permukaan dengan campuran kuning telur. Tutup bagian atas dengan kertas roti dan tindih loyang datar. Panggang di oven suhu 190°C selama 20 menit, buka penindih lalu panggang 10 menit lagi hingga matang keemasan.',
      },
      {
        stepNumber: 4,
        title: 'Membuat Ganache dan Mengisi',
        description: 'Panaskan whipping cream lalu tuang ke cincangan cokelat. Aduk rata bersama butter. Masukkan ke piping bag. Semprotkan ganache ke dalam pastry yang sudah dingin, lalu hias bagian atas dengan lelehan cokelat.',
      },
    ],
    criticalNotes: [
      {
        title: 'Pastry Sheet Harus Tetap Dingin',
        description: 'Lembaran pastry harus selalu dalam keadaan dingin sebelum masuk oven agar lapisan mentega tidak meleleh sebelum mekar.',
      },
      {
        title: 'Wajib Gunakan Beban Penindih',
        description: 'Penindih di atas ring mold menjaga adonan tetap berbentuk bulat rapi dan tidak mengembang ke atas.',
      },
    ],
    productLinks: [
      {
        productId: 'ring-mold-pastry',
        productName: 'Ring Mold Pastry Bundar Stainless Steel',
        externalUrl: 'https://shopee.co.id/search?keyword=ring+mold+pastry+stainless+10cm',
      },
    ],
    tags: ['Cromboloni', 'Pastry', 'Dessert'],
  },
];
