import { Text } from './text';
import { Card } from './card';
import { Image } from './image';
import { CanvasComponent } from '../types/types';
import { Bar } from './bar';

export const components: Record<string, CanvasComponent> = {
  card: Card,
  text: Text,
  image: Image,
  bar: Bar,
};
