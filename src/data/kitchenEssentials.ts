import imgMieJebew from '../assets/images/mie_jebew_pedas_1793374140085.jpg';
import imgSeblak from '../assets/images/seblak_coet_rafael_1793374141342.jpg';
import imgMatcha from '../assets/images/matcha_cloud_latte_1793374141729.jpg';
import imgCromboloni from '../assets/images/cromboloni_chocolate_1793374141837.jpg';
import imgCireng from '../assets/images/cireng_salju_rujak_1793374142408.jpg';

export interface KitchenProduct {
  id: string;
  name: string;
  image: string;
  externalUrl: string;
}

export const KITCHEN_PRODUCTS: KitchenProduct[] = [
  {
    id: 'chili-flakes-kasar',
    name: 'Chili Flakes Cabai Kasar Grade A',
    image: imgMieJebew,
    externalUrl: 'https://shopee.co.id/search?keyword=chili+flakes+kasar',
  },
  {
    id: 'cobek-batu-merapi',
    name: 'Cobek Batu Alami Gunung Merapi',
    image: imgSeblak,
    externalUrl: 'https://shopee.co.id/search?keyword=cobek+batu+merapi+asli',
  },
  {
    id: 'matcha-ceremonial-uji',
    name: 'Pure Ceremonial Matcha Powder',
    image: imgMatcha,
    externalUrl: 'https://shopee.co.id/search?keyword=pure+ceremonial+matcha+powder',
  },
  {
    id: 'ring-mold-pastry',
    name: 'Ring Mold Pastry Bundar Stainless Steel',
    image: imgCromboloni,
    externalUrl: 'https://shopee.co.id/search?keyword=ring+mold+pastry+stainless+10cm',
  },
  {
    id: 'hand-frother-mini',
    name: 'Hand Frother Elektrik Mini',
    image: imgMatcha,
    externalUrl: 'https://shopee.co.id/search?keyword=hand+frother+elektrik+mini',
  },
  {
    id: 'gula-aren-murni-organik',
    name: 'Gula Aren Batok Kelapa Murni',
    image: imgCireng,
    externalUrl: 'https://shopee.co.id/search?keyword=gula+aren+batok+kelapa+murni',
  },
  {
    id: 'wajan-granit-anti-lengket',
    name: 'Wajan Granit Anti-Lengket',
    image: imgCireng,
    externalUrl: 'https://shopee.co.id/search?keyword=wajan+granit+anti+lengket',
  },
  {
    id: 'gelas-borosilikat-estetik',
    name: 'Gelas Kaca Borosilikat Estetik',
    image: imgMatcha,
    externalUrl: 'https://shopee.co.id/search?keyword=gelas+borosilikat+estetik+cafe',
  },
];
