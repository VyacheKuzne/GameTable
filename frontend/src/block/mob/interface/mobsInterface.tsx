interface IMob {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    weapon?: IWeapon | null; // Опционально, может быть null, если у моба нет оружия
    weaponId?: number | null;  // Опционально, может быть null, если у моба нет оружия
    armor?: IArmor | null;   // Опционально, может быть null, если у моба нет брони
    armorId?: number | null;    // Опционально, может быть null, если у моба нет брони
    turnOrder?: any;  // Указываем тип TurnOrder, если он известен, иначе можно оставить any
  }
  
  interface IWeapon {
      id: number;
      name: string;
      damage: number;
  }
  
  interface IArmor {
      id: number;
      name: string;
      protection: number;
  }

  export type {IWeapon, IArmor};
  export default IMob