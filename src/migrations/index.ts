import * as migration_20251208_101706 from './20251208_101706';

export const migrations = [
  {
    up: migration_20251208_101706.up,
    down: migration_20251208_101706.down,
    name: '20251208_101706'
  },
];
