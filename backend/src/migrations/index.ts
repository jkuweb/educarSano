import * as migration_20251219_104211 from './20251219_104211';

export const migrations = [
  {
    up: migration_20251219_104211.up,
    down: migration_20251219_104211.down,
    name: '20251219_104211'
  },
];
