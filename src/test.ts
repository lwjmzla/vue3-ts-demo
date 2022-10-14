// https://juejin.cn/post/6904890590602330119#heading-7
import { plainToClass, classToPlain, Transform, Type } from 'class-transformer';

class Hobby {
  type!: string;
  content!: string;
}

class User {
  id!: number;

  firstName!: string;

  lastName!: string;

  // @Type(() => Hobby)
  hobbys!: Hobby[];
}

const fromPlainUser = {
  unkownProp: 'hello there',
  firstName: 'Umed',
  lastName: 'Khudoiberdiev',
  hobbys: [
    { type: 'play', content: 'football' },
    { type: 'eat', content: 'fish' }
  ]
};

const user = plainToClass(User, fromPlainUser); // 转成user实例
console.log(user);
console.log(user instanceof User);
console.log(classToPlain(user));
