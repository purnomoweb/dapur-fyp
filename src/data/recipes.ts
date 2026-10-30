import imgMieJebew from '../assets/images/mie_jebew_pedas_1793374140085.jpg';
import imgSeblak from '../assets/images/seblak_coet_rafael_1793374141342.jpg';
import imgMatcha from '../assets/images/matcha_cloud_latte_1793374141729.jpg';
import imgCromboloni from '../assets/images/cromboloni_chocolate_1793374141837.jpg';
import imgCireng from '../assets/images/cireng_salju_rujak_1793374142408.jpg';
import { RAW_RECIPES, CATEGORIES, RecipeBase } from './recipesData';

export interface Recipe extends Omit<RecipeBase, 'imageKey'> {
  image: string;
}

export { CATEGORIES };

const imageMap: Record<string, string> = {
  'mie-jebew': imgMieJebew,
  'seblak': imgSeblak,
  'matcha': imgMatcha,
  'cireng': imgCireng,
  'cromboloni': imgCromboloni,
};

export const RECIPES_DATA: Recipe[] = RAW_RECIPES.map((item) => ({
  ...item,
  image: imageMap[item.imageKey] || imgMieJebew,
}));
